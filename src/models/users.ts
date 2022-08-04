import { Role } from "./roles";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  role: Role;
}
