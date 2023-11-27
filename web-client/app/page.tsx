import VideoCard from "@/components/video-card";
import { getVideos } from "@/firebase/functions";
import { Toaster } from "react-hot-toast";

const Home = async () => {
  const videos = await getVideos();

  return (
    <>
      <main>
        {/* ---------------- Video Grid -------------- */}
        <section className="grid grid-cols-4 gap-4">
          {videos
            .filter(video => video.status === "processed")
            .map(video => (
              <VideoCard video={video} key={video.id} />
            ))}
        </section>
      </main>

      <Toaster position="bottom-right" />
    </>
  );
};

export default Home;
export const revalidate = 0; // disable next.js cache
