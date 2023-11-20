import { Request, Response } from "express";
import { DEFAULT_VIDEO_RESOLUTION } from "../utils/constants";
import { convertVideoWithFFmpeg } from "../utils/helpers";

/**
 * @description Processes a video from the {@link inputFilePath} and saves it to the {@link outputFilePath}.
 */
export const processVideo = async (req: Request, res: Response) => {
  const { inputFilePath, outputFilePath } = req.body;

  if (!inputFilePath || !outputFilePath) {
    return res.status(400).json({
      message: "ERROR: Please provide a valid inputFilePath and outputFilePath"
    });
  }

  try {
    await convertVideoWithFFmpeg(
      inputFilePath,
      outputFilePath,
      DEFAULT_VIDEO_RESOLUTION
    );

    return res.status(200).json({
      message: `Video processed successfully: ${outputFilePath}`
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: `ERROR: ${(err as Error).message}`
    });
  }
};
