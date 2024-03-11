<script lang="ts">
	import type { InstagramGiveaway } from '$lib/db/schema';
	import { onMount } from 'svelte';

	export let item: InstagramGiveaway & { isBookmark: boolean };
	export let canBookmark = false;
	$: isBookmark = item.isBookmark;
	let isOutDated = new Date(item.endDate) < new Date();

	const handleBookmark = async () => {
		const response = await fetch(`/giveaway/bookmark`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ isBookmark, id: item.id })
		});
		const data = await response.json();
		isBookmark = data.isBookmark;
	};

	let loginModal: HTMLDialogElement;
	const handleLogin = () => {
		loginModal.showModal();
	};
</script>

<svelte:head>
	<script async defer src="//www.instagram.com/embed.js"></script>
</svelte:head>

<div
	class="card w-96 bg-base-100 shadow-xl border p-3"
	class:bg-yellow-50={isOutDated}
	class:text-zinc-400={isOutDated}>
	<div class="card-actions justify-between mx-2">
		<p class="text-xl">
			Data de encerramento<br />
			<span class="font-bold">
				{new Date(item.endDate).toLocaleDateString('pt-BR', {
					month: 'numeric',
					day: 'numeric',
					year: 'numeric',
					hour: 'numeric',
					minute: 'numeric'
				})}h
			</span>
		</p>
		{#if canBookmark}
			<label class="relative block select-none cursor-pointer">
				<input
					type="checkbox"
					name="giveawayId"
					checked={isBookmark}
					on:change={handleBookmark}
					class="absolute cursor-pointer opacity-0 h-0 w-0" />
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill={isBookmark ? '#2563eb' : 'none'}
					viewBox="0 0 24 24"
					stroke-width="1.2"
					stroke={isBookmark ? '#2563eb' : 'currentColor'}
					class="w-6 transition-all hover:scale-125 relative top-0 left-0">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
					></path>
				</svg>
			</label>
		{:else}
			<label class="relative block select-none cursor-pointer">
				<input
					type="checkbox"
					name="giveawayId"
					on:change={handleLogin}
					class="absolute cursor-pointer opacity-0 h-0 w-0" />
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.2"
					stroke="currentColor"
					class="w-6 transition-all hover:scale-125 relative top-0 left-0">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
					></path>
				</svg>
			</label>
		{/if}
		<div class="flex flex-wrap items-center gap-2 my-2 min-h-12">
			{#if item.shouldFollow}
				<span class="badge badge-secondary badge-outline">Seguir</span>
			{/if}
			{#if item.shouldLike}
				<span class="badge badge-primary badge-outline">Curtir</span>
			{/if}
			{#if item.shouldComment}
				<span class="badge border-blue-500 text-blue-500 badge-outline">
					Comentar</span>
			{/if}
			{#if item.shouldFollowOthers}
				<span class="badge border-rose-500 text-rose-500 badge-outline"
					>Seguir outras contas</span>
			{/if}
			{#if item.shouldMention}
				<span class="badge border-emerald-600 text-emerald-500 badge-outline"
					>Marcar amigos</span>
			{/if}
		</div>
	</div>
	<div class="overflow-hidden max-h-[450px]">
		<iframe
			title="Instagram Giveaway"
			src={`${item.link}embed`}
			class="w-full"
			height="450"
			frameborder="0"
			scrolling="no"
			allowtransparency={true}></iframe>
	</div>
</div>
<dialog bind:this={loginModal} class="modal">
	<div class="modal-box flex items-center gap-2">
		<h3 class="font-bold text-lg">
			Você precisa estar logado para salvar um sorteio
		</h3>
		<a href="/auth/signin" class="btn btn-primary">Entrar</a>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
