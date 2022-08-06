import { User } from "users/users.model";

export interface UserControllerInterface {
  index(): User[];
  show(): User;
  create(): User;
  update(): User;
  delete(): void;
}
