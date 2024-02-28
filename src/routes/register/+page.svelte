<script>
</script>

<div class="flex justify-center mt-20 sm:mt-44 lg:mt-52 px-4">
	<div class="bg-white p-8 rounded-lg shadow-md w-full max-w-lg border">
		<form class="space-y-4">
			<div>
				<label for="name" class="block mb-2 text-sm font-medium text-gray-700"
					>Nome</label>
				<input
					type="text"
					name="name"
					id="name"
					placeholder="João da Silva"
					class="input input-bordered w-full" />
			</div>
			<div>
				<label for="name" class="block mb-2 text-sm font-medium text-gray-700"
					>E-mail</label>
				<input
					type="email"
					name="email"
					id="email"
					placeholder="usuario@exemplo.com"
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
					placeholder="Mínimo 8 caracteres, letras e números"
					class="input input-bordered w-full" />
			</div>
			<button type="submit" class="btn btn-secondary w-full">Registrar</button>
		</form>
		<div class="text-center mt-4">
			<span>Já possui conta?</span>
			<a href="/signin" class="link link-secondary font-bold">Entrar</a>
		</div>
	</div>
</div>
