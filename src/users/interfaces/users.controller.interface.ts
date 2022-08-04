import { User } from "users/users.model";

export interface UserControllerI {
  index(): User[];
  show(): User;
  create(): User;
  update(): User;
  delete(): void;
}
