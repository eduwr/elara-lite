export class Grade {
  id: string;
  studentId = "";
  lessonId = "";
  scores: number[] = [];

  constructor() {
    // TODO - use uuid or nanoId instead
    this.id = Math.random().toString();
  }
}
