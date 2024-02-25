<script lang="ts">
	import imagePlaceholderPNG from '$lib/assets/image-placeholder.png';
	export let item: {
		id: string;
		description: string;
		image: string;
		endDate: string;
		link: string;
	};
</script>

<div class="card w-96 bg-base-100 shadow-xl">
	<figure>
		<img class="h-64" src={item.image ? item.image : imagePlaceholderPNG} alt="Imagem sorteio" />
	</figure>
	<div class="card-body">
		<h2 class="card-title min-h-14">{item.description}</h2>
		<p>
			Data de encerramento<br />
			<span class="font-medium">
				{new Date(item.endDate).toLocaleDateString('pt-BR', {
					month: 'short',
					day: 'numeric',
					year: 'numeric'
				})}
			</span>
		</p>
		<div class="flex flex-wrap gap-2 my-4">
			<span class="badge badge-primary badge-outline"> Marcar amigos </span>
			<span class="badge badge-secondary badge-outline"> Seguir </span>
			<span class="badge border-emerald-500 text-emerald-500 badge-outline"> Comentar </span>
			<span class="badge border-sky-500 text-sky-500 badge-outline"> Compartilhar </span>
		</div>
		<div class="card-actions">
			<button class="cursor-pointer p-3">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
					></path>
				</svg>
			</button>
			<a href={item.link} target="blank" class="ml-auto btn btn-accent"> Ir para sorteio </a>
		</div>
	</div>
</div>
