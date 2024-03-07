import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { usersInstagramGiveaways } from '$lib/db/schema';
import { db } from '$lib/server/db';
import { and, eq } from 'drizzle-orm';

export const POST: RequestHandler = async ({ request, locals }) => {
	const { isBookmark, id } = await request.json();
	if (locals.user) {
		if (isBookmark) {
			await db
				.delete(usersInstagramGiveaways)
				.where(
					and(
						eq(usersInstagramGiveaways.giveawayId, id),
						eq(usersInstagramGiveaways.userId, locals.user.id)
					)
				);
			return json({ isBookmark: !isBookmark });
		} else {
			await db.insert(usersInstagramGiveaways).values({
				giveawayId: id,
				userId: locals.user.id
			});
			return json({ isBookmark: !isBookmark });
		}
	}
	return new Response('Unauthorized', { status: 401 });
};
