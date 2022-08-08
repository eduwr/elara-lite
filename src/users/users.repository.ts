import { DBClientInterface } from "../database/connection";
import { BadRequestException } from "../errorHandler";
import { CreateUserDTO } from "./dto/create.user.dto";
import { UsersRepositoryInterface } from "./interfaces/users.repository.interface";
import { User } from "./users.model";

export class UserRepository implements UsersRepositoryInterface {
  constructor(private readonly db: DBClientInterface) {}
  async findAll(): Promise<User[]> {
    // TODO paginate query
    const { rows } = await this.db.query<User>(`
      SELECT id, age, first_name as "firstName", last_name as "lastName", created_at as "createdAt", updated_at as "updatedAt" FROM users
    `);

    console.log(rows);

    return rows;
  }

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

    const { rows } = await this.db.query<User>(this.createUserQuery(user));

    return rows[0];
  }

  private createUserQuery(user: User): string {
    return `
      INSERT INTO users (id, first_name, last_name, email, age, updated_at, created_at)
      VALUES(
        '${user.id}',
        '${user.firstName}',
        '${user.lastName}',
        '${user.email}',
        '${user.age}',
        '${new Date().toISOString()}',
        '${new Date().toISOString()}'
      )
      RETURNING id first_name, last_name, email, age updated_at, created_at;
    `;
  }
}
