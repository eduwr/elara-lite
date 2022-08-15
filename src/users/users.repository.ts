import { DBClientInterface } from "../database/connection";
import { BadRequestException, InternalServerErrorException, NotFoundException } from "../errorHandler";
import { CreateUserDTO } from "./dto/create.user.dto";
import { UsersRepositoryInterface } from "./interfaces/users.repository.interface";
import { User } from "./users.model";

export class UserRepository implements UsersRepositoryInterface {
  constructor(private readonly db: DBClientInterface) {}


  async findAll(): Promise<User[]> {
    // TODO paginate query
    try{
      const { rows: users } = await this.db.query<User>(`
      SELECT id, birthdate, email, first_name as "firstName", last_name as "lastName", created_at as "createdAt", updated_at as "updatedAt" FROM users
    `);
      return users;
    }catch (e) {
      console.log(e);
      throw new NotFoundException();
    }

  }

  async findOneById({ id }: { id: string }): Promise<User> {
    try {
      const { rows, rowCount } = await this.db.query<User>(`
      SELECT id, birthdate, email, first_name as "firstName", last_name as "lastName", created_at as "createdAt", updated_at as "updatedAt" FROM users WHERE id = '${id}' LIMIT 1;
    `);

      if(!rowCount) {
        throw new NotFoundException();
      }

      return rows[0];
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException();
    }
  }

  async create(data: CreateUserDTO): Promise<User> {
    const { birthDate, email, firstName, lastName } = data;

    if (!birthDate || !email || !firstName || !lastName) {
      throw new BadRequestException();
    }

    const user = new User();

    user.birthDate = birthDate.toISOString();
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

  async updateOne(id: string, data: Partial<CreateUserDTO>): Promise<User> {
    try {
      const user = await this.findOneById({id});
      if(!user) {
        throw new NotFoundException();
      }


      const { birthDate, email, firstName, lastName } = data;
      user.birthDate = birthDate?.toISOString() || user.birthDate;
      user.email = email || user.email;
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;

      const { rows } = await this.db.query<User>(`
       UPDATE users SET (first_name, last_name, email, birth_date) = ('${user.firstName}', '${user.lastName}', '${user.email}', '${user.birthDate}')
       WHERE id = '${user.id}'
       RETURNING first_name, last_name, email, birthdate, updated_at, created_at;
      `);

      return rows[0];
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException();
    }
  }

  async deleteById({ id }: { id: string }): Promise<number> {
    try {
      const { rowCount } =  await this.db.query(`
      DELETE FROM users WHERE id = '${id}';
    `);

      if(!rowCount) {
        throw new NotFoundException();
      }

      return rowCount;
    } catch (e) {
      throw new NotFoundException();
    }
  }


  private static createUserQuery(user: User): string {
    return `
      INSERT INTO users (id, first_name, last_name, email, birth_date)
      VALUES(
        '${user.id}',
        '${user.firstName}',
        '${user.lastName}',
        '${user.email}',
        '${user.birthDate}'
      )
      RETURNING id, first_name as firstName, last_name as lastName, email, birth_date as birthDate, updated_at as updatedAt, created_at as createdAt;
    `;
  }

}
