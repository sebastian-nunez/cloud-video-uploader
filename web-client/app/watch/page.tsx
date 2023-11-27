"use client";

import { useSearchParams } from "next/navigation";

const Watch = () => {
  const videoPrefix =
    "https://storage.googleapis.com/cloud-video-uploader-processed-videos";
  const videoName = useSearchParams().get("v");

  return (
    <div className="flex flex-col gap-4">
      <div className="w-2/3">
        <video
          controls
          src={`${videoPrefix}/${videoName}`}
          className="w-full h-full"
        />
      </div>

      <div></div>
    </div>
  );
};

export default Watch;
