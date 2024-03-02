import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { emailVerificationCodes, users } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { generateEmailVerificationCode, lucia } from '$lib/server/auth';
import { render } from 'svelte-email';
import VerificationCode from '$lib/email-templates/VerificationCode.svelte';
import { sendEmail } from '$lib/server/email';
import { isWithinExpirationDate } from 'oslo';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		redirect(307, '/auth/signin');
	}

	return {
		currentUser: locals.user
	};
};

export const actions: Actions = {
	default: async ({ request, locals, cookies }) => {
		const formData = await request.formData();
		const code = formData.get('code');
		const { user } = await lucia.validateSession(locals.session.id);
		if (user) {
			const result = await db
				.select({
					validCode: emailVerificationCodes.code,
					expiresAt: emailVerificationCodes.expiresAt,
					name: users.fullName
				})
				.from(emailVerificationCodes)
				.leftJoin(users, eq(emailVerificationCodes.userId, users.id))
				.where(eq(users.email, locals.user.email));

			const { validCode, expiresAt, name } = result[0];

			if (code !== validCode) {
				return fail(400, {
					level: 'warn',
					error: 'Código inválido.'
				});
			}

			if (code === validCode && !isWithinExpirationDate(new Date(expiresAt))) {
				const verificationCode = await generateEmailVerificationCode(user.id, locals.user.email);
				const body = render({
					template: VerificationCode,
					props: { verificationCode, name }
				});

				await sendEmail({
					email: locals.user.email,
					subject: 'InstaGain - Verificação de e-mail',
					body
				});

				return fail(400, {
					level: 'warn',
					error: 'Código expirado. Um novo código foi enviado para o seu e-mail.'
				});
			}

			if (code === validCode && isWithinExpirationDate(new Date(expiresAt))) {
				await db.update(users).set({ emailVerified: true }).where(eq(users.id, user.id));

				await lucia.invalidateUserSessions(user.id);
				const session = await lucia.createSession(user.id, {});
				const sessionCookie = lucia.createSessionCookie(session.id);
				cookies.set(sessionCookie.name, sessionCookie.value, {
					path: '.',
					...sessionCookie.attributes
				});

				redirect(302, '/');
			}
		}
	}
};
