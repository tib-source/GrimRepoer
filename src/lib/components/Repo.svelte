<script>    
    export let repo;
    export let handleSelect;

    import { formatDistanceToNow } from 'date-fns'

    const handleDate = (/** @type {string} */ date) => { 
        let to_format = new Date(date)
        return formatDistanceToNow(to_format, { 
            addSuffix: true
        })
    }
    
</script>

<main>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="container" on:click={handleSelect} role="cell" tabindex=0>
        <h3><a href={repo.html_url} target="_blank">{repo.full_name}</a></h3>
        <p>{repo.description && " "} | Owner: <a href={repo.owner.html_url}> {repo.owner.login} </a></p>
        <div class="stats">
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


    

</style>