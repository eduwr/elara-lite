import express from "express";

const noop = () => {};
const routes = express.Router();

routes.get("/devs", noop);
routes.post("/devs", noop);

routes.post("/devs/:devId/likes", noop);
routes.post("/devs/:devId/dislikes", noop);

export default routes;
