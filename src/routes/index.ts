import express from "express";

const routes = express.Router();

routes.get("/", (req, res) => {
  res.send({
    hello: "GET",
  });
});
routes.post("/", (req, res) => {
  res.send({
    hello: "POST",
  });
});

export default routes;
