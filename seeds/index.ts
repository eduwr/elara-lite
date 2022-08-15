import pg from "pg";
import roles from "./001_roles";
import users from "./002_users";

export const client = new pg.Client({
  connectionString: "postgres://postgres:example@localhost:5432/db",
});

const seeds = [roles, users];

const seedDB = async () => {

  await client.connect();
  const promises = seeds.map(seed => seed());

  await Promise.all(promises);

  await client.end();

  return `${seeds.length} seeds added!`;
};


seedDB().then((res) => {
  console.log(res);
}).catch(err => {
  console.log(err);
});