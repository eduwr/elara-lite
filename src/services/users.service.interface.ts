import { User } from "models/users";

export interface UsersServiceI {
  findAll(): User[];
  getUserById(id: string): User;
  createUser(): User;
  updateUser(): User;
  deleteUser(): void;
}
