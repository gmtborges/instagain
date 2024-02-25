import { instagramGiveaways } from '$lib/db/schema';
import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';
import { lte } from 'drizzle-orm';
import { UTCDate } from '@date-fns/utc';
import { addWeeks, setHours, setMinutes } from 'date-fns';

type Period = 'day' | 'week' | 'month';

export const load: PageServerLoad = async ({ url }) => {
  const period = url.searchParams.get('period') || 'month';

  const endDate = getEndDate(period as Period);

  const items = await db.query.instagramGiveaways.findMany({
    where: lte(instagramGiveaways.endDate, endDate)
  });

  return { items, period };
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
  }
}
