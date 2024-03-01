<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="flex justify-center mt-20 sm:mt-44 lg:mt-52 px-4">
	<div class="bg-white p-8 rounded-lg shadow-md w-full max-w-lg border">
		{#if form?.error}
			<div class="toast">
				<div class="alert alert-warning">
					<span>{form.error}</span>
				</div>
			</div>
		{/if}
		<form class="space-y-4" use:enhance method="POST">
			<div>
				<label for="email" class="block mb-2 text-sm font-medium text-gray-700"
					>E-mail</label>
				<input
					type="email"
					name="email"
					value={form?.email ?? ''}
					id="email"
					placeholder="usuario@exemplo.com"
					required
					class="input input-bordered w-full" />
			</div>
			<div>
				<label
					class="block mb-2 text-sm font-medium text-gray-700"
					for="password">Senha</label>
				<input
					type="password"
					name="password"
					id="password"
					required
					placeholder="Sua senha"
					class="input input-bordered w-full" />
			</div>
			<button type="submit" class="btn btn-secondary w-full">Entrar</button>
			<div class="flex items-center justify-center mt-4">
				<a href="#" class="btn btn-block">
					<span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 48 48"
							class="w-6">
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
		</form>
		<div class="text-center mt-4">
			<span>Não possui conta?</span>
			<a href="/register" class="link link-secondary font-bold">Registrar</a>
		</div>
	</div>
</div>
