import { Request, Response } from "express";
import {
  convertVideo,
  deleteProcessedVideo,
  deleteRawVideo,
  downloadRawVideo,
  uploadProcessedVideo
} from "./video-storage";

/**
 * Process a video file via Google Cloud Pub/Sub. This endpoint is triggered by a Google Cloud Pub/Sub message.
 *
 * Docs: https://cloud.google.com/run/docs/tutorials/pubsub#run_pubsub_server-nodejs
 */
export const processVideo = async (req: Request, res: Response) => {
  // get the bucket and filename from Google Cloud Pub/Sub message
  const pubSubMessage = req.body?.message;

  // validate the message
  if (!pubSubMessage || !pubSubMessage?.data) {
    return res
      .status(400)
      .json({ message: `Bad Request: missing Pub/Sub message or data` });
  }

  let data;

  try {
    const message = Buffer.from(pubSubMessage?.data, "base64").toString("utf8");
    data = JSON.parse(message);

    if (!data?.name) {
      throw new Error("Bad Request: Invalid message payload received");
    }
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: `Bad Request: missing filename` });
  }

  // get the filename from the message
  const inputFileName = data.name;
  const outputFileName = `processed-${inputFileName}`;

  // download video
  await downloadRawVideo(inputFileName);

  // convert video
  try {
    await convertVideo(inputFileName, outputFileName);
  } catch (err) {
    console.log(`Error converting video at ${inputFileName}: ${err}`);

    // cleanup
    await Promise.all([
      deleteRawVideo(inputFileName),
      deleteProcessedVideo(outputFileName)
    ]);

    return res
      .status(500)
      .json({ message: `Internal Server Error: video processing failed` });
  }

  // upload video
  await uploadProcessedVideo(outputFileName);

  // cleanup
  await Promise.all([
    deleteRawVideo(inputFileName),
    deleteProcessedVideo(outputFileName)
  ]);

  return res.status(200).json({ message: `Video processed successfully` });
};
