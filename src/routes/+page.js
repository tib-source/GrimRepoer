import { accessToken } from '$lib/store';
import { dev } from '$app/environment';
import { PUBLIC_DEV_API, PUBLIC_PROD_API } from '$env/static/public';




export async function load({ url, fetch }) {

    let token = "";
    accessToken.subscribe(value => token = value)

    if (token) {
        return
    }

    const code = url.searchParams.get('code')

    if (code) {
        try {

            let apiUrl = dev ? PUBLIC_DEV_API : PUBLIC_PROD_API
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code,
                })
            });

            const resBody = await response.json();

            const extractedToken = resBody.token.split("&")[0].split("=")[1]
            accessToken.set(extractedToken)


        } catch (error) {
            console.error("Error exchanging code for accessToken", error)
            return
        }

    }
    return
}