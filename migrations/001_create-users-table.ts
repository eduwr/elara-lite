import { client } from "./index";

const up = async () => {
  const createUserTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    first_name VARCHAR ( 255 ) NOT NULL,
    last_name VARCHAR ( 255 ) NOT NULL,
    email VARCHAR ( 255 ) UNIQUE NOT NULL,
    birth_date DATE NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
 );
  `;

  await client.query(createUserTableQuery);
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
