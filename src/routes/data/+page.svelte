<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import Title from '$lib/components/Title.svelte';
    import Link from '$lib/components/Link.svelte';
    import H1 from '$lib/components/H1.svelte';

    let data = [];
    let rangeValue = 1; // Standardværdi for slideren
    let loading = false;
    let average = null; // Variable to store the average value

    const saveData = async () => {
        const response = await fetch('/api/data/self', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ value: rangeValue }) // Gem sliderens værdi
        });
        const responseData = await response.json();
        if (response.ok) {
            rangeValue = 1; // Nulstil slideren
            await refreshData(); // Refresh data after saving
        } else {
            console.error('Error saving data:', responseData);
        }
    };

    const refreshData = async () => {
        loading = true;
        const res = await fetch('api/data/self');
        const fetchedData = await res.json();
        if (fetchedData.length > 0) {
            const total = fetchedData.reduce((sum, item) => sum + item.value, 0);
            average = (total / fetchedData.length).toFixed(2); // Calculate average
        } else {
            average = null; // Handle case with no data
        }
        loading = false;
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

    onMount(refreshData);
</script>

<button class="btn btn-outline" onclick={logout}>Log ud</button>
<Title>Patient data</Title>

<H1>Din data</H1>
<p>Fra en skala fra 1 til 10, hvor ondt har du?.</p>

<div class="w-full max-w-xs">
    <input
        type="range"
        min="1"
        max="10"
        bind:value={rangeValue}
        class="range"
        step="1"
    />
    <div class="flex justify-between px-2.5 mt-2 text-xs">
        {#each Array(10).fill(0) as _, i}
            <span>|</span>
        {/each}
    </div>
    <div class="flex justify-between px-2.5 mt-2 text-xs">
        {#each Array(10).fill(0) as _, i}
            <span>{i + 1}</span>
        {/each}
    </div>
</div>

<button disabled={loading} class="btn btn-primary mt-4" onclick={saveData}>Gem data</button>
<div class="divider"></div>

{#if loading}
    <div class="loading loading-spinner loading-xl"></div>
{/if}

{#if average !== null}
    <div class="post">
        <h2 class="INT-2xl">Din gennemsnits smerte: {average}</h2>
    </div>
{:else}
    <p>Ingen data tilgængelig.</p>
{/if}


