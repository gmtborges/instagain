<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import Toast from '$lib/components/Toast.svelte';

	export let form: ActionData;
	let submitting = false;
</script>

{#if form?.level && form?.msg}
	<Toast level={form?.level} msg={form?.msg} />
{/if}
<div class="max-w-3xl mx-auto mt-10">
	<h1 class="text-center font-display text-4xl">Cadastrar Sorteio</h1>
	<form
		method="POST"
		class="p-8 bg-white rounded-lg border mt-4 shadow-lg"
		use:enhance={() => {
			submitting = true;

			return async ({ update }) => {
				await update();
				submitting = false;
			};
		}}>
		<div class="form-control mb-4">
			<label for="endDate" class="label">
				<span class="label-text">Data de Encerramento</span>
			</label>
			<input
				id="endDate"
				name="endDate"
				type="date"
				required
				class="input input-bordered"
				min={new Date().toISOString().split('T')[0]}
				value={form?.endDate ?? new Date().toISOString().split('T')[0]} />
		</div>
		<div class="form-control mb-4">
			<label for="endHour" class="label">
				<span class="label-text">Hora de Encerramento</span>
			</label>
			<input
				id="endHour"
				name="endHour"
				type="time"
				required
				class="input input-bordered"
				value={form?.endHour ?? ''} />
		</div>

		<div class="form-control mb-4">
			<label for="link" class="label">
				<span class="label-text">Link do sorteio</span>
			</label>
			<input
				id="link"
				type="text"
				placeholder="https://www.instagram.com/p/C23EYTXyNJM"
				required
				pattern="https://(www.)?instagram.com/p/.+"
				title="Post do Instagram"
				class="input input-bordered"
				name="link"
				value={form?.link ?? ''} />
		</div>

		<div class="form-control mb-4">
			<label for="category" class="label">
				<span class="label-text">Categoria</span>
			</label>
			<input
				id="category"
				type="text"
				name="category"
				class="input input-bordered"
				placeholder="eletronicos, moda... separados por virgula."
				value={form?.category ?? ''} />
		</div>

		<div class="form-control">
			<label class="label cursor-pointer">
				<span class="label-text">Curir o post</span>
				<input
					type="checkbox"
					class="toggle toggle-secondary"
					name="shouldLike"
					checked={form?.shouldLike ?? ''} />
			</label>
		</div>

		<div class="form-control">
			<label class="label cursor-pointer">
				<span class="label-text">Seguir perfil</span>
				<input
					type="checkbox"
					class="toggle toggle-secondary"
					name="shouldFollow"
					checked={form?.shouldFollow ?? ''} />
			</label>
		</div>

		<div class="form-control">
			<label class="label cursor-pointer">
				<span class="label-text">Seguir perfis indicados</span>
				<input
					type="checkbox"
					class="toggle toggle-secondary"
					name="shouldFollowOthers"
					checked={form?.shouldFollowOthers ?? ''} />
			</label>
		</div>

		<div class="form-control">
			<label class="label cursor-pointer">
				<span class="label-text">Comentar no post</span>
				<input
					type="checkbox"
					class="toggle toggle-secondary"
					name="shouldComment"
					checked={form?.shouldComment ?? ''} />
			</label>
		</div>

		<div class="form-control">
			<label for="shouldMention" class="label cursor-pointer">
				<span class="label-text">Marcar amigos</span>
				<input
					id="shouldMention"
					type="checkbox"
					class="toggle toggle-secondary"
					name="shouldMention"
					checked={form?.shouldMention ?? ''} />
			</label>
		</div>

		<div class="form-control mt-6">
			<button type="submit" class="btn btn-primary" disabled={submitting}>
				{#if submitting}
					<span class="loading loading-spinner loading-md"></span>
				{:else}
					Cadastrar
				{/if}
			</button>
		</div>
	</form>
</div>
