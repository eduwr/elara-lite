export class BadRequestException extends Error {
  statusCode = 400;

  constructor() {
    super("Bad Request Exception!");

    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, BadRequestException.prototype);
  }

  getErrorMessage() {
    return "Something went wrong: " + this.message;
  }
}

export class InternarlServerErrorException extends Error {
  statusCode = 500;

  constructor() {
    super("Internal server error!");

    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, InternarlServerErrorException.prototype);
  }

  getErrorMessage() {
    return "Something went wrong: " + this.message;
  }
}
