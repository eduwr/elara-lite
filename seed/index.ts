import pg from "pg";

export const client = new pg.Client({
  connectionString: "postgres://postgres:example@localhost:5432/db",
});

const seeds: (() => void)[] = [];

const seedDB = async () => {


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