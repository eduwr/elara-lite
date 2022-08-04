export class User {
  id: string;
  firstName = "";
  lastName = "";
  email = "";
  age = 0;
  roleId = "";

  constructor() {
    // TODO - use uuid or nanoId instead
    this.id = Math.random().toString();
  }
}
