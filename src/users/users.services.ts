import { User } from "users/users.model";
import { UsersServiceI } from "./interfaces/users.service.interface";

export class UserService implements UsersServiceI {
  findUsers(): User[] {
    throw new Error("Method not implemented.");
  }
  getUserById(id: string): User {
    throw new Error("Method not implemented.");
  }
  createUser(): User {
    throw new Error("Method not implemented.");
  }
  updateUser(): User {
    throw new Error("Method not implemented.");
  }
  deleteUser(): void {
    throw new Error("Method not implemented.");
  }
}
