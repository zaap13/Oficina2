import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config;

const app = express();
app
  .use(json)
  .use(cors())
  .get("/health", (_req, res) => res.send("OK!"));

const port = process.env.PORT 
app.listen(4000, () => console.log("server running in port 4000"));
