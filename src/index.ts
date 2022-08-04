import express, { Request, Response } from "express";
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TS");
});

app.listen(port, () => {
  console.log(`⚡️[server]: running on port ${port}`);
});
