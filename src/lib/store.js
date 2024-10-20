import { readable, writable } from "svelte/store";

export const accessToken = writable("")
export const repoList = writable([])
export const GH_BASE_URL = readable("https://api.github.com")
export const selected = writable([])