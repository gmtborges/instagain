<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<svelte:head>
	<title>Instagain - Seu sorteios em um só lugar.</title>
</svelte:head>

<Header currentUser={data.currentUser} />
<slot />
