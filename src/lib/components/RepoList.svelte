<script>
	import { accessToken, GH_BASE_URL } from '$lib/store';
	import { onMount } from 'svelte';

	/**
	 * @type {any[]}
	 */
	let selected = [];
	/**
	 * @type {any[]}
	 */
	$: repos = [];

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
				console.log(result);
				repos = result;
			})
			.catch((error) => console.log(error));
	});

	console.log(repos);
</script>

<main>
	{#if selected}
		SELECTED : {selected.map((value) => value.full_name)}
	{/if}
	<div class="repoList">
		{#each repos as repo}
			<section>
				<input type="checkbox" bind:group={selected} value={repo} name="selected" id="selection" />
				<div class="repoInfo">
					<h4><a target="_blank" href={repo.html_url}>{repo.full_name}</a></h4>
					<p>{repo.owner.login}</p>
				</div>
			</section>
		{/each}
	</div>
</main>

<style lang="scss">
	main {
		width: 70%;
		height: 90%;

		.repoList {
			display: grid;
			grid-template-columns: 1fr 1fr;
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
