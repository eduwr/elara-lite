import express from "express";

const noop = () => {};
const routes = express.Router();

routes.get("/", noop);
routes.post("/", noop);

export default routes;
