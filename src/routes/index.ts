import express from "express";
import usersRoutes from "./users.routes";

const mainRoutes = express.Router();

mainRoutes.get("/", (req, res) => {
  res.send({
    hello: "GET",
  });
});
mainRoutes.post("/", (req, res) => {
  res.send({
    hello: "POST",
  });
});

export default mainRoutes;

export const allRoutes = [mainRoutes, usersRoutes];
