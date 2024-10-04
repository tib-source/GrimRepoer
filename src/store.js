import { writable } from "svelte/store";

const repoList = () => { 
    const {subscribe, set, update} = writable([])


    return { 
        subscribe, 
        getGithubRepos: (repos) => { 
            return $repos.filter(repo => repo.origin === "gh")
        }
    }
}
