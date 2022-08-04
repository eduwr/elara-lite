import { Request, Response, Express } from "express";
import dotenv from "dotenv";

dotenv.config();

interface Engine extends Express {}

interface ServerInterface {
  create(): void;
}

export class Server implements ServerInterface {
  constructor(private readonly engine: Engine) {}
  create(): void {
    const port = process.env.PORT;

    this.engine.get("/", (req: Request, res: Response) => {
      res.send("Express + TS");
    });

    this.engine.listen(port, () => {
      console.log(`[server]: running on http://localhost:${port}`);
    });
  }

  middlewares(): void {
    this.engine.use();
  }
}
