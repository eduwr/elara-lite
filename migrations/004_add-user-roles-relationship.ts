import { client } from "./index";

const up = async () => {

  await client.query(`
    ALTER TABLE users
    ADD COLUMN role_id TEXT REFERENCES roles (id);
  `);

};

const down = async () => {

  await client.query(`
    ALTER TABLE users
    DROP COLUMN role_id;
  `);
};

export default {
  up,
  down,
};
