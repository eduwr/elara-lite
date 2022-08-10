import { Request, Response } from "express";

import { UsersControllerInterface } from "./interfaces/users.controller.interface";
import { UsersRepositoryInterface } from "./interfaces/users.repository.interface";
import { NotFoundException } from "../errorHandler";


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
    }
  }
  async update(req: Request, res: Response): Promise<void> {
    try {
      const userUpdated = await this.usersRepository.updateOne(req.params.id, req.body);
      res.status(200);
      res.send(userUpdated);

    } catch (e) {
      if (e instanceof NotFoundException) {
        res.status(e.statusCode);
      } else {
        res.status(500);
      }
      res.send(e);
    }
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
    }
  }
}
