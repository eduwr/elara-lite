import {Container} from "./container";
import { App } from "../app";
import { UserRoutes } from "../routes/users.routes";
import { UsersController } from "../users/users.controller";
import { UserRepository } from "../users/users.repository";
import { client } from "../database/connection";
import express from "express";


type T = PropertyDescriptor

type Keys = "App" | "UserRoutes" | "UserController" | "UserRepository" |  "dbClient" | "Router"

export const createContainer = () => {
  const c = new Container();

  c.service<"dbClient">("dbClient", () => client);
  c.service("Router", () => express.Router());
  c.service("UserRepository", () => new UserRepository(c.dbClient));
  c.service("UserController", () => new UsersController(c.UserRepository));
  c.service("UserRoutes", () => new UserRoutes(c.UserController, c.Router));
  c.service("App", () => new App([c.UserRoutes]));

  return c;
};

