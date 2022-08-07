import { DBClientInterface } from "../database/connection";
import { BadRequestException } from "../errorHandler";
import { CreateUserDTO } from "./dto/create.user.dto";
import { UsersRepositoryInterface } from "./interfaces/users.repository.interface";
import { User } from "./users.model";

export class UserRepository implements UsersRepositoryInterface {
  constructor(private readonly db: DBClientInterface) {}

  async create(data: CreateUserDTO): Promise<User> {
    const { age, email, firstName, lastName } = data;

    if (!age || !email || !firstName || !lastName) {
      throw new BadRequestException();
    }

    const user = new User();

    user.age = age;
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;

    const query = this.createUserQuery(user);

    console.log({ query });

    const response = this.db.query(this.createUserQuery(user)) as Promise<User>;

    return response;
  }

  private createUserQuery(user: User): string {
    return `
      INSERT INTO users (id, first_name, last_name, email, age)
      VALUES('${user.id}', '${user.firstName}', '${user.lastName}', '${user.email}', '${user.age}')
      RETURNING id first_name, last_name, email, age;
    `;
  }
}
