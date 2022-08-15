import { v4 as uuid } from "uuid";

export enum RoleTypeEnum {
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
  ADMIN = "ADMIN",
  PARENT = "PARENT",
  EXTERNAL = "EXTERNAL",
}

export class Role {
  id: string;
  type: RoleTypeEnum = RoleTypeEnum.EXTERNAL;

  constructor() {
    // TODO - use uuid or nanoId instead
    this.id = uuid();
  }
}
