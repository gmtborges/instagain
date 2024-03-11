import {
	instagramGiveaways,
	usersInstagramGiveaways,
	type InstagramGiveaway
} from '$lib/db/schema';
import { db } from '$lib/server/db';
import type { Actions, PageServerLoad } from './$types';
import { and, eq, gte, like, lte, sql } from 'drizzle-orm';
import { UTCDate } from '@date-fns/utc';
import { addHours, addWeeks } from 'date-fns';
import { fail, redirect } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth';

type Period = 'day' | 'week' | 'month' | '2months';
type InstagramGiveawayItem = InstagramGiveaway & { isBookmark: boolean };

export const load: PageServerLoad = async ({ url, locals }) => {
	const period = url.searchParams.get('period') || 'month';
	const filterBookmark = url.searchParams.get('bookmark');
	const category = url.searchParams.get('category');
	let items: InstagramGiveawayItem[] = [];

	if (filterBookmark === 'true' && locals.user) {
		items = await db
			.select({
				id: instagramGiveaways.id,
				createdAt: instagramGiveaways.createdAt,
				endDate: instagramGiveaways.endDate,
				link: instagramGiveaways.link,
				category: instagramGiveaways.category,
				shouldFollow: instagramGiveaways.shouldFollow,
				shouldLike: instagramGiveaways.shouldLike,
				shouldFollowOthers: instagramGiveaways.shouldFollowOthers,
				shouldComment: instagramGiveaways.shouldComment,
				shouldMention: instagramGiveaways.shouldMention,
				isDraft: instagramGiveaways.isDraft,
				isBookmark: sql<boolean>`${usersInstagramGiveaways.userId}`
			})
			.from(instagramGiveaways)
			.leftJoin(
				usersInstagramGiveaways,
				eq(usersInstagramGiveaways.giveawayId, instagramGiveaways.id)
			)
			.where(
				and(
					eq(usersInstagramGiveaways.userId, locals.user.id),
					eq(instagramGiveaways.isDraft, false)
				)
			)
			.orderBy(instagramGiveaways.endDate);
	} else {
		const endDate = getEndDate(period as Period);
		items = await db
			.select({
				id: instagramGiveaways.id,
				createdAt: instagramGiveaways.createdAt,
				endDate: instagramGiveaways.endDate,
				link: instagramGiveaways.link,
				category: instagramGiveaways.category,
				shouldFollow: instagramGiveaways.shouldFollow,
				shouldLike: instagramGiveaways.shouldLike,
				shouldFollowOthers: instagramGiveaways.shouldFollowOthers,
				shouldComment: instagramGiveaways.shouldComment,
				shouldMention: instagramGiveaways.shouldMention,
				isDraft: instagramGiveaways.isDraft,
				isBookmark: sql<boolean>`${usersInstagramGiveaways.userId}`
			})
			.from(instagramGiveaways)
			.leftJoin(
				usersInstagramGiveaways,
				eq(usersInstagramGiveaways.giveawayId, instagramGiveaways.id)
			)
			.where(
				and(
					lte(instagramGiveaways.endDate, endDate),
					gte(instagramGiveaways.endDate, new Date().toISOString()),
					eq(instagramGiveaways.isDraft, false),
					category
						? like(instagramGiveaways.category, `%${category.toLowerCase()}%`)
						: undefined
				)
			)
			.orderBy(instagramGiveaways.endDate);
	}

	return {
		items,
		period,
		category,
		currentUser: locals.user,
		filterBookmark: filterBookmark === 'true' && locals.user
	};
};

function getEndDate(period: Period) {
	const now = new UTCDate();
	switch (period) {
		case 'day':
			return addHours(now, 24).toISOString();
		case 'week':
			return addWeeks(now, 1).toISOString();
		case 'month':
			return addWeeks(now, 4).toISOString();
		case '2months':
			return addWeeks(now, 8).toISOString();
	}
}

export const actions: Actions = {
	signout: async ({ locals, cookies }) => {
		if (!locals.session) {
			return fail(401);
		}
		await lucia.invalidateSession(locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	}
};
