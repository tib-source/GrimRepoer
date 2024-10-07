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

initializeApp(); 

const client_id = defineString("CLIENT_ID");
const client_secret = defineString("CLIENT_SECRET");


exports.getAccessToken = onRequest({
    cors: true,
    timeoutSeconds: 1000,

}, async (request, response) => {
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
});


