import express from "express";
import dotenv from "dotenv";
import Routes from "./routes";
dotenv.config();

const app = express();

app.use(Routes);
app.get("/test", (req, res) => {
  res.send({
    hello: "Test",
  });
});

export default app;
