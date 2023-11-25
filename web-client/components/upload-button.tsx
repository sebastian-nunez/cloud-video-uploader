import { Tooltip } from "@nextui-org/react";
import { Video } from "lucide-react";
import { ChangeEvent } from "react";
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
      const res = await uploadVideo(file);

      if (res.ok) {
        alert(`Video uploaded successfully!`);
      }
    } catch (err) {
      alert(`Failed to upload video: ${err}`);
    }
  };

  return (
    <>
      <Tooltip content="Upload Video">
        <label
          htmlFor="upload"
          className="hover:cursor-pointer flex items-center justify-center hover:bg-gray-200 rounded-lg p-2 transition ease-in-out duration-200"
        >
          <Video height={30} width={30} />
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
