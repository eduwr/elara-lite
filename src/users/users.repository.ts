import { DBClientInterface } from "database/connection";
import { CreateUserDto } from "./dto/create.user.dto";
import { UsersRepositoryInterface } from "./interfaces/users.repository.interface";
import { User } from "./users.model";

export class UserRepository implements UsersRepositoryInterface {
  constructor(private readonly db: DBClientInterface) {}

  async create(data: CreateUserDto): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
