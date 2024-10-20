<script>
import closeIcon from '$lib/assets/close.svg';
export let selected;
export let removeFromSelected;
export let toggleModal;
let className = " ";
export { className as class } ;
</script>
<div class="{className}">

    <h1>Are you sure you want to delete the following?</h1>
    {#each selected as repo }
        <div class="to_be_deleted"><a href="{repo.html_url}">{repo.full_name}</a> <button on:click={()=> removeFromSelected(repo)}>X</button></div>
    {/each}
    <div class="buttons">
        <button id="cancel" on:click={toggleModal}>Cancel</button>
        <button>Delete</button>
    </div>
</div>
<style lang="scss">
    .modal{
        width: min(700px,80%);
        background-color: rgba(4, 20, 53, 0.819);
        position: absolute;
        z-index: 100;
        min-height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        backdrop-filter: blur(3px);
        padding: 3rem;
        gap: 1rem;
        box-shadow: 0 0 4rem rgba(255, 255, 255, 0.089);

        .to_be_deleted{ 
            display: flex;
            gap: 1rem;
            padding: .5rem 1rem;
            background-color: white;
            width: 80%;
            justify-content: space-between;
            align-items: center;
            a{ 
                text-decoration: none;
                color: red;
            }

            button{ 
                padding: .1rem .5rem;
                outline: none;
                color: white;
                background-color: black;
                border: 1px solid black;
            }
        }

        .buttons{ 
            display: flex;
            width: 100%;
            justify-content: end;
            gap: .5rem;       
            margin-top: 1rem; 
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
            #cancel{ 
                background-color: white;
            }
        }
}
</style>