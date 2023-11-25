import { credential, initializeApp } from "firebase-admin";
import { Firestore } from "firebase-admin/firestore";
import { videoCollectionId } from "./constants";
import { Video } from "./types";

initializeApp({ credential: credential.applicationDefault() });
const firestore = new Firestore();

// Note: This requires setting an env variable in Cloud Run
/** if (process.env.NODE_ENV !== 'production') {
  firestore.settings({
      host: "localhost:8080", // Default port for Firestore emulator
      ssl: false
  });
} */

/**
 * Retrieves a video from the Firestore Video collection
 * @param videoId - The ID of the video to retrieve
 * @returns The video object
 */
const getVideo = async (videoId: string) => {
  if (!videoId) {
    throw new Error("Please provide a valid videoId");
  }

  const snapshot = await firestore
    .collection(videoCollectionId)
    .doc(videoId)
    .get();

  const video = snapshot.data();

  return (video as Video) ?? {};
};
