import { Role, RoleTypeEnum } from "../src/roles/roles.model";
import {v4 as uuid} from "uuid";
import { client } from "./index";




const seed = async () => {
  const types = Object.values(RoleTypeEnum);

  const roles = types.map(type => {
    const role = new Role();
    role.id = uuid();
    role.type = type;
    return `('${role.id}', '${role.type}')`;
  });

  try {
    const query = `
     INSERT INTO
        roles (id, type)
      VALUES
        ${roles.join(", ")};
    `;
    await client.query(query);
  } catch (e) {
    console.log(e);
  }
};

export default seed;