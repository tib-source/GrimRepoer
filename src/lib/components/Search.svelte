<script>
    export let handleSearch;
    let searchTerm;
    import searchIcon from '$lib/assets/Search.svg';

</script>


<div id="search-input-cont">
    
	<input type="text" 
				 id="search-field" 
				 placeholder="Enter Repo Name" 
				 autocomplete="off"
				 bind:value={searchTerm}
				 on:input
                 on:keydown={ e=> {if(e.key === "Enter") {handleSearch(searchTerm)}}} />
    <button><img src="{searchIcon}" on:click={()=> handleSearch(searchTerm)} alt="" srcset=""></button>
</div> 


<style>
	#search-input-cont {
        position: relative;
		width: 40%;
		display: flex;
		align-items: center;
	}

    button{
        background-color: white;
        padding: .35rem;
        position: absolute;
        right: -1rem;
        border-radius: 0 1rem 1rem 0;
    }

	#search-field {
		width: 100%;
		font-size: 1rem;
        border-radius: .6rem;
        border: 1px solid #4b505b;
		padding: .65rem;
        background-color: #1a2037;
        color: white;
        outline: none;
	}

</style>