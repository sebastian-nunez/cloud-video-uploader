import { Storage } from "@google-cloud/storage";
import ffmpeg from "fluent-ffmpeg";
import { VideoResolution } from "../utils/constants";

const storage = new Storage();

const rawVideoBucketName = "cloud-video-uploader-raw-videos";
const processedVideoBucketName = "cloud-video-uploader-processed-videos";

const localRawVideoPath = "./raw-videos";
const localProcessedVideoPath = "./processed-videos";

/**
 * @description Creates the local directories for raw and processed videos.
 */
export const setUpDirectories = () => {};

/**
 * @param rawVideoName - The name of the file to convert from {@link localRawVideoPath}.
 * @param processedVideoName - The name of the file to convert to {@link localProcessedVideoPath}.
 * @returns A promise that resolves when the video has been converted.
 */
export const convertVideo = (
  rawVideoName: string,
  processedVideoName: string
): Promise<void> => {
  if (!rawVideoName || !processedVideoName) {
    console.error("Please provide a valid rawVideoName and processedVideoName");
    return Promise.reject();
  }

  const inputFilePath = `${localRawVideoPath}/${rawVideoName}`;
  const outputFilePath = `${localProcessedVideoPath}/${processedVideoName}`;
  const videoResolution = VideoResolution.SD_720P; // TODO: make this configurable

  return new Promise<void>((resolve, reject) => {
    console.log(`Converting video (${videoResolution}): ${inputFilePath}`);

    ffmpeg(inputFilePath)
      .size(videoResolution)
      .on("end", () => {
        console.log(`Video converted successfully: ${outputFilePath}`);
        resolve();
      })
      .on("error", err => {
        console.log(`ERROR: ${err.message}`);
        reject(err);
      })
      .save(outputFilePath);
  });
};

/**
 * @param fileName - The name of the file to download from the
 * {@link rawVideoBucketName} bucket into the {@link localRawVideoPath} folder.
 * @returns A promise that resolves when the file has been downloaded.
 */
export const downloadRawVideo = async (fileName: string) => {
  await storage
    .bucket(rawVideoBucketName)
    .file(fileName)
    .download({ destination: `${localRawVideoPath}/${fileName}` });

  console.log(
    `gs//${rawVideoBucketName}/${fileName} downloaded to ${localRawVideoPath}/${fileName}`
  );
};

/**
 * @param fileName - The name of the file to upload from the
 * {@link localProcessedVideoPath} folder into the {@link processedVideoBucketName}.
 * @returns A promise that resolves when the file has been uploaded.
 */
export const uploadProcessedVideo = async (fileName: string) => {
  const bucket = storage.bucket(processedVideoBucketName);

  // upload file
  await bucket.upload(`${localProcessedVideoPath}/${fileName}`, {
    destination: fileName
  });

  // make file public
  await bucket.file(fileName).makePublic();

  console.log(
    `${localProcessedVideoPath}/${fileName} uploaded to gs//${processedVideoBucketName}/${fileName}`
  );
};

/**
 * @param fileName - The name of the file to delete from the
 * {@link localRawVideoPath} folder.
 * @returns A promise that resolves when the file has been deleted.
 *
 */
export const deleteRawVideo = (fileName: string) => {};

/**
 * @param fileName - The name of the file to delete from the
 * {@link localProcessedVideoPath} folder.
 * @returns A promise that resolves when the file has been deleted.
 *
 */
export const deleteProcessedVideo = (fileName: string) => {};

/**
 * @param filePath - The path of the file to delete.
 * @returns A promise that resolves when the file has been deleted.
 */
const deleteFile = (filePath: string): Promise<void> => {
  // Your code here
  return Promise.resolve();
};

/**
 * Ensures a directory exists, creating it if necessary.
 * @param {string} dirPath - The directory path to check.
 */
const ensureDirectoryExistence = (dirPath: string) => {};
