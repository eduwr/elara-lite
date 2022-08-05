import pg from "pg";

export const client = new pg.Client({
  connectionString: "postgres://postgres:example@localhost:5432/postgres",
});
