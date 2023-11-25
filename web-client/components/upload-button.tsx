import { Tooltip } from "@nextui-org/react";
import { Video } from "lucide-react";
import { ChangeEvent } from "react";
import toast from "react-hot-toast";
import { uploadVideo } from "../firebase/functions";

const UploadButton = () => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.item(0);

    if (file) {
      handleUploadFile(file);
    }
  };

  const handleUploadFile = async (file: File) => {
    if (!file) {
      console.error("No file provided");
      return;
    }

    try {
      const promise = new Promise(async (resolve, reject) => {
        const res = await uploadVideo(file);

        if (res.ok) {
          resolve(res);
        } else {
          reject(res);
        }
      });

      await toast.promise(promise, {
        loading: "Uploading video...",
        success: "Video uploaded successfully!",
        error: err => `Failed to upload video: ${err.toString()}`
      });
    } catch (err) {
      toast.error(`Failed to upload video: ${err}`);
    }
  };

  return (
    <>
      <Tooltip content="Upload Video">
        <label
          htmlFor="upload"
          className="hover:cursor-pointer flex items-center justify-center hover:bg-gray-200 rounded-lg p-2 transition ease-in-out duration-200"
        >
          <Video height={25} width={25} />
        </label>
      </Tooltip>

      <input
        type="file"
        accept="video/*"
        name="upload-video"
        className="hidden"
        id="upload"
        onChange={handleChange}
      />
    </>
  );
};

export default UploadButton;
