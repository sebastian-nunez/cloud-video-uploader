import { credential } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
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
const getVideo = async (videoId: string): Promise<Video> => {
  if (!videoId) {
    throw new Error("Please provide a valid videoId");
  }

  const snapshot = await firestore
    .collection(videoCollectionId)
    .doc(videoId)
    .get();

  const video = snapshot.data();

  console.log(`Retrieved video ${videoId}: ${JSON.stringify(video)}`);
  return (video as Video) ?? {};
};

/**
 * Updates a video in the Firestore Video collection
 * @param videoId - The ID of the video to update
 * @param video - The video object to update
 */
export const setVideo = (videoId: string, video: Video) => {
  if (!videoId) {
    throw new Error("Please provide a valid videoId");
  }

  if (!video) {
    throw new Error("Please provide a valid video");
  }

  console.log(`Updating video ${videoId} with ${JSON.stringify(video)}`);
  return firestore
    .collection(videoCollectionId)
    .doc(videoId)
    .set(video, { merge: true }); // only update the fields that are provided. DO NOT OVERWRITE
};

/**
 * Checks if a video is new by checking the status field in Firestore
 * @param videoId - The ID of the video to check
 * @returns A boolean indicating whether the video is new
 */
export const isVideoNew = async (videoId: string) => {
  if (!videoId) {
    throw new Error("Please provide a valid videoId");
  }

  const video = await getVideo(videoId);

  return video?.status === undefined;
};
