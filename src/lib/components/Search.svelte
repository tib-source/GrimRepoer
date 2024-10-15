<script>
	/**
	 * @type {string}
	 */
	 export let searchTerm;
</script>


<div id="search-input-cont">
	<input type="text" 
				 id="search-field" 
				 placeholder="Enter Search Term" 
				 autocomplete="off"
				 bind:value={searchTerm}
				 on:input />
</div> 


<style>
	#search-input-cont {
		width: 40%;
		display: flex;
		align-items: center;
	}

	#search-field {
		width: 100%;
		font-size: 1rem;
        border-radius: .6rem;
        border: 1px solid #4b505b;
		padding: .65rem;
        background-color: #1a2037;
        color: white;
	}

</style>