<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageServerData } from './$types';

	export let data: PageServerData;
	export let form: ActionData;
	let submitting = false;
</script>

<svelte:head>
	<title>Verificação de E-mail</title>
</svelte:head>

{#if form?.error}
	<div class="toast">
		<div class="alert" class:alert-warning={form.level === 'warn'}>
			<span>{form.error}</span>
		</div>
	</div>
{/if}
<div class="bg-white p-4 rounded-lg shadow-md w-full max-w-lg border">
	<h2 class="text-2xl font-bold my-4">Verificação de E-mail</h2>
	<p>
		Um código de verificação foi enviado para <strong>{data.currentUser.email}</strong>.
	</p>
	<p class="text-sm mt-2 text-gray-500">
		Verifique a caixa de spam se não tiver encontrado o e-mail.
	</p>
	<form
		class="space-y-4 mt-3"
		method="POST"
		use:enhance={() => {
			submitting = true;

			return async ({ update }) => {
				await update();
				submitting = false;
			};
		}}>
		<div>
			<label for="code" class="block mb-2 font-medium text-gray-700">Código de verificação</label>
			<input type="text" name="code" id="code" required class="input input-bordered w-full" />
		</div>
		<button type="submit" class="btn btn-secondary w-full" disabled={submitting}>
			{#if submitting}
				<span class="loading loading-spinner loading-md"></span>
			{:else}
				Verificar
			{/if}
		</button>
	</form>
	<a href="/" class="btn btn-ghost mt-4 w-full">Voltar para início</a>
</div>
