import { User } from "./users";

export interface Lesson {
  id: string;
  name: string;
  teacher: User;
}
