import { Request, Response } from "express";
import ffmpeg from "fluent-ffmpeg";

export const processVideo = async (req: Request, res: Response) => {
  const { inputFilePath, outputFilePath } = req.body;

  if (!inputFilePath || !outputFilePath) {
    return res.status(400).json({
      message:
        "BAD REQUEST: Please provide a valid inputFilePath and outputFilePath"
    });
  }

  console.log(`Processing video: ${inputFilePath}`);

  ffmpeg(inputFilePath)
    .size("?x360") // resize to 360p
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
