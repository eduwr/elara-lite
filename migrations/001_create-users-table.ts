import { client } from "../src/database/connection";

const up = async () => {
  const createUserTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    first_name VARCHAR ( 255 ) NOT NULL,
    last_name VARCHAR ( 255 ) NOT NULL,
    email VARCHAR ( 255 ) UNIQUE NOT NULL,
    age INT NOT NULL CHECK (age >= 0),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
 );
  `;

  await client.connect();

  await client.query(createUserTableQuery);
  await client.end();
};

const down = async () => {
  const dropUserTableQuery = `
    DROP TABLE IF EXISTS users
  `;

  await client.query(dropUserTableQuery);
};

export default {
  up,
  down,
};
