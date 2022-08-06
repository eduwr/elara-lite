import pg from "pg";

export const client = new pg.Client({
  connectionString: "postgres://postgres:example@localhost:5432/db",
});

client.connect();
client.query;

export interface DBClientInterface {
  connect(): Promise<void>;
  query<T = any>(query: string): Promise<unknown>;
  end(): Promise<void>;
}

export class DBClient implements DBClientInterface {
  constructor(private readonly client: pg.Client) {}

  async connect(): Promise<void> {
    await client.connect();
  }

  async query<T = any>(query: string): Promise<unknown> {
    if (!query) {
      throw new Error("Query not specified.");
    }
    await this.connect();

    const response = await this.client.query(query);

    await this.end();

    return response;
  }
  async end(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
