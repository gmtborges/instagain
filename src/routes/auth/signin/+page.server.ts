import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password';

import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		if (
			typeof email !== 'string' ||
			!email.length ||
			typeof password !== 'string' ||
			!password.length
		) {
			return fail(400, {
				email,
				level: 'warn',
				msg: 'E-mail e senha são obrigatórios'
			});
		}

		const existingUser = await db
			.select()
			.from(users)
			.where(eq(users.email, email.toLowerCase()));

		if (!existingUser.length) {
			// NOTE:
			// Returning immediately allows malicious actors to figure out valid usernames from response times,
			// allowing them to only focus on guessing passwords in brute-force attacks.
			// As a preventive measure, you may want to hash passwords even for invalid usernames.
			// However, valid usernames can be already be revealed with the signup page among other methods.
			// It will also be much more resource intensive.
			// Since protecting against this is none-trivial,
			// it is crucial your implementation is protected against brute-force attacks with login throttling etc.
			// If usernames are public, you may outright tell the user that the username is invalid.
			return fail(400, {
				email,
				level: 'warn',
				msg: 'E-mail ou senha incorretos'
			});
		}

		const validPassword = await new Argon2id().verify(
			existingUser[0].hashedPassword!,
			password
		);
		if (!validPassword) {
			return fail(400, {
				email,
				level: 'warn',
				msg: 'E-mail ou senha incorretos'
			});
		}

		const session = await lucia.createSession(existingUser[0].id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	}
};
