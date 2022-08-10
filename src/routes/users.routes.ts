import { client as dbClient } from "../database/connection";
import express from "express";
import { UserRepository } from "../users/users.repository";
import { UsersController } from "../users/users.controller";

const usersRoutes = express.Router();

const usersRepository = new UserRepository(dbClient);

// console.log(usersRepository);
const usersController = new UsersController(usersRepository);
// console.log(usersController);

usersRoutes.get("/users", (req, res) => usersController.index(req, res));
usersRoutes.get("/users/:id", (req, res) => usersController.show(req, res));
usersRoutes.post("/users", (req, res) => usersController.create(req, res));
usersRoutes.patch("/users", usersController.update);
usersRoutes.delete("/users/:id", (req, res) => usersController.delete(req, res));

export default usersRoutes;
