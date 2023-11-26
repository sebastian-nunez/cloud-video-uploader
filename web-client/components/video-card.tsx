import { Video } from "@/utils/types";
import { Avatar } from "@nextui-org/react";
import { UserIcon } from "lucide-react";
import Link from "next/link";

type TVideoCardProps = {
  video: Video;
};

const VideoCard = ({ video }: TVideoCardProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="h-52">
        <Link href={`/watch?v=${video.filename}`}>
          <img
            src={"/thumbnail.png"}
            alt="video"
            className="rounded-lg object-cover h-full w-full"
          />
        </Link>
      </div>

      <div className="flex gap-3">
        <Avatar
          isBordered
          as="button"
          className="h-8 w-8 ml-1"
          fallback={<UserIcon />}
          showFallback
          src={undefined} // TODO: add user avatar
        />

        <div>
          <h1 className="text-lg font-semibold">{video.title ?? "No Title"}</h1>
          <p className="text-sm text-default-500 mt-1.5">
            {video.uid ?? "Unknown"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
