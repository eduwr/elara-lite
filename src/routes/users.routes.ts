import  {Router} from "express";

import { UsersControllerInterface } from "../users/interfaces/users.controller.interface";


// TODO - use IoC instead of instantiating it directly
// https://ismayilkhayredinov.medium.com/building-a-scoped-ioc-container-for-node-express-8bf082d9887

export interface RouterInterface {
  routes: Router
}

export class UserRoutes implements  RouterInterface {
  constructor(private userController: UsersControllerInterface, private router: Router) {
    this.router.get("/users", (req, res) => this.userController.index(req, res));
    this.router.get("/users/:id", (req, res) => this.userController.show(req, res));
    this.router.post("/users", (req, res) => this.userController.create(req, res));
    this.router.patch("/users/:id", (req, res) => this.userController.update(req, res));
    this.router.delete("/users/:id", (req, res) => this.userController.delete(req, res));
  }

  get routes() {
    return this.router;
  }
}