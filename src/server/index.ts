import { Express } from "express";

interface ServerInterface {
  run(port?: number | string): void;
}

export class Server implements ServerInterface {
  constructor(private readonly app: Express) {}

  run(port: number | string = 8000): void {
    this.app.listen(port, () => {
      console.log(`[server]: running on http://localhost:${port}`);
    });
  }
}
