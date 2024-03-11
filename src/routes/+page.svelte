<script lang="ts">
	import type { PageServerData } from './$types';
	import GiveawayCard from '$lib/components/GiveawayCard.svelte';
	import Header from '$lib/components/Header.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let data: PageServerData;

	const handlePeriod = (e: Event) => {
		const target = e.target as HTMLInputElement;
		$page.url.searchParams.set('period', target.value);
		goto(`?${$page.url.searchParams.toString()}`, { invalidateAll: true });
	};

	const handleBookmarkFilter = (e: Event) => {
		const target = e.target as HTMLInputElement;
		$page.url.searchParams.set('bookmark', target.checked ? 'true' : 'false');
		goto(`?${$page.url.searchParams.toString()}`, { invalidateAll: true });
	};

	const handleCategoryFilter = (e: Event) => {
		const target = e.target as HTMLInputElement;
		if (!target.value) {
			$page.url.searchParams.delete('category');
			goto(`?${$page.url.searchParams.toString()}`, { invalidateAll: true });
		}
		if (target.value && target.value.length >= 3) {
			$page.url.searchParams.set('category', target.value);
			goto(`?${$page.url.searchParams.toString()}`, { invalidateAll: true });
		}
	};

	const debounce = (callback: Function, wait = 500) => {
		let timeout: ReturnType<typeof setTimeout>;

		return (...args: any[]) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => callback(...args), wait);
		};
	};
</script>

<svelte:head>
	<title>InstaGain - Seus sorteios em um só lugar.</title>
</svelte:head>

<Header currentUser={data.currentUser} />
<main class="flex flex-col md:flex-row mt-2 md:mt-5">
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
		<p class="text-2xl my-3">Encerra:</p>
		<div class="flex flex-col sm:flex-row md:gap-3">
			<label class="label cursor-pointer">
				<span class="label-text text-lg mr-2">Em 24h</span>
				<input
					type="radio"
					name="radio-period"
					value="day"
					on:change={handlePeriod}
					class="radio checked:bg-accent"
					checked={data.period === 'day'} />
			</label>
			<label class="label cursor-pointer">
				<span class="label-text text-lg mr-2">Em 7 dias</span>
				<input
					type="radio"
					name="radio-period"
					value="week"
					on:change={handlePeriod}
					class="radio checked:bg-accent"
					checked={data.period === 'week'} />
			</label>
			<label class="label cursor-pointer">
				<span class="label-text text-lg mr-2">Em 30 dias</span>
				<input
					type="radio"
					name="radio-period"
					value="month"
					on:change={handlePeriod}
					class="radio checked:bg-accent"
					checked={data.period === 'month'} />
			</label>
		</div>
		<label class="my-4 input input-bordered flex items-center gap-2">
			<input
				class="grow"
				type="text"
				maxlength="250"
				value={data.category}
				placeholder="iphone, pix ..."
				on:input={debounce(handleCategoryFilter)} />

			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 16 16"
				fill="currentColor"
				class="w-6 opacity-70"
				><path
					fill-rule="evenodd"
					d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
					clip-rule="evenodd" /></svg>
		</label>
		<section class="flex flex-col items-center">
			<p class="text-lg text-center my-4">
				{data.items?.length ?? 0} sorteio(s) encontrado(s)
			</p>
			{#if data.currentUser}
				<div class="flex justify-end mb-2">
					<label for="save" class="label cursor-pointer">
						<span class="label-text mr-2">Sorteios salvos</span>
						<input
							id="save"
							name="save"
							type="checkbox"
							checked={data.filterBookmark ? true : false}
							on:change={handleBookmarkFilter}
							class="toggle toggle-accent" />
					</label>
				</div>
			{/if}
			<div class="flex justify-center flex-wrap gap-3 cards">
				{#each data.items as item}
					<GiveawayCard {item} canBookmark={data.currentUser ? true : false} />
				{/each}
			</div>
		</section>
	</div>
	<aside class="flex-1 text-center"></aside>
</main>
