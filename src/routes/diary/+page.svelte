<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Title from '$lib/components/Title.svelte';
	import Link from '$lib/components/Link.svelte';
	import H1 from '$lib/components/H1.svelte';

	let diary = $state([]);
	let title = $state('');
	let content = $state('');
	let loading = $state(false);

	const saveDiary = async () => {
		const response = await fetch('/api/diary/self', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ title, content })
		});
		const data = await response.json();
		if (response.ok) {
			diary.push(data);
			title = '';
			content = '';
		} else {
			console.error('Error saving diary:', data);
		}
	};

	const logout = async () => {
		const response = await fetch('/api/logout', {
			method: 'POST'
		});
		
		if (response.ok) {
			goto('/');
		} else {
			console.error('Logout failed');
		}
	};

	onMount(async () => {
		// Fetch the diary entries when the component mounts
		loading = true;
		const res = await fetch('api/diary/self');
		diary = await res.json();
		loading = false;
	});
</script>

<button class="btn btn-outline" onclick={logout}>Log ud</button>
<Title>Patient Dagbog</Title>


		<H1>Din Dagbog</H1>

	
	<p>Dine dagbogsindlæg vil blive vist her.</p>

	<Link href="/admin">Gå til Admin Side</Link>

<input bind:value={title} type="text" placeholder="Title" class="input block" />
<textarea bind:value={content} placeholder="Content" class="textarea block"></textarea>
<button disabled={loading} class="btn btn-primary" onclick={saveDiary}>Gem dagbog</button>
<div class="divider"></div>
{#if loading}
	<div class="loading loading-spinner loading-xl"></div>
{/if}
{#each diary as post}
	<div class="post">
		<h2 class="text-2xl">{post.title}</h2>
		<i class="text-xs">{post.created_at}</i>
		<p>{post.content}</p>
	</div>
{/each}
