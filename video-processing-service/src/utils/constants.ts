import { FfmpegVideoResolution } from "./types";
// Firestore
export const videoCollectionId = "videos";
export const usersCollectionId = "users";

// Cloud Storage
export const rawVideoBucketName = "cloud-video-uploader-raw-videos";
export const processedVideoBucketName = "cloud-video-uploader-processed-videos";

export const localRawVideoPath = "./raw-videos";
export const localProcessedVideoPath = "./processed-videos";

// FFmpeg
export const DEFAULT_VIDEO_RESOLUTION: FfmpegVideoResolution = "?x720";
