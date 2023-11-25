import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions();

const generateUploadUrlRawVideo = httpsCallable(
  functions,
  "generateSignedUploadUrlForRawVideos"
);

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
