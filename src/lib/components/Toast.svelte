<script lang="ts">
	import { fade } from 'svelte/transition';

	type ToastLevel = 'warn' | 'info' | 'error' | 'success';
	export let level: ToastLevel;
	export let msg: string;

	$: {
		if (msg) {
			setTimeout(() => {
				msg = '';
			}, 3000);
		}
	}
</script>

{#if level && msg}
	<div class="toast toast-center md:toast-bottom md:toast-end" transition:fade>
		<div
			class="alert"
			class:alert-warning={level === 'warn'}
			class:alert-info={level === 'info'}
			class:alert-error={level === 'error'}
			class:alert-success={level === 'success'}>
			<span>{msg}</span>
		</div>
	</div>
{/if}
