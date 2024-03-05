import { generateCodeVerifier, generateState } from 'arctic';
import { google } from '$lib/server/auth';
import type { RequestEvent } from '@sveltejs/kit';
import { dev } from '$app/environment';

export async function GET({ cookies }: RequestEvent): Promise<Response> {
	const state = generateState();
	const codeVerifier = generateCodeVerifier();

	const url = await google.createAuthorizationURL(state, codeVerifier, {
		scopes: ['email', 'profile']
	});

	cookies.set('state', state, {
		secure: !dev, // set to false in localhost
		path: '/',
		httpOnly: true,
		maxAge: 60 * 10 // 10 min
	});

	cookies.set('code_verifier', codeVerifier, {
		secure: !dev, // set to false in localhost
		path: '/',
		httpOnly: true,
		maxAge: 60 * 10 // 10 min
	});

	return new Response(null, {
		status: 302,
		headers: {
			location: url.toString()
		}
	});
}
