import { CreateUserDto } from "users/dto/create.user.dto";
import { User } from "users/users.model";

export interface UsersRepositoryInterface {
  create(data: CreateUserDto): Promise<User>;
}
