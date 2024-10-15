<script>
	import { accessToken, GH_BASE_URL, repoList } from '$lib/store';
	import { onMount } from 'svelte';
	import Repo from './Repo.svelte';
	import Search from './Search.svelte';
	import { el } from 'date-fns/locale';

	/**
	 * @type {any[]}
	 */
	let filtered = []
	/**
	 * @type {any[]}
	 */
	let selected = [];

	onMount(async () => {
		let repoRes = fetch(`${$GH_BASE_URL}/user/repos`, {
			method: 'GET',
			headers: {
				Accept: 'application/vnd.github+json',
				Authorization: `Bearer ${$accessToken}`,
				'X-GitHub-Api-Version': '2022-11-28'
			}
		})
			.then((data) => {
				return data.json();
			})
			.then((result) => {
				repoList.set(result)
			})
			.catch((error) => console.log(error));
	});

	const handleSelect = () => {
		console.log("clicked")
	}

	let searchTerm = "";

	const searchRepos = () => { 
		filtered = $repoList.filter(repo => repo.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
	}
</script>

<main>
	<div class="operations">
		<Search bind:searchTerm on:input={searchRepos} />
		<button>Delete</button>
	</div>
	<div class="repo_list">
		{#if searchTerm && filtered.length === 0}
			<p> :( no results found</p>
		{:else if filtered.length > 0}
			{#each filtered as repo}
				<Repo repo={repo} handleSelect={handleSelect}/>
			{/each}
		{:else}
			{#each $repoList as repo}
				<Repo repo={repo} handleSelect={handleSelect}/>
			{/each}
		{/if}
	</div>
</main>

<style lang="scss">
	main {

		padding: 2rem;
		overflow: hidden;

		.repo_list {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 1rem;
		}

		.operations{ 
			border-radius: 1rem;
			margin-bottom: 1rem;
			padding: .2rem;
			display: flex;
			justify-content: space-between;


			button{
				padding: .7rem;
				border-radius: 1rem;
				background-color: rgba(255, 0, 0, 0.728);
				color: white;
				font-weight: 700;
				justify-self: flex-end;
			}
		}
		section {
			display: flex;
			align-items: center;
		}
		.repoInfo {
			margin: 1rem;
			overflow-y: scroll;
			border: 1px solid black;
			padding: 1rem;
		}
	}
</style>
