import { getVideos } from "@/firebase/functions";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

const Home = async () => {
  const videos = await getVideos();

  return (
    <>
      <main>
        {videos
          .filter(video => video.status === "processed")
          .map(video => (
            <Link href={`/watch?v=${video.filename}`}>
              <Image
                src={"/thumbnail.png"}
                alt="video"
                width={120}
                height={80}
                className=""
              />
            </Link>
          ))}
      </main>

      <Toaster position="bottom-right" />
    </>
  );
};

export default Home;
