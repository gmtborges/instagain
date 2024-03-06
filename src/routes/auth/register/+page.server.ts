import { generateEmailVerificationCode, lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/db/schema';
import { sendEmail } from '$lib/server/email';
import { LibsqlError } from '@libsql/client';
import { render } from 'svelte-email';
import VerificationCode from '$lib/email-templates/VerificationCode.svelte';

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email');
		const password = formData.get('password');
		const name = formData.get('name');
		const validEmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
		const validPasswordRegex = /^(?=.*[a-z])(?=.*\d).{8,}$/;
		// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
		// keep in mind some database (e.g. mysql) are case insensitive
		if (typeof email !== 'string' || !validEmailRegex.test(email)) {
			return fail(400, {
				name,
				email,
				level: 'warn',
				msg: 'E-mail invalido'
			});
		}
		if (
			typeof password !== 'string' ||
			password.length < 8 ||
			!validPasswordRegex.test(password) ||
			password.length > 255
		) {
			return fail(400, {
				name,
				email,
				level: 'warn',
				msg: 'Senha não atende aos requisitos mínimos de segurança.'
			});
		}

		if (typeof name !== 'string' || name.length < 3 || name.length > 255) {
			return fail(400, {
				name,
				email,
				level: 'warn',
				msg: 'Nome completo deve ter entre 3 e 255 caracteres.'
			});
		}

		const userId = generateId(15);
		const hashedPassword = await new Argon2id().hash(password);

		// TODO: check if username is already used
		try {
			await db.insert(users).values({
				id: userId,
				fullName: name,
				email,
				hashedPassword: hashedPassword
			});
		} catch (error) {
			if (error instanceof LibsqlError) {
				if (error.code === 'SQLITE_CONSTRAINT') {
					return fail(400, {
						name,
						email,
						level: 'warn',
						msg: 'E-mail já cadastrado'
					});
				}
			} else {
				console.error(error);
				return fail(500, {
					name,
					email,
					level: 'error',
					msg: 'Erro no servidor. Tente novamente mais tarde.'
				});
			}
		}

		const verificationCode = await generateEmailVerificationCode(userId, email);
		const body = render({
			template: VerificationCode,
			props: { verificationCode, name }
		});

		await sendEmail({ email, subject: 'InstaGain - Verificação de e-mail', body });

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);

		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/auth/verify-email');
	}
};
