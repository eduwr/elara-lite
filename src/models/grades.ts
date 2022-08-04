import { Lesson } from "./lessons";
import { User } from "./users";

export interface Grade {
  id: string;
  student: User;
  lesson: Lesson;
  scores: number[];
}
