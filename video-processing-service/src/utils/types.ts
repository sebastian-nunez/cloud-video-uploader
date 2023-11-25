/**
 * Reference: https://github.com/fluent-ffmpeg/node-fluent-ffmpeg#video-frame-size-options
 */
export type FfmpegVideoResolution = "?x360" | "?480" | "?x720" | "?x1080";

export type Video = {
  id?: string;
  uid?: string;
  filename?: string;
  status?: "processing" | "processed" | "failed";
  title?: string;
  description?: string;
};
