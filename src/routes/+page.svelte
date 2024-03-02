<script lang="ts">
	import type { PageServerData } from './$types';
	import GiveawayCard from '$lib/components/GiveawayCard.svelte';
	import Header from '$lib/components/Header.svelte';

	export let data: PageServerData;
</script>

<svelte:head>
	<title>Instagain - Seu sorteios em um só lugar.</title>
</svelte:head>

<Header currentUser={data.currentUser} />
<main class="flex flex-col md:flex-row mt-10">
	<aside class="flex-1 text-center"></aside>
	<div class="flex flex-col items-center max-w-7xl mx-auto">
		{#if data.currentUser && !data.currentUser.emailVerified}
			<div role="alert" class="alert bg-amber-200 w-4/5 mb-5">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="stroke-current shrink-0 h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
				<span>Sua conta ainda não foi verificada.</span>
				<a href="/auth/verify-email" class="btn">Verificar E-mail</a>
			</div>
		{/if}
		<h1 class="mb-10 text-5xl text-center font-display">Sorteios no Instagram</h1>
		<p class="text-3xl my-3">Encerra:</p>
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
		<section class="flex flex-col items-center">
			<p class="text-lg">
				{data.items?.length ?? 0} sorteios encontrados
			</p>
			<div class="my-10 flex justify-center flex-wrap gap-8">
				{#each data.items as item}
					<GiveawayCard {item} />
				{/each}
			</div>
		</section>
	</div>
	<aside class="flex-1 text-center"></aside>
</main>
