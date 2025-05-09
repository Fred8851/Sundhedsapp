<script>
	import { goto } from '$app/navigation';
	import Title from '$lib/components/Title.svelte';
	import Link from '$lib/components/Link.svelte';
	import H1 from '$lib/components/H1.svelte';

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

<Title>Bliver kloger på din krop</Title>

<H1>Ved brug af denne applikation, kan du trak din smerte og se hvad dit gennemsnit niveau er.</H1>
