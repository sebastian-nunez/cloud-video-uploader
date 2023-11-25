/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { Storage } from "@google-cloud/storage";
import { initializeApp } from "firebase-admin/app";
import { Firestore } from "firebase-admin/firestore";
import * as functions from "firebase-functions";
import { logger } from "firebase-functions";
import { onCall } from "firebase-functions/v2/https";

// Start writing functions
// https://firebase.googlçe.com/docs/functions/typescript

// export const helloWorld = onRequest((req, res) => {
//   logger.info("Hello logs!", { structuredData: true });

//   res.status(200).json({ message: "Hello from Firebase!" });
// });

const rawVideoBucketName = "cloud-video-uploader-raw-videos";
const videoCollectionId = "videos";

initializeApp();
const firestore = new Firestore();
const storage = new Storage();

export const createUser = functions.auth.user().onCreate(user => {
  const userInfo = {
    userId: user.uid,
    email: user.email,
    name: user.displayName,
    photoUrl: user.photoURL
  };

  firestore.collection("users").doc(user.uid).set(userInfo);
  logger.info(`User created: ${JSON.stringify(userInfo)}`);
});

export const generateSignedUploadUrlForRawVideos = onCall(
  { maxInstances: 1 },
  async request => {
    // check if user is authenticated
    if (!request.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Only authenticated users can upload videos"
      );
    }

    const { auth, data } = request;
    const bucket = storage.bucket(rawVideoBucketName);

    // generate a unique file name
    const fileName = `${auth.uid}-${Date.now()}.${data?.fileExtension}`;

    const [url] = await bucket.file(fileName).getSignedUrl({
      version: "v4",
      action: "write",
      expires: Date.now() + 15 * 60 * 1000 // 15 minutes
    });

    logger.info(`Generated signed URL for ${fileName}`);
    return { url, fileName };
  }
);

export const getVideos = onCall({ maxInstances: 1 }, async () => {
  const snapshot = await firestore
    .collection(videoCollectionId)
    .limit(100)
    .get();

  const videos = snapshot.docs.forEach(doc => doc.data());

  logger.info(`Retrieved videos: ${JSON.stringify(videos)}`);
  return videos;
});
