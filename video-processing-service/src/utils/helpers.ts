import ffmpeg from "fluent-ffmpeg";
import { FfmpegVideoResolution } from "./types";

/**
 * Converts a video using ffmpeg.
 *
 * @param inputFilePath - The input file path for the video to convert.
 * @param outputFilePath - The output file path for the converted video.
 * @param videoResolution - The resolution of the converted video.
 * @returns A promise that resolves when the video has been converted.
 */
export const convertVideoWithFFmpeg = (
  inputFilePath: string,
  outputFilePath: string,
  videoResolution: FfmpegVideoResolution
): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    if (!inputFilePath || !outputFilePath || !videoResolution) {
      console.log(
        "Please provide a valid inputFilePath, outputFilePath and videoResolution"
      );

      return reject(
        new Error(
          "Please provide a valid inputFilePath, outputFilePath and videoResolution"
        )
      );
    }

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
