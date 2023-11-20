import dotenv from "dotenv";
import express from "express";
import { setUpDirectories } from "./controllers/video-storage";
import processVideoRouter from "./routes/process-video";
dotenv.config();

// set up directories for local storage
setUpDirectories();

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/process-video", processVideoRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Video processing service listening at http://localhost:${PORT}`);
});
