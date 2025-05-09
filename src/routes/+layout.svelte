<script>
	import '../app.css';
	import { goto } from '$app/navigation';

	let { children } = $props();

	const handleLogin = () => {
		goto('/login'); // Naviger til login-siden
	};
</script>

<div class="navbar bg-blue-500 shadow-sm text-white">
    <div class="flex-1">
        <a href="/" class="btn btn-ghost normal-case text-xl text-white">CorpusRo</a>
    </div>
    <div class="flex-none">
        <button class="btn btn-primary" onclick={handleLogin}>Login</button>
    </div>
</div>

{@render children()}