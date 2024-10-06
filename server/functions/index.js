/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { defineString } from "firebase-functions/params";
import { onRequest } from "firebase-functions/v2/https";

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

const client_id = defineString("CLIENT_ID");
const client_secret = defineString("CLIENT_SECRET");


export const getAccessToken = onRequest({
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

        await fetch("https://github.com/login/oauth/access_token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: payload,
        }).text().then(
            (data) => response.status(200).send({ token: data }))
            .catch((error) => response.status(400).send(error));

    } catch (error) {
        console.error("Error exchanging code for accessToken", error);
        response.status(400).send("");
    }
});


