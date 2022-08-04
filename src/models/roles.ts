enum RoleTypeEnum {
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
  ADMIN = "ADMIN",
  PARENT = "PARENT",
}

export interface Role {
  id: string;
  type: RoleTypeEnum;
}
