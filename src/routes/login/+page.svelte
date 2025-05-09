<script>
	import { goto } from '$app/navigation';
	import H1 from '$lib/components/H1.svelte';
	import Link from '$lib/components/Link.svelte';
	import Title from '$lib/components/Title.svelte';

	let username = $state('user');
	let password = $state('password');

	const login = async () => {
		const response = await fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		});
		const data = await response.json();
		if (response.ok) {
			goto('/data');
		} else {
			alert('Login failed!');
		}
	};
</script>

<Title>Login</Title>
<H1>Tast dine oplysninger for neden</H1>
<p class="mb-4">Log ind for at få adgang til din data.</p>

<input class="input mb-4 block" bind:value={username} type="text" placeholder="Indtast Email" />
<input class="input mb-4 block" bind:value={password} type="password" placeholder="Indtast Password" />
<button class="btn btn-primary mb-4" onclick={login}>Login</button>

<p>Har du ikke en konto endnu?</p>
<Link href="/signup">Opret ny konto</Link>
