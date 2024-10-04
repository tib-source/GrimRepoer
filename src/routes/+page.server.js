export async function load({ url } ){ 

    const code = url.searchParams.get('code')

    if (code){ 
        const clientId = "Ov23lilc8xzuk79UImmX";
        const clientSecret = ""; 
        const redirectUri = url.href;

        try{ 
            const response = await fetch("https://github.com/login/oauth/access_token", {
                method: "POST",
                headers: { 
                    accept: 'application/json'
                },
                body: JSON.stringify({
                    client_id: clientId, 
                    client_secret: clientSecret,
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