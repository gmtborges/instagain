<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import type { LayoutData } from '../$types';

	export let data: LayoutData;
</script>

<svelte:head>
	<title>InstaGain - Cadastrar sorteio</title>
</svelte:head>

<Header currentUser={data.currentUser} />
<slot />
