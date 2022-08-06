import { v4 as uuid } from "uuid";
export class User {
  id: string;
  firstName = "";
  lastName = "";
  email = "";
  age = 0;

  constructor() {
    // TODO - use uuid or nanoId instead
    this.id = uuid();
  }
}
