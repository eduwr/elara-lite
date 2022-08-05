import { up, down } from "./001_create-users-table";

const migrateUp = () => {
  up();
};

const migrateDown = () => {
  down();
};

migrateDown();
