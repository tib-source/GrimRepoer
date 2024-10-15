<script>
	import { browser } from '$app/environment';
	import { goto, replaceState } from '$app/navigation';
	import { PUBLIC_CLIENT_ID } from '$env/static/public';
	import ghIcon from '$lib/assets/github.svg';
	import RepoList from '$lib/components/RepoList.svelte';
	import { accessToken } from '$lib/store';
	import { redirect } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import { dev } from '$app/environment';
	import { PUBLIC_DEV_API, PUBLIC_PROD_API } from '$env/static/public';



	export async function load() {

		let token = "";
		accessToken.subscribe(value => token = value)
		if (token) {
			return
		}
		const url = new URL(window.location.href);
		const code = url.searchParams.get('code')

		if (code) {
			try {

				let apiUrl = dev ? PUBLIC_DEV_API : PUBLIC_PROD_API
				const response = await fetch(apiUrl, {
					method: "POST",
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						code,
					})
				});

				const resBody = await response.json();
				const extractedToken = resBody.token.split("&")[0].split("=")[1]
				
				if (extractedToken.includes("bad_")){

					throw Error(extractedToken)
				}
				accessToken.set(extractedToken)


			} catch (error) {
				console.error("Error exchanging code for accessToken", error)
				return
			}

		}
		return
	}
	
	const GH_BASE_URL = '  https://api.github.com';

	const handleGithubAuth = () => {
		const redirectUri = window.location.href;
		window.location.href = `https://github.com/login/oauth/authorize?client_id=${PUBLIC_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo,delete_repo`;
	};
	$: if ($accessToken){
		if (browser){
			localStorage.setItem('accessToken', $accessToken);
		}
	}


	onMount(async() => {
		let localToken = localStorage.getItem('accessToken');
		if (localToken) {
			accessToken.set(localToken);
		}

		await load()

		const url = new URL(window.location.href);
		const params = url.searchParams;
		if (params) {
			goto("/")
		}
	});
</script>

<main>
	{#if !$accessToken}
		<button on:click={handleGithubAuth}><img src={ghIcon} alt="The Github Icon" />Sign in</button>
	{:else}
		<RepoList />
	{/if}
</main>

<style lang="scss">
	main {
		margin-top: 1rem;
		width: min(900px, 80%);
		border-radius: 1rem;
	}

	button {
		margin: auto;
		display: flex;
		align-items: center;
		padding: 10px 20px;
		background-color: #24292e;
		color: white;
		border: none;
		border-radius: 5px;
		font-size: 16px;
		cursor: pointer;
		transition: background-color 0.3s ease;

		img {
			width: 32px; /* Adjust size of icon */
			aspect-ratio: 1;
			margin-right: 8px;
		}
	}
</style>
