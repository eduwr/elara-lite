import express from "express";

const noop = () => {
  //
};
const routes = express.Router();

routes.get("/", () => {
  console.log("hellor GET");
});
routes.post("/", () => {
  console.log("hellor POST");
});

export default routes;
