import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { db } from './db';
import { emailVerificationCodes, sessions, users } from '$lib/db/schema';
import { TimeSpan, createDate } from 'oslo';
import { generateRandomString, alphabet } from 'oslo/crypto';
import { eq } from 'drizzle-orm';

const adapter = new DrizzleSQLiteAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			emailVerified: attributes.emailVerified,
			email: attributes.email
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	email: string;
	emailVerified: boolean;
}

export async function generateEmailVerificationCode(
	userId: string,
	email: string
): Promise<string> {
	await db.delete(emailVerificationCodes).where(eq(emailVerificationCodes.userId, userId));

	const code = generateRandomString(6, alphabet('A-Z', '0-9'));

	await db.insert(emailVerificationCodes).values({
		userId,
		email,
		code,
		expiresAt: createDate(new TimeSpan(5, 'm')).toISOString()
	});

	return code;
}
