import { CLIENT_ID } from '$env/static/private';
import { CLIENT_SECRET } from '$env/static/private';

export async function load({ url } ){ 

    const code = url.searchParams.get('code')

    if (code){ 
        const redirectUri = url.href;

        try{ 
            const response = await fetch("https://github.com/login/oauth/access_token", {
                method: "POST",
                headers: { 
                    accept: 'application/json'
                },
                body: JSON.stringify({
                    client_id: CLIENT_ID, 
                    client_secret: CLIENT_SECRET,
                    code,
                    redirect_uri: redirectUri
                })
            });

            const accessToken = response.json().then(data => data.access_token)
        
            return {
                props: { 
                    accessToken
                }
            }
        } catch (error){ 
            console.error("Error exchanging code for accessToken", error)
            return{ 
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