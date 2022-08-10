import { DBClientInterface } from "../database/connection";
import { BadRequestException } from "../errorHandler";
import { CreateUserDTO } from "./dto/create.user.dto";
import { UsersRepositoryInterface } from "./interfaces/users.repository.interface";
import { User } from "./users.model";

export class UserRepository implements UsersRepositoryInterface {
  constructor(private readonly db: DBClientInterface) {}
  async findAll(): Promise<User[]> {
    // TODO paginate query
    const { rows: users } = await this.db.query<User>(`
      SELECT id, age, email, first_name as "firstName", last_name as "lastName", created_at as "createdAt", updated_at as "updatedAt" FROM users
    `);
    return users;
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


    try {
      const { rows } = await this.db.query<User>(UserRepository.createUserQuery(user));
      return rows[0];
    } catch (err) {
      throw new BadRequestException();
    }
  }

  private static createUserQuery(user: User): string {
    return `
      INSERT INTO users (id, first_name, last_name, email, age)
      VALUES(
        '${user.id}',
        '${user.firstName}',
        '${user.lastName}',
        '${user.email}',
        '${user.age}'
      )
      RETURNING id first_name, last_name, email, age updated_at, created_at;
    `;
  }
}
