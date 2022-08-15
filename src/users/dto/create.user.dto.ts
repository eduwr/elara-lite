import { RoleTypeEnum } from "../../roles/roles.model";

export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  roleType?: RoleTypeEnum;
}
