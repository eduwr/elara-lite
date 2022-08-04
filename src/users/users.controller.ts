import { UserControllerI } from "./interfaces/users.controller.interface";
import { User } from "./users.model";

export class UserController implements UserControllerI {
  index(): User[] {
    throw new Error("Method not implemented.");
  }
  show(): User {
    throw new Error("Method not implemented.");
  }
  create(): User {
    throw new Error("Method not implemented.");
  }
  update(): User {
    throw new Error("Method not implemented.");
  }
  delete(): void {
    throw new Error("Method not implemented.");
  }
}
