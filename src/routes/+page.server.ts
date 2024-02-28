import { instagramGiveaways } from '$lib/db/schema';
import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';
import { lte } from 'drizzle-orm';
import { UTCDate } from '@date-fns/utc';
import { addWeeks, setHours, setMinutes } from 'date-fns';

type Period = '1' | '7' | '30' | '60';

export const load: PageServerLoad = async ({ url }) => {
  const period = url.searchParams.get('period') || '30';

  const endDate = getEndDate(period as Period);

  const items = await db.query.instagramGiveaways.findMany({
    where: lte(instagramGiveaways.endDate, endDate)
  });

  return { items, period };
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
