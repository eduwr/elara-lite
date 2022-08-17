import express from "express";
import dotenv from "dotenv";
import { RouterInterface } from "./routes/users.routes";

dotenv.config();

export interface AppInterface {
  start(): void
}

export class App implements AppInterface{
  constructor(private routes: RouterInterface[]) {
  }

  start() {
    const app = express();

    app.use(express.json());

    this.routes.forEach((route) => {
      app.use(route.routes);


    });

    app.listen(3000, () => {
      console.log("Listening on 3000");
    });
  }
}