<script>
	import { accessToken, GH_BASE_URL, repoList, selected } from '$lib/store';
	import { onMount } from 'svelte';
	import Repo from './Repo.svelte';
	import Search from './Search.svelte';
	import ConfirmationModal from './ConfirmationModal.svelte';
	import Loading from './Loading.svelte';
	import Pagination from './Pagination.svelte';

	/**
	 * @type {any[]}
	 */
	let trimmed = []
	/**
	 * @type {string | any[]}
	 */
	let searchResult = []
	/**
	 * @type {any[]}
	 */
	let searchTrimmed = []
	/**
	 * @type {any[]}
	 */

	onMount(async () => {
		let pageCount = 1; 
		let repoAccumulator = []
		while(true){ 
			let repoRes = await fetch(`${$GH_BASE_URL}/user/repos?page=${pageCount}`, {
				method: 'GET',
				headers: {
					Accept: 'application/vnd.github+json',
					Authorization: `Bearer ${$accessToken}`,
					'X-GitHub-Api-Version': '2022-11-28'
				}
			})

			let data = await repoRes.json()
			if (data.length == 0){
				break
			}
			repoAccumulator.push(...data)
			pageCount += 1 
		}

		// @ts-ignore
		repoList.set(repoAccumulator)
		pageLoaded = true

		
	});

	// @ts-ignore
	const handleSelect = (e, repo, setSelected) => {
		let curr = e.srcElement;
		console.log(repo)
		if ($selected.includes(repo)){
			setSelected(false)
			removeFromSelected(repo)
		}else{ 
			$selected.push(repo)
			setSelected(true)
		}
		
	}

	let pageLoaded = false
	let currSearch = ""

	const searchRepos = (/** @type {string} */ searchTerm) => {
		currSearch = searchTerm
		searchResult = $repoList.filter(repo => repo.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
	}
	let showConfirmModal = false;

	const toggleConfirmationModal = () =>{ 
		showConfirmModal = !showConfirmModal
	}

	const handleDelete = () => { 
		if (!showConfirmModal){
			if($selected.length > 0){
				toggleConfirmationModal()
			}
		}else{ 
			console.log("Deleted")		
		}
	}


	const inSelected = (/** @type {any} */ repo) => { 
		return $selected.includes(repo)
	}

	const removeFromSelected = (toRemove) => { 
		selected.update(selected => selected.filter(repo => repo != toRemove))
	}

	let direction = 1;

</script>

<main>

	{#if showConfirmModal}
		<ConfirmationModal toggleModal={toggleConfirmationModal} selected={$selected} removeFromSelected={removeFromSelected} />
	{/if}
	<div class="operations" >
		<Search handleSearch={searchRepos} />
		<button on:click={handleDelete}>Delete</button>
	</div>
	{#if $repoList.length === 0 }
		<div class="loader"><Loading/></div>
	{/if}
	<div class="repo_list">

		{#if currSearch && searchResult.length === 0}
			<p> :( no results found</p>
		{:else if searchResult.length > 0}
			{#each searchTrimmed as repo (repo.id)}
				<Repo bind:direction={direction} repo={repo} selected={$selected.includes(repo)} handleSelect={handleSelect}/>
			{/each}
			<Pagination bind:direction={direction} itemList={searchResult} bind:trimmedList={searchTrimmed}/>
		{:else}
			{#each trimmed as repo (repo.id)}
				<Repo direction={direction} repo={repo} selected={$selected.includes(repo)} handleSelect={handleSelect}/>
			{/each}
			{#if pageLoaded}
				<Pagination bind:direction={direction} itemList={$repoList} bind:trimmedList={trimmed}/>
			{/if}
		{/if}
	</div>
</main>

<style lang="scss">
	main {
		width: 100%;
		padding: 2rem;
		overflow: hidden;

		.loader{
			display: flex;
			justify-content: center;
			padding-top: 3rem;
		}
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
				padding: .7rem 1.5rem;
				border-radius: 1rem;
				background-color: rgba(255, 0, 0, 0.728);
				border: 1px solid black;
				color: black;
				font-weight: 700;
				cursor: pointer;
				justify-self: flex-end;
			}

			button:active{ 
				border: 1px dotted white;
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


		.selected{ 
        background-color: rgba(53, 143, 221, 0.125);
		}


	}
</style>
