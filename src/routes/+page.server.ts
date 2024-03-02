import { instagramGiveaways } from '$lib/db/schema';
import { db } from '$lib/server/db';
import type { Actions, PageServerLoad } from './$types';
import { lte } from 'drizzle-orm';
import { UTCDate } from '@date-fns/utc';
import { addWeeks, setHours, setMinutes } from 'date-fns';
import { fail, redirect } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth';

type Period = '1' | '7' | '30' | '60';

export const load: PageServerLoad = async ({ url, locals }) => {
	const period = url.searchParams.get('period') || '30';

	const endDate = getEndDate(period as Period);

	const items = await db.query.instagramGiveaways.findMany({
		where: lte(instagramGiveaways.endDate, endDate)
	});

	return { items, period, currentUser: locals.user };
};

function getEndDate(period: Period) {
	const now = new UTCDate();
	switch (period) {
		case '1':
			return setMinutes(setHours(now, 23), 59).toISOString();
		case '7':
			return addWeeks(now, 1).toISOString();
		case '30':
			return addWeeks(now, 4).toISOString();
		case '60':
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
