import { Request, Response } from "express";
import ffmpeg from "fluent-ffmpeg";
import { VideoResolution } from "../utils/constants";

export const processVideo = async (req: Request, res: Response) => {
  const { inputFilePath, outputFilePath } = req.body;
  const videoResolution = VideoResolution.SD_720P; // TODO: make this configurable

  if (!inputFilePath || !outputFilePath) {
    return res.status(400).json({
      message:
        "BAD REQUEST: Please provide a valid inputFilePath and outputFilePath"
    });
  }

  console.log(`Processing video (${videoResolution}): ${inputFilePath}`);

  ffmpeg(inputFilePath)
    .size(videoResolution)
    .on("end", () => {
      console.log(`Video processed successfully: ${outputFilePath}`);

      return res.status(200).json({
        message: "Video processed successfully"
      });
    })
    .on("error", err => {
      console.log(`ERROR: ${err.message}`);

      return res.status(500).json({
        message: `INTERNAL SERVER ERROR: ${err.message}`
      });
    })
    .save(outputFilePath);
};
