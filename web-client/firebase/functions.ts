import { Video } from "@/utils/types";
import { httpsCallable } from "firebase/functions";
import { functions } from "./firebase";

const generateUploadUrlRawVideo = httpsCallable(
  functions,
  "generateSignedUploadUrlForRawVideos"
);

const getVideosFunction = httpsCallable(functions, "getVideos");

export const uploadVideo = async (file: File) => {
  // generate a signed URL
  const response: any = await generateUploadUrlRawVideo({
    fileExtension: file.name.split(".").pop()
  });

  // upload the file to the signed URL
  const res = await fetch(response?.data?.url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type
    }
  });

  if (res.ok) {
    console.log(`Uploaded file '${file.name}' via a signed URL`);
  }

  return res;
};

export const getVideos = async () => {
  const response = await getVideosFunction();

  return (response?.data as Video[]) ?? [];
};
