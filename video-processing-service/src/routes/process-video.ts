import express from "express";
import { processVideo } from "../controllers/process-video";

const router = express.Router();

router.post("/", processVideo);

export default router;
