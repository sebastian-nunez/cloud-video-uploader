import { Storage } from "@google-cloud/storage";
import {
  DEFAULT_VIDEO_RESOLUTION,
  localProcessedVideoPath,
  localRawVideoPath,
  processedVideoBucketName,
  rawVideoBucketName
} from "../utils/constants";
import { deleteFile, ensureDirectoryExistence } from "../utils/filesystem";
import { convertVideoWithFFmpeg } from "../utils/helpers";
import { FfmpegVideoResolution } from "../utils/types";

const storage = new Storage();

/**
 * @description Creates the local directories for raw and processed videos.
 */
export const setUpDirectories = () => {
  ensureDirectoryExistence(localRawVideoPath);
  ensureDirectoryExistence(localProcessedVideoPath);
};

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

    return Promise.reject(
      new Error("Please provide a valid rawVideoName and processedVideoName")
    );
  }

  const inputFilePath = `${localRawVideoPath}/${rawVideoName}`;
  const outputFilePath = `${localProcessedVideoPath}/${processedVideoName}`;
  const videoResolution: FfmpegVideoResolution = DEFAULT_VIDEO_RESOLUTION; // TODO: make this configurable

  return convertVideoWithFFmpeg(inputFilePath, outputFilePath, videoResolution);
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
    `gs://${rawVideoBucketName}/${fileName} downloaded to ${localRawVideoPath}/${fileName}`
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
    `${localProcessedVideoPath}/${fileName} uploaded to gs://${processedVideoBucketName}/${fileName}`
  );
};

/**
 * @param fileName - The name of the file to delete from the
 * {@link localRawVideoPath} folder.
 * @returns A promise that resolves when the file has been deleted.
 *
 */
export const deleteRawVideo = (fileName: string): Promise<void> => {
  return deleteFile(`${localRawVideoPath}/${fileName}`);
};

/**
 * @param fileName - The name of the file to delete from the
 * {@link localProcessedVideoPath} folder.
 * @returns A promise that resolves when the file has been deleted.
 *
 */
export const deleteProcessedVideo = (fileName: string) => {
  return deleteFile(`${localProcessedVideoPath}/${fileName}`);
};
