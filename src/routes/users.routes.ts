import { client as dbClient } from "../database/connection";
import express from "express";
import { UserRepository } from "../users/users.repository";
import { UsersController } from "../users/users.controller";

const usersRoutes = express.Router();

// TODO - use IoC instead of instantiating it directly
// https://ismayilkhayredinov.medium.com/building-a-scoped-ioc-container-for-node-express-8bf082d9887
const usersRepository = new UserRepository(dbClient);

const usersController = new UsersController(usersRepository);

usersRoutes.get("/users", (req, res) => usersController.index(req, res));
usersRoutes.get("/users/:id", (req, res) => usersController.show(req, res));
usersRoutes.post("/users", (req, res) => usersController.create(req, res));
usersRoutes.patch("/users/:id", (req, res) => usersController.update(req, res));
usersRoutes.delete("/users/:id", (req, res) => usersController.delete(req, res));

export default usersRoutes;
