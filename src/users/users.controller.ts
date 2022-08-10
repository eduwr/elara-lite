import { Request, Response } from "express";

import { UsersControllerInterface } from "./interfaces/users.controller.interface";
import { UsersRepositoryInterface } from "./interfaces/users.repository.interface";


export class UsersController implements UsersControllerInterface {
  constructor(private readonly usersRepository: UsersRepositoryInterface) {

  }

  async index(req: Request, res: Response): Promise<void> {
    const users = await this.usersRepository.findAll();
    console.log(users);
    res.status(200);
    res.send(users);
  }

  show(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async create(
    req: Request,
    res: Response
  ) {
    const usersCreated = await this.usersRepository.create(req.body);

    res.status(201);
    res.send(usersCreated);
  }
  update(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
