import { Request, Response } from "express";

import { UsersControllerInterface } from "./interfaces/users.controller.interface";
import { UsersRepositoryInterface } from "./interfaces/users.repository.interface";
import { BadRequestException, NotFoundException } from "../errorHandler";


export class UsersController implements UsersControllerInterface {
  constructor(private readonly usersRepository: UsersRepositoryInterface) {

  }

  async index(req: Request, res: Response): Promise<void> {
    const users = await this.usersRepository.findAll();
    res.status(200);
    res.send(users);
  }

  async show(req: Request, res: Response): Promise<void> {
    // TODO treat request here
    try {
      const user = await this.usersRepository.findOneById({id: req.params.id});
      res.status(200);
      res.send(user);
    } catch (e) {
      if (e instanceof NotFoundException) {
        res.status(e.statusCode);
      } else {
        res.status(500);
      }
      res.send(e);
      console.log(e);
    }
  }

  async create(
    req: Request,
    res: Response
  ) {
    // TODO - body missing validation
    try {
      const usersCreated = await this.usersRepository.create(req.body);
      res.status(201);
      res.send(usersCreated);
    } catch (e) {
      res.status(400);
      res.send(e);
      console.log(e);
    }
  }
  update(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async delete(req: Request, res: Response): Promise<void> {
    try {
      await this.usersRepository.deleteById({id: req.params.id});
      res.status(204);
      res.send();

    } catch (e) {
      if (e instanceof NotFoundException) {
        res.status(e.statusCode);
      } else {
        res.status(500);
      }
      res.send(e);
      console.log(e);
    }
  }
}
