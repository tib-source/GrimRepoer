<script>    
    export let repo;
    export let handleSelect;
    export let selected;

    import { formatDistanceToNow } from 'date-fns'

    const handleDate = (/** @type {string} */ date) => { 
        let to_format = new Date(date)
        return formatDistanceToNow(to_format, { 
            addSuffix: true
        })
    }

    const setSelected = ( value ) =>{
        selected = value
    }
    
</script>

<main>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="container" class:selected on:click={(e) => handleSelect(e, repo, setSelected)} role="cell" tabindex=0>
        <h3><a href={repo.html_url} on:click|preventDefault|stopPropagation target="_blank">{repo.full_name}</a></h3>
        <p>{repo.description && " "} | Owner: <a on:click|preventDefault|stopPropagation href={repo.owner.html_url}> {repo.owner.login} </a></p>
        <div  class="stats">
            <span> 🏃🏻‍♂️ 18</span>
            <span> ⭐️ 300</span>
            <span
            style:font-size={".75rem"}
            > Updated {handleDate(repo.updated_at)}</span>
            <div></div>
        </div>
    </div>
</main>


<style lang="scss">
    .container{ 
        background:  rgba(17,23,40,1);
        padding: 1rem 1.5rem;
        display: grid;
        gap: .5rem;
        border-radius: 1rem;

        a { 
            color: rgb(190, 189, 255);
            text-decoration: none;
        }

        .stats{ 
            display: flex;
            gap: 1rem;
            align-items: center;

            
        }
    }

    .selected{ 
        background-color: rgba(53, 143, 221, 0.125);
    }


    

</style>