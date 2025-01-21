<script>
export let selected;
export let removeFromSelected;
export let toggleModal;
export let handleDelete;
</script>
<div class="modal">

    <h1>Confirm Selected Deletions : </h1>
    <div class="delete_list">
    {#each selected as repo }
        <div class="to_be_deleted"><a href="{repo.html_url}">{repo.full_name}</a> <button on:click={()=> removeFromSelected(repo)}>X</button></div>
    {/each}
    </div>
    <div class="buttons">
        <button id="cancel" on:click={toggleModal}>Cancel</button>
        <button on:click={handleDelete}>Delete</button>
    </div>
</div>
<style lang="scss">
    .modal{
        position: fixed;
        top: 50%;  
        left: 50%; 

        transform: translate(-50%, -50%);
        width: min(700px,80%);
        background-color:rgba(0, 0, 0, 0.699);
        color: white;
        z-index: 100;
        min-height: 200px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        backdrop-filter: blur(3px);
        padding: 3rem;
        gap: 1.5rem;
        box-shadow: 0 0 4rem rgba(255, 255, 255, 0.351);
        h1{
            text-align: left;
        }

        .delete_list{
            display: grid;
            gap: 1rem;
        }
        .to_be_deleted{ 
            margin: auto;
            display: flex;
            gap: 1rem;
            padding: .5rem 1rem;
            background-color: white;
            width: 80%;
            justify-content: space-between;
            align-items: center;
            a{ 
                text-decoration: none;
                color: red
            }

            button{ 
                padding: .1rem .5rem;
                outline: none;
                color: black;
                background-color: white;
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