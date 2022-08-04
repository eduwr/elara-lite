import { User } from "users/users.model";

export interface UsersServiceI {
  findUsers(): User[];
  getUserById(id: string): User;
  createUser(): User;
  updateUser(): User;
  deleteUser(): void;
}
