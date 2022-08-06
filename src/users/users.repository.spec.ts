import { UserRepository } from "./users.repository";
import { DBClientInterface } from "../database/connection";
import { CreateUserDto } from "./dto/create.user.dto";
import { User } from "./users.model";
import { BadRequestException } from "errorHandler";

describe("UsersRepository", () => {
  let db: jest.MockedObject<DBClientInterface>;
  let userRepository: UserRepository;
  let createUserDto: CreateUserDto;
  let userCreated: User;

  beforeAll(() => {
    db = {
      connect: jest.fn(),
      query: jest.fn(),
      end: jest.fn(),
    };

    userRepository = new UserRepository(db);

    createUserDto = {
      age: 10,
      email: "isaac@mail.com",
      firstName: "Isaac",
      lastName: "Adames",
    };

    userCreated = new User();
    userCreated.age = createUserDto.age;
    userCreated.email = createUserDto.email;
    userCreated.firstName = createUserDto.firstName;
    userCreated.lastName = createUserDto.lastName;
  });

  it("Should pass", () => {
    expect(100).toBe(100);
  });

  describe("create()", () => {
    it("should throw an error if called with wrong parameters", async () => {
      await expect(async () => {
        await userRepository.create({
          age: 0,
          email: "",
          firstName: "",
          lastName: "",
        });
      }).rejects.toThrowError(BadRequestException);
    });

    it("shold call query with correct params", async () => {
      await userRepository.create(createUserDto);
      expect(db.query).toBeCalledTimes(1);
    });

    it("shold return the correct user", async () => {
      db.query.mockResolvedValue(userCreated);
      const user = await userRepository.create(createUserDto);
      expect(db.query).toBeCalledTimes(2);
      expect(user).toBe(userCreated);
      console.log(user);
    });
  });
});
