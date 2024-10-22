<script>    
    import pullRequests from '$lib/assets/Nesting.svg';
    import starIcon from '$lib/assets/Star.svg';
    export let repo;
    export let handleSelect;
    /**
	 * @type {any}
	 */
     export let selected;

    import { formatDistanceToNow } from 'date-fns'
	import { slide, fly, fade } from 'svelte/transition';

    const handleDate = (/** @type {string} */ date) => { 
        let to_format = new Date(date)
        return formatDistanceToNow(to_format, { 
            addSuffix: true
        })
    }

    const setSelected = ( value ) =>{
        selected = value
    }

    export let direction = 1;

    
</script>

<main>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div in:fly={{ x: 50 * direction, duration: 1000}} class="container" class:selected on:click={(e) => handleSelect(e, repo, setSelected)} role="cell" tabindex=0>
        <h3><a href={repo.html_url} on:click|stopPropagation target="_blank">{repo.full_name}</a></h3>
        <p>Owner: <a on:click|stopPropagation href={repo.owner.html_url}> {repo.owner.login} </a></p>
        <div  class="stats">
            <span> <img src="{pullRequests}" alt="" srcset=""> <p>{repo.forks_count}</p></span>
            <span> <img src="{starIcon}" alt="" srcset=""> <p>{repo.stargazers_count}</p></span>
            <span
            style:font-size={".75rem"}
            > Updated {handleDate(repo.updated_at)}</span>
            <div></div>
        </div>
    </div>
</main>


<style lang="scss">
    .container{ 
        background:  rgba(17, 23, 40, 0.664);
        backdrop-filter: blur(10px);
        padding: 1rem 1.5rem;
        display: grid;
        gap: .5rem;
        border-radius: 1rem;
        min-height: 135px;
        max-height: 135px;
        box-shadow: 0 0 .1rem white;
        cursor: pointer;

        a { 
            color: rgb(190, 189, 255);
            text-decoration: none;
        }

        span{
            display: flex;

            p{
            margin-top: 2px;
            margin-left: 2px;
        }
        }


        .stats{ 
            display: flex;
            gap: 1rem;
            align-items: center;

            
        }
    }

    .selected{ 
        background-color: rgba(26, 22, 75, 0.594);
    }


    

</style>