/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// prettier-ignore
import {initializeApp} from "firebase-admin/app";
import {Firestore} from "firebase-admin/firestore";
import * as functions from "firebase-functions";
import {logger} from "firebase-functions";

// Start writing functions
// https://firebase.googlçe.com/docs/functions/typescript

// export const helloWorld = onRequest((req, res) => {
//   logger.info("Hello logs!", { structuredData: true });

//   res.status(200).json({ message: "Hello from Firebase!" });
// });

initializeApp();
const firestore = new Firestore();

export const createUser = functions.auth.user().onCreate((user) => {
  const userInfo = {
    userId: user.uid,
    email: user.email,
    name: user.displayName,
    photoUrl: user.photoURL,
  };

  firestore.collection("users").doc(user.uid).set(userInfo);
  logger.info(`User created: ${JSON.stringify(userInfo)}`);
});
