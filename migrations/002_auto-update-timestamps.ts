import { client } from "./index";
import {createTrigger, dropTrigger} from "./common/triggers";
const up = async () => {
  const createUpdateFunction = `
    CREATE OR REPLACE FUNCTION update_updated_at_column() 
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = now();
        RETURN NEW; 
    END;
    $$ language 'plpgsql';
  `;

  const createCreatedFunction = `
    CREATE OR REPLACE FUNCTION update_created_at_column() 
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.created_at = now();
        RETURN NEW; 
    END;
    $$ language 'plpgsql';
  `;


  await client.query(`
    ${createCreatedFunction}
    ${createUpdateFunction}
    ${createTrigger("users")}
    ${createTrigger("users", "update_created_at_column", "BEFORE INSERT")}
  `);

};

const down = async () => {
  const dropUpdateFunction = `
        DROP FUNCTION IF EXISTS update_updated_at_column();
  `;
  const dropCreateFunction = `
        DROP FUNCTION IF EXISTS update_created_at_column();
  `;

  const query = `
    ${dropTrigger("users")}
    ${dropTrigger("users", "update_created_at_column")}
    ${dropUpdateFunction}
    ${dropCreateFunction}
  `;

  await client.query(query);
};

export default {
  up,
  down,
};
