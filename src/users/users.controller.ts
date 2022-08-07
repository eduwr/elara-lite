import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { CreateUserDTO } from "./dto/create.user.dto";

import { UsersControllerInterface } from "./interfaces/users.controller.interface";
import { UsersRepositoryInterface } from "./interfaces/users.repository.interface";
import { UserRepository } from "./users.repository";

export class UsersController implements UsersControllerInterface {
  constructor(private readonly usersRepository: UserRepository) {
    this;
  }

  index(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }
  show(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async create(
    req: Request<
      ParamsDictionary,
      unknown,
      CreateUserDTO,
      ParsedQs,
      Record<string, unknown>
    >,
    res: Response
  ) {
    const usersCreated = await this.usersRepository.create(req.body);

    console.log(usersCreated);
    res.send(usersCreated);
  }
  update(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
