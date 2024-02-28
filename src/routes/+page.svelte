<script lang="ts">
	import type { PageServerData } from './$types';
	import GiveawayCard from '$lib/components/GiveawayCard.svelte';

	export let data: PageServerData;
</script>

<div class="mt-10 flex flex-col items-center">
	<div class="flex flex-col items-center">
		<h1 class="mb-10 text-5xl font-display">Sorteios no Instagram</h1>
		<p class="text-3xl my-3">Encerra:</p>
	</div>
	<form class="flex flex-col sm:flex-row mb-10 gap-5">
		<label class="label cursor-pointer">
			<span class="label-text text-lg mr-2">Hoje</span>
			<input
				type="radio"
				name="radio-period"
				value="day"
				class="radio checked:bg-accent"
				checked={data.period === '1'} />
		</label>
		<label class="label cursor-pointer">
			<span class="label-text text-lg mr-2">Em 7 dias</span>
			<input
				type="radio"
				name="radio-period"
				value="week"
				class="radio checked:bg-accent"
				checked={data.period === '7'} />
		</label>
		<label class="label cursor-pointer">
			<span class="label-text text-lg mr-2">Em um mês</span>
			<input
				type="radio"
				name="radio-period"
				value="month"
				class="radio checked:bg-accent"
				checked={data.period === '30'} />
		</label>
		<label class="label cursor-pointer">
			<span class="label-text text-lg mr-2">Em 2 meses</span>
			<input
				type="radio"
				name="radio-period"
				value="month"
				class="radio checked:bg-accent"
				checked={data.period === '60'} />
		</label>
	</form>
</div>
<section class="flex flex-col items-center">
	<p class="text-lg">
		{data.items?.length ?? 0} sorteios encontrados
	</p>
	<div
		class="my-10 max-w-7xl mx-auto mt-8 flex justify-center flex-wrap gap-8 p-2">
		{#each data.items as item}
			<GiveawayCard {item} />
		{/each}
	</div>
</section>
