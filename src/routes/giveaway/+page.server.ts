import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { instagramGiveaways } from '$lib/db/schema';
import { db } from '$lib/server/db';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const date = formData.get('endDate');
		const endHour = formData.get('endHour');
		const link = formData.get('link');
		const category = formData.get('category');
		const shouldFollow = !!formData.get('shouldFollow');
		const shouldLike = !!formData.get('shouldLike');
		const shouldFollowOthers = !!formData.get('shouldFollowOthers');
		const shouldComment = !!formData.get('shouldComment');
		const shouldMention = !!formData.get('shouldMention');

		if (!date || !link || !endHour) {
			return fail(400, {
				endDate: date,
				endHour,
				link,
				category,
				shouldFollow,
				shouldLike,
				shouldFollowOthers,
				shouldComment,
				shouldMention,
				level: 'warn',
				msg: 'Campos obrigatórios não preenchidos'
			});
		}

		console.log({
			endDate: date,
			endHour,
			link,
			category,
			shouldFollow,
			shouldLike,
			shouldFollowOthers,
			shouldComment,
			shouldMention
		});
		const [year, month, day] = date.toString().split('-');
		const [hour, minute] = endHour.toString().split(':');
		const endDate = new Date(+year, +month - 1, +day, +hour, +minute).toISOString();

		await db.insert(instagramGiveaways).values({
			endDate,
			link,
			category,
			shouldFollow,
			shouldLike,
			shouldFollowOthers,
			shouldComment,
			shouldMention,
			isDraft: locals.user?.isAdmin ? false : true
		});

		return { level: 'success', msg: 'Sorteio criado com sucesso' };
	}
};
