export class Lesson {
  id: string;
  name = "";
  teacherId = "";
  studentsIds: string[] = [];
  seats = 0;

  constructor() {
    // TODO - use uuid or nanoId instead
    this.id = Math.random().toString();
  }
}
