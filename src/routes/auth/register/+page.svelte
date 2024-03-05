<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
	let togglePassword = false;
	let submitting = false;
</script>

<svelte:head>
	<title>InstaGain - Registrar</title>
</svelte:head>

<div class="bg-white p-8 rounded-lg shadow-md w-full max-w-lg border">
	{#if form?.error}
		<div class="toast">
			<div
				class="alert"
				class:alert-error={form.level === 'error'}
				class:alert-warning={form.level === 'warn'}>
				<span>{form.error}</span>
			</div>
		</div>
	{/if}
	<div class="text-center mt-4">
		<span>Já possui conta?</span>
		<a href="/auth/signin" class="link link-primary font-bold">Entrar</a>
	</div>
	<form
		class="space-y-4"
		method="POST"
		use:enhance={() => {
			submitting = true;

			return async ({ update }) => {
				await update();
				submitting = false;
			};
		}}>
		<div>
			<label for="name" class="block mb-2 text-sm font-medium text-gray-700">Nome</label>
			<input
				type="text"
				name="name"
				id="name"
				value={form?.name || ''}
				required
				placeholder="João da Silva"
				class="input input-bordered w-full" />
		</div>
		<div>
			<label for="name" class="block mb-2 text-sm font-medium text-gray-700">E-mail</label>
			<input
				type="email"
				name="email"
				value={form?.email || ''}
				required
				id="email"
				placeholder="usuario@exemplo.com"
				class="input input-bordered w-full" />
		</div>
		<div>
			<div class="flex w-full">
				<label class="block mb-2 text-sm font-medium text-gray-700" for="password">Senha</label>
				<button
					class="mb-2 ml-auto"
					type="button"
					aria-label={togglePassword ? 'Esconder senha' : 'Mostrar senha'}
					on:click={() => (togglePassword = !togglePassword)}>
					{#if togglePassword}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
						</svg>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
						</svg>
					{/if}
				</button>
			</div>
			<input
				type={togglePassword ? 'text' : 'password'}
				name="password"
				id="password"
				required
				placeholder="Mínimo 8 caracteres, letras e números"
				class="input input-bordered w-full" />
		</div>
		<button type="submit" class="btn btn-secondary w-full" disabled={submitting}>
			{#if submitting}
				<span class="loading loading-spinner loading-md"></span>
			{:else}
				Registrar
			{/if}
		</button>
	</form>
	<div class="divider">OU</div>
	<div class="flex items-center justify-center mt-4">
		<a href="/auth/signin/google" class="btn btn-block">
			<span>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="w-6">
					<path
						fill="#FFC107"
						d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
					<path
						fill="#FF3D00"
						d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
					<path
						fill="#4CAF50"
						d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
					<path
						fill="#1976D2"
						d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
				</svg>
			</span>
			Entrar com Google</a>
	</div>
	<a href="/" class="btn btn-ghost mt-4 w-full">Voltar para início</a>
</div>
