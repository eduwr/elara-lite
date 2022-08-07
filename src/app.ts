import express from "express";
import dotenv from "dotenv";
import { allRoutes } from "./routes";

dotenv.config();

const app = express();

app.use(express.json());

allRoutes.forEach((route) => {
  app.use(route);
});

export default app;
