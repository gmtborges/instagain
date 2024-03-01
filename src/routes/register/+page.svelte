<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let togglePassword = false;
</script>

<div class="flex justify-center mt-20 sm:mt-44 lg:mt-52 px-4">
	<div class="bg-white p-8 rounded-lg shadow-md w-full max-w-lg border">
		{#if form?.error}
			<div class="toast min-w-20">
				<div class="alert alert-warning">
					<span>{form.error}</span>
				</div>
			</div>
		{/if}
		<form class="space-y-4" use:enhance method="POST">
			<div>
				<label for="name" class="block mb-2 text-sm font-medium text-gray-700"
					>Nome</label>
				<input
					type="text"
					name="name"
					id="name"
					required
					placeholder="João da Silva"
					class="input input-bordered w-full" />
			</div>
			<div>
				<label for="name" class="block mb-2 text-sm font-medium text-gray-700"
					>E-mail</label>
				<input
					type="email"
					name="email"
					required
					id="email"
					placeholder="usuario@exemplo.com"
					class="input input-bordered w-full" />
			</div>
			<div>
				<div class="flex w-full">
					<label
						class="block mb-2 text-sm font-medium text-gray-700"
						for="password">Senha</label>
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
			<button type="submit" class="btn btn-secondary w-full">Registrar</button>
		</form>
		<div class="text-center mt-4">
			<span>Já possui conta?</span>
			<a href="/signin" class="link link-secondary font-bold">Entrar</a>
		</div>
	</div>
</div>
