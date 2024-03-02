<script>
	import { page } from '$app/stores';
</script>

<div class="flex items-center justify-center mt-20 sm:mt-44 lg:mt-52">
	<div class="container">
		<div class="text-center">
			<h2
				class="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
				Erro {$page.status}
			</h2>
			<p
				class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
				{$page.error?.message}
			</p>
		</div>
		<div class="mt-5 max-w-md mx-auto flex justify-center items-center">
			<a href="/" class="btn btn-primary btn-outline">Ir para o início</a>
		</div>
	</div>
</div>
