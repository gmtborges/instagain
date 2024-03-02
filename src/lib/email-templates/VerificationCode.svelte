<script>
	import { Html, Text } from 'svelte-email';
	export let name = 'usuário';
	export let verificationCode = '123456';
</script>

<Html lang="pt-br">
	<Text>
		Olá, {name}!
	</Text>
	<Text>
		Seja bem vindo ao InstaGain! Para confirmar seu e-mail, utilize o código
		abaixo:
	</Text>
	<Text style={{ fontSize: '18px', fontWeight: 'bold' }}>
		{verificationCode}
	</Text>
</Html>
