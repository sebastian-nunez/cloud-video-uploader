import dotenv from "dotenv";
import express from "express";
dotenv.config();

const app = express();

const port = process.env.SERVER_PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
