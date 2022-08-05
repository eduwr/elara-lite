import { client } from "../database/connection";
import express, { Express, Router } from "express";

type EngineFactory = typeof express;

interface Engine extends EngineFactory {}

interface EngineInstance extends Express {}

interface ServerInterface {
  app: EngineInstance;
  run(port?: number | string): void;
}

export class Server implements ServerInterface {
  app;
  constructor(
    private readonly engine: Engine,
    private readonly router?: Router
  ) {
    this.app = engine();
  }

  run(port: number | string = 8000): void {
    this.app.use(this.engine.json());

    if (this.router) {
      this.app.use(this.router);
    }
    const handleConn = async () => {
      await client.connect();
      const res = await client.query("SELECT $1::text as message", [
        "Hello world!",
      ]);
      console.log(res.rows[0].message); // Hello world!
      await client.end();
    };

    handleConn();

    this.app.listen(port, () => {
      console.log(`[server]: running on http://localhost:${port}`);
    });
  }
}
