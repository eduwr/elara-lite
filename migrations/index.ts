import migration001 from "./001_create-users-table";

const [_, __, action] = process.argv;

if (!(action === "up" || action === "down")) {
}

switch (action) {
  case "up":
    migration001.up();
    break;
  case "down":
    migration001.down();
    break;
  default:
    throw new Error("UNKOWN ACTION!");
}
