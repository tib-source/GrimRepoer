import { PUBLIC_CLIENT_ID, PUBLIC_CLIENT_SECRET } from '$env/static/public';

export async function load({ fetch, url } ){ 

    const code = url.searchParams.get('code')
    console.log(`CODE: ${code} `)

    if (code){ 
        const redirectUri = url.origin
        console.log(redirectUri)

        const payload = JSON.stringify({
            client_id: PUBLIC_CLIENT_ID, 
            client_secret: PUBLIC_CLIENT_SECRET,
            code,
            redirect_uri: redirectUri
        })

        console.log(payload)
        const response = await fetch("https://github.com/login/oauth/access_token", {
            mode: 'no-cors',
            headers: {
                "Access-Control-Allow-Origin" : "http://localhost:5173"
            },
            method: "POST",
            body: payload
        });

        console.log(response)
        const accessToken = "meow"
        console.log(accessToken)
        return {
            props: { 
                accessToken
            }
        }
    }
    return { 
        props: {}
    };
}