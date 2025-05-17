/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */



const {onRequest} = require("firebase-functions/v2/https");
const { defineString } = require("firebase-functions/params");
const {initializeApp} = require("firebase-admin/app");
const cors = require('cors')({origin: []});
initializeApp(); 

const client_id = defineString("CLIENT_ID");
const client_secret = defineString("CLIENT_SECRET");


exports.getAccessToken = onRequest({
    timeoutSeconds: 1000,
}, async (request, response) => {
    cors(request, response, async () => { 

        const origin = request.headers.origin;
        // Handle CORS preflight
        if (request.method === 'OPTIONS') {
            const origin = request.headers.origin;
            response.set('Access-Control-Allow-Origin', "https://tib-source.github.io/");
            response.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
            response.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            return response.status(204).send('');
        }


        const code = request.body["code"];
    
        console.log(request.body, code)
        try {
            const payload = JSON.stringify({
                client_id: client_id.value(),
                client_secret: client_secret.value(),
                code: code,
            })
    
            const res = await fetch("https://github.com/login/oauth/access_token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
    
                },
                body: payload,
            })
            
            res.text().then(
                (data) => response.status(200).send({ token: data }))
                .catch((error) => response.status(400).send(error));
    
        } catch (error) {
            console.error("Error exchanging code for accessToken", error);
            response.status(400).send("");
        }
    })
    
});


