import { DBClientInterface } from "../database/connection";
import { BadRequestException, InternalServerErrorException, NotFoundException } from "../errorHandler";
import { CreateUserDTO } from "./dto/create.user.dto";
import { UsersRepositoryInterface } from "./interfaces/users.repository.interface";
import { User } from "./users.model";
import { Role, RoleTypeEnum } from "../roles/roles.model";

export class UserRepository implements UsersRepositoryInterface {
  constructor(private readonly db: DBClientInterface) {}

  async findAll(): Promise<User[]> {
    // TODO paginate query
    try{
      const { rows: users } = await this.db.query<User>(`
        SELECT 
          u.id,
          birth_date as "birthDate",
          email,
          first_name as "firstName",
          last_name as "lastName",
          created_at as "createdAt",
          updated_at as "updatedAt",
          role_id as "roleId",
          r.type
        FROM users as u
        LEFT JOIN roles as r
        ON u.role_id = r.id;
    `);
      return users;
    }catch (e) {
      console.log(e);
      throw new NotFoundException();
    }

  }

  async findOneById({ id }: { id: string }): Promise<User> {
    console.log({id});
    try {
      const { rows, rowCount } = await this.db.query<User>(`
      SELECT
        u.id,
        birth_date as "birthDate",
        email,
        first_name as "firstName",
        last_name as "lastName",
        role_id as "roleId",
        r.type,
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM users as u
      LEFT JOIN roles as r
      ON r.id = u.role_id
      WHERE u.id = '${id}' LIMIT 1
      ;
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
    const { birthDate, email, firstName, lastName, roleType } = data;

    if (!birthDate || !email || !firstName || !lastName) {
      throw new BadRequestException();
    }

    const user = new User();

    user.birthDate = new Date(birthDate).toISOString();
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;

    try {
      const { rows: roles } = await this.db.query<Role>(`
        SELECT * from roles
        WHERE type = '${roleType || RoleTypeEnum.EXTERNAL}';
      `);

      user.roleId = roles[0].id;

      const query = UserRepository.createUserQuery(user);
      const { rows } = await this.db.query<User>(query);
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
      console.log({
        raw: user.birthDate,
        newRaw: "",
        birthDate,
        treatment: new Date(birthDate || new Date()).toISOString()
      });

      if(user.birthDate) {
        user.birthDate = new Date(user.birthDate).toISOString();
      }

      if(birthDate) {
        user.birthDate = new Date(birthDate).toISOString();
      }

      user.email = email || user.email;
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;

      const { rows } = await this.db.query<User>(`
       UPDATE users SET (first_name, last_name, email, birth_date) = ('${user.firstName}', '${user.lastName}', '${user.email}', '${user.birthDate}')
       WHERE id = '${user.id}'
       RETURNING id;
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
      INSERT INTO users (id, first_name, last_name, email, birth_date, role_id)
      VALUES(
        '${user.id}',
        '${user.firstName}',
        '${user.lastName}',
        '${user.email}',
        '${user.birthDate}',
        '${user.roleId}'
      )
      RETURNING id;
    `;
  }

}
