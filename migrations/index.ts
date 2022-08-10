import migration001 from "./001_create-users-table";
import migration002 from "./002_auto-update-timestamps";
import pg from "pg";

export const client = new pg.Client({
  connectionString: "postgres://postgres:example@localhost:5432/db",
});

const migrations = [migration001, migration002];

const runMigrations = async () => {
  await client.connect();
  const [_, __, action] = process.argv;

  if (action !== "up" && action !== "down") {
    throw new Error("UNKOWN ACTION!");
  }

  if (action === "down") {
    migrations.reverse();
  }

  const promises = migrations.map(migrations => migrations[action]());

  await Promise.all(promises);

  await client.end();

  return `Migrate ${action}! ${migrations.length} migrations...`;
};


runMigrations().then((res) => {
  console.log(res);
}).catch(err => {
  console.log(err);
});