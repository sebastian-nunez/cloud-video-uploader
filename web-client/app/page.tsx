import { Button } from "@nextui-org/button";
import { Camera } from "lucide-react";

const Home = () => {
  return (
    <main>
      <div>
        <Button startContent={<Camera size={20} />}>Snap a Photo</Button>
      </div>
    </main>
  );
};

export default Home;
