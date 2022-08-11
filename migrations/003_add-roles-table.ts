import { client } from "./index";

const up = async () => {

  await client.query(`
    CREATE TYPE role AS ENUM ('ADMIN', 'TEACHER', 'STUDENT',  'PARENT', 'EXTERNAL');
    CREATE TABLE IF NOT EXISTS roles (
        id TEXT PRIMARY KEY,
        type role
    );
  `);

};

const down = async () => {

  await client.query(`
      DROP TABLE IF EXISTS roles;
      DROP TYPE IF EXISTS role;
  `);
};

export default {
  up,
  down,
};
