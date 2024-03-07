<script lang="ts">
	import { fade } from 'svelte/transition';
	import { ToastLevel } from '$lib/components/types';

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
			class:alert-info={level === ToastLevel.Info}
			class:alert-warning={level === ToastLevel.Warning}
			class:alert-error={level === ToastLevel.Error}
			class:alert-success={level === ToastLevel.Success}>
			<span>{msg}</span>
		</div>
	</div>
{/if}
