import dotenv from "dotenv";
import express from "express";
import processVideoRouter from "./routes/process-video";
dotenv.config();

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/process-video", processVideoRouter);

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Video processing service listening at http://localhost:${PORT}`);
});
