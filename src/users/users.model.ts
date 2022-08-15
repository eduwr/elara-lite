import { v4 as uuid } from "uuid";
export class User {
  id: string;
  firstName = "";
  lastName = "";
  email = "";
  birthDate?: string;
  roleId = "";

  constructor() {
    // TODO - use uuid or nanoId instead
    this.id = uuid();
  }
}
