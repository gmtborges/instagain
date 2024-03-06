import { OAuth2RequestError } from 'arctic';
import { generateId } from 'lucia';
import { google, lucia } from '$lib/server/auth';

import type { RequestEvent } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { users } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET({ url, cookies }: RequestEvent): Promise<Response> {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');

	const storedState = cookies.get('state');
	const storedCodeVerifier = cookies.get('code_verifier');

	if (!code || !state || !storedState || !storedCodeVerifier) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await google.validateAuthorizationCode(code, storedCodeVerifier);
		const response = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const googleUser: GoogleUser = await response.json();

		// Replace this with your own DB client.
		const existingUser = await db
			.select({ id: users.id })
			.from(users)
			.where(eq(users.providerId, `google|${googleUser.sub}`));

		if (existingUser.length) {
			const session = await lucia.createSession(existingUser[0].id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		} else {
			const userId = generateId(15);

			// Replace this with your own DB client.
			await db.insert(users).values({
				id: userId,
				providerId: `google|${googleUser.sub}`,
				email: googleUser.email,
				emailVerified: googleUser.email_verified,
				fullName: googleUser.name
			});

			const session = await lucia.createSession(userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		}
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	} catch (e) {
		console.error(e);
		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
}

interface GoogleUser {
	sub: string;
	email: string;
	email_verified: boolean;
	name: string;
}
