import { accessToken } from '../store.js';


let token = ""

accessToken.subscribe(value => token = value)

export async function load({ url, fetch }) {

    if (token !== "") {
        return
    }
    const code = url.searchParams.get('code')

    if (code) {
        try {
            const response = await fetch("http://127.0.0.1:5001/gitrepoer/us-central1/getAccessToken", {
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