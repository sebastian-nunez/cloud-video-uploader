import { Button } from "@nextui-org/button";
import { Camera } from "lucide-react";
import { Toaster } from "react-hot-toast";

const Home = () => {
  return (
    <div>
      <Button startContent={<Camera size={20} />}>Snap a Photo</Button>
      <Toaster position="top-right" />
    </div>
  );
};

export default Home;
