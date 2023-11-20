import { Request, Response } from "express";
import { convertVideo } from "./storage";

/**
 * @description Processes a video from the {@link inputFileName} (from the {@link rawVideoBucketName}) and saves it to the {@link outputFileName}. After the video has been processed, it is uploaded to the {@link processedVideoBucketName} bucket.

 * @param req - The request object.
 * @param res - The response object.
 * @returns A response with a status code and a message.
 */
export const processVideo = async (req: Request, res: Response) => {
  const { inputFileName, outputFileName } = req.body;

  if (!inputFileName || !outputFileName) {
    return res.status(400).json({
      message:
        "BAD REQUEST: Please provide a valid inputFileName and outputFileName"
    });
  }

  convertVideo(inputFileName, outputFileName)
    .then(() => {
      return res.status(200).json({
        message: "Video processed successfully"
      });
    })
    .catch(err => {
      return res.status(500).json({
        message: `INTERNAL SERVER ERROR: ${err.message}`
      });
    });
};
