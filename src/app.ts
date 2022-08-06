import express from "express";
import dotenv from "dotenv";
import Routes from "routes";
dotenv.config();

const app = express();

app.use(express.json());
app.use(Routes);

export default app;
