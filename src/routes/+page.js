import { PUBLIC_CLIENT_ID, PUBLIC_CLIENT_SECRET } from '$env/static/public';

export async function load({ url }) {

    const code = url.searchParams.get('code')

    if (code) {
        const redirectUri = url.href;

        try {
            const response = await fetch("https://github.com/login/oauth/access_token", {
                method: "POST",
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    client_id: PUBLIC_CLIENT_ID,
                    client_secret: PUBLIC_CLIENT_SECRET,
                    code,
                    redirect_uri: redirectUri
                })
            });

            const accessToken = response.text().then(data => data.split("&")[0].split("=")[1]).catch(error => console.log(error))

            return {
                props: {
                    accessToken
                }
            }
        } catch (error) {
            console.error("Error exchanging code for accessToken", error)
            return {
                props: {
                    fail: true
                }
            }
        }

    }
    return {
        props: {}
    };
}