import { faker } from "@faker-js/faker";
import { User } from "../src/users/users.model";
import { v4 as uuid } from "uuid";
import { client } from "./index";
import { Role } from "../src/roles/roles.model";


const seed = async () => {

  const {rows: roles} = await client.query<Role>(`
    SELECT * FROM roles;
  `);

  const usersToAdd = roles.map(role => {
    const user = new User();
    user.id = uuid();
    user.firstName = faker.name.firstName();
    user.lastName =  faker.name.lastName();
    user.email = faker.internet.email(user.firstName, user.lastName);
    user.birthDate = faker.date.between(new Date(1980, 1, 1 ), new Date()).toISOString();
    user.roleId = role.id;

    return  `('${user.id}', '${user.firstName}', '${user.lastName}', '${user.email}', '${user.birthDate}', '${user.roleId}')`;
  });

  try {
    const query = `
     INSERT INTO
        users (id, first_name, last_name, email, birth_date, role_id)
      VALUES
        ${usersToAdd.join(", ")};
    `;
    await client.query(query);
  } catch (e) {
    console.log(e);
  }
};

export default seed;