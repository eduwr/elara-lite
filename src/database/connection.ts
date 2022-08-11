import pg, { QueryResult } from "pg";

export const client = new pg.Client({
  connectionString: "postgres://postgres:example@localhost:5432/db",
});

client.connect();

export interface DBClientInterface {
  connect(): Promise<void>;
  query<T = unknown>(query: string): Promise<QueryResult<T>>;
  end(): Promise<void>;
}
