import { CreateUserDTO } from "../dto/create.user.dto";
import { User } from "../users.model";

export interface UsersRepositoryInterface {
  create(data: CreateUserDTO): Promise<User>;
  findAll(): Promise<User[]>;
  findOneById({id}: {id: string}): Promise<User>;
  deleteById({id}: {id: string}): Promise<number>;
}
