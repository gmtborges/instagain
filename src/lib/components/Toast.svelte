<script lang="ts">
	import { fade } from 'svelte/transition';

	export let level: 'warn' | 'info' | 'error' | 'success';
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
	<div class="toast" transition:fade>
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
