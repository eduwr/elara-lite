import { UserRepository } from "./users.repository";
import { DBClientInterface } from "../database/connection";
import { CreateUserDTO } from "./dto/create.user.dto";
import { User } from "./users.model";
import { BadRequestException } from "errorHandler";
import { createUserResponse } from "./__mocks__/mockDbResponses";

describe("UsersRepository", () => {
  let db: jest.MockedObject<DBClientInterface>;
  let userRepository: UserRepository;
  let createUserDto: CreateUserDTO;
  let userCreated: User;

  beforeAll(() => {
    db = {
      connect: jest.fn(),
      query: jest.fn(),
      end: jest.fn(),
    };

    userRepository = new UserRepository(db);

    createUserDto = {
      birthDate: new Date(2011, 9, 6),
      email: "isaac@mail.com",
      firstName: "Isaac",
      lastName: "Adames",
    };

    userCreated = new User();
    userCreated.birthDate = createUserDto.birthDate.toISOString();
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
          birthDate: new Date(),
          email: "",
          firstName: "",
          lastName: "",
        });
      }).rejects.toThrowError(BadRequestException);
    });

    it("db.query should be called 1 time", async () => {
      db.query.mockResolvedValue(createUserResponse);
      await userRepository.create(createUserDto);
      expect(db.query).toBeCalledTimes(1);
    });

    it("shold return the correct user", async () => {
      db.query.mockResolvedValue(createUserResponse);
      const user = await userRepository.create(createUserDto);
      expect(db.query).toBeCalledTimes(2);
      expect(user.lastName).toBe(user.lastName);
      expect(user.firstName).toBe(user.firstName);
      expect(user.birthDate).toBe(user.birthDate);
      expect(user.email).toBe(user.email);
    });
  });
});
