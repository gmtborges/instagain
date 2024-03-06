import { instagramGiveaways } from '$lib/db/schema';
import { db } from '$lib/server/db';
import type { Actions, PageServerLoad } from './$types';
import { and, eq, lte } from 'drizzle-orm';
import { UTCDate } from '@date-fns/utc';
import { addWeeks, setHours, setMinutes } from 'date-fns';
import { fail, redirect } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth';

type Period = 'day' | 'week' | 'month' | '2months';

export const load: PageServerLoad = async ({ url, locals }) => {
	const period = url.searchParams.get('period') || 'month';

	const endDate = getEndDate(period as Period);
	console.log('endDate', endDate);

	const items = await db
		.select()
		.from(instagramGiveaways)
		.where(
			and(
				lte(instagramGiveaways.endDate, endDate),
				eq(instagramGiveaways.isDraft, false)
			)
		)
		.orderBy(instagramGiveaways.endDate);

	return { items, period, currentUser: locals.user };
};

function getEndDate(period: Period) {
	const now = new UTCDate();
	switch (period) {
		case 'day':
			return setMinutes(setHours(now, 23), 59).toISOString();
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
