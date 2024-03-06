<script lang="ts">
	import type { User } from 'lucia';

	export let currentUser: User | null;

	let hasScrolled = false;
</script>

<svelte:window on:scroll={() => (hasScrolled = window.scrollY > 65)} />

<header
	class="transition-shadow sticky z-50 top-0 duration-500 ease-in-out navbar bg-base-100"
	class:shadow-lg={hasScrolled}>
	<div class="w-full mx-auto max-w-6xl">
		<div class="flex w-full">
			<a href="/" class="btn btn-ghost text-3xl font-display text-primary"> InstaGain </a>
			<div class="ml-auto dropdown">
				<div tabindex="0" role="button" class="btn btn-ghost md:hidden">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h8m-8 6h16">
						</path>
					</svg>
				</div>
				<ul
					class="menu menu-sm dropdown-content mt-3 right-2 z-[1] p-2 shadow bg-base-100 rounded-box w-max">
					{#if currentUser}
						<div>
							<li>
								<a class="link link-secondary" href="/giveaway">Cadastrar Sorteio</a>
							</li>
							<li>
								<a class="link" href="/profile">Perfil</a>
							</li>
							<li>
								<form action="?/signout" method="POST">
									<button class="link link-primary">Sair</button>
								</form>
							</li>
						</div>
					{:else}
						<div>
							<li>
								<a class="link link-secondary" href="/giveaway">Cadastrar Sorteio</a>
							</li>
							<li>
								<a class="link link-primary" href="/auth/signin">Entrar</a>
							</li>
						</div>
					{/if}
				</ul>
			</div>
		</div>
		<div class="navbar-end hidden md:flex gap-4">
			{#if currentUser}
				<div class="flex items-center gap-2">
					<a class="btn btn-outline btn-secondary text-lg" href="/giveaway">Cadastrar Sorteio</a>
					<a href="/profile" class="btn btn-ghost" role="button" aria-label="Perfil">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-7">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
						</svg>
					</a>
					<form action="?/signout" method="POST">
						<button class="btn btn-ghost">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-8 text-primary">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9">
								</path>
							</svg>
						</button>
					</form>
				</div>
			{:else}
				<div class="flex gap-4 items-center">
					<a class="btn btn-outline btn-secondary text-lg" href="/giveaway">Cadastrar Sorteio</a>
					<a class="btn btn-outline btn-primary text-lg" href="/auth/signin"> Entrar </a>
				</div>
			{/if}
		</div>
	</div>
</header>
