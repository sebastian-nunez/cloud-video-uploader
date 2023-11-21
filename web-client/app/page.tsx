import NavBar from "@/components/nav-bar";
import { Button } from "@nextui-org/button";
import { Camera } from "lucide-react";

const Home = () => {
  return (
    <div>
      <Button startContent={<Camera size={20} />}>Snap a Photo</Button>
    </div>
  );
};

export default Home;
