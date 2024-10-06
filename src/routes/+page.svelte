<script>
    import ghIcon from "$lib/assets/github.svg"
    export let accessToken; 
    
    const handleGithubAuth = () => { 
        const clientId = "Ov23lilc8xzuk79UImmX"; 
        const redirectUri = encodeURIComponent(window.location.href)
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo,delete_repo`;
    }
</script>
<main>
    {#if !accessToken}
    <button on:click={handleGithubAuth}><img src={ghIcon} alt="The Github Icon">Sign in</button>
    {:else}
    <p>AUTHENTICATED: {accessToken}</p>
    {/if}
</main>

<style lang="scss">

    main{
        margin-top: 1rem;
        width: min(700px,70%);
        max-height: 60%;
        aspect-ratio: 1;
        border-radius: 1rem;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.241);
        background:#678079;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    button{
        display: flex;
        align-items: center;
        padding: 10px 20px;
        background-color: #24292e;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    
        img{
            width: 32px; /* Adjust size of icon */
            aspect-ratio: 1;
            margin-right: 8px;
        }
    
    
    }


</style>