<script lang="ts">
	import type { PageServerData } from './$types';
	import GiveawayCard from '$lib/components/GiveawayCard.svelte';

	export let data: PageServerData;
</script>

<div class="mt-10 flex flex-col items-center">
	<div class="flex flex-col items-center prose">
		<h1 class="mb-8 font-display">Sorteios no Instagram</h1>
		<p class="text-2xl font-medium not-prose">Encerra:</p>
	</div>
	<form class="flex flex-col sm:flex-row gap-5">
		<label class="label cursor-pointer">
			<span class="label-text text-lg mr-2">Hoje</span>
			<input
				type="radio"
				name="radio-period"
				value="day"
				class="radio checked:bg-primary"
				checked={data.period === 'day'}
			/>
		</label>
		<label class="label cursor-pointer">
			<span class="label-text text-lg mr-2">Em 7 dias</span>
			<input
				type="radio"
				name="radio-period"
				value="week"
				class="radio checked:bg-secondary"
				checked={data.period === 'week'}
			/>
		</label>
		<label class="label cursor-pointer">
			<span class="label-text text-lg mr-2">Em 30 dias</span>
			<input
				type="radio"
				name="radio-period"
				value="month"
				class="radio checked:bg-accent"
				checked={data.period === 'month'}
			/>
		</label>
	</form>
</div>
<section class="flex flex-col items-center">
	<p class="mt-4">
		{data.items?.length ?? 0} sorteios encontrados
	</p>
	<div class="my-10 max-w-7xl mx-auto mt-8 flex justify-center flex-wrap gap-8 p-2">
		{#each data.items as item}
			<GiveawayCard {item} />
		{/each}
	</div>
</section>
