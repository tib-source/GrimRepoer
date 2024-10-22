<script>
    export let itemList; 
    export let trimmedList;
    export let direction;
    import arrowLeft from "$lib/assets/arrowLeft.svg"
    import arrowRight from "$lib/assets/arrowRight.svg"
	import { onMount } from "svelte";

    $: totalItems = itemList.length;
    $: currentPage = 0; 
    $: itemsPerPage = 6;
    $: totalPages =  Math.ceil(totalItems / itemsPerPage)
    $: start =  currentPage * itemsPerPage
    $: end = currentPage === totalPages - 1  ? totalItems - 1 : start + itemsPerPage - 1  ;
    $: trimmedList = itemList.slice(start, end + 1)
    $: currentPage, start, end

    
</script>
  <div class="pagination">
    <button on:click|preventDefault={()=> {currentPage += -1; direction = -1}} disabled={currentPage === 0 ? true : false} ><img src={arrowLeft}  alt="arrowLeft"></button>
    {start + 1 } - {end + 1} of {totalItems}
    <button on:click|preventDefault={()=> {currentPage += 1; direction = 1}} disabled={currentPage === totalPages - 1 ? true : false}><img src={arrowRight} alt="arrowRight"></button>
  </div>

<style>
  .pagination {
    padding-top: 1rem;
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    margin: auto;
    grid-column: 1/-1;
    color: white;

  }

  img{ 
    width: 15px;
  }

  
  .pagination button {
    color: white;
    padding: 4px 8px; 
    transition: background-color .3s;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  
  
  .pagination button:hover:not(.active) {background-color: rgb(32, 18, 84);}
  </style>