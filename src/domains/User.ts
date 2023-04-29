import type { TokenDTO, UserDTO } from "@/services";

export class User {
  isNull = true;
  constructor(private user: UserDTO) {
    this.isNull = false;
  }

  get token(): Token {
    return this.user.token ? new Token(this.user.token) : newNullToken();
  }

  set password(password: string) {
    this.user.password = password;
  }

  set email(email: string) {
    this.user.email = email;
  }

  get userAsDto(): UserDTO {
    return this.user;
  }
}

class Token {
  isNull = true;
  constructor(private token: TokenDTO) {
    this.isNull = false;
  }

  get accessToken(): string {
    return this.token.accessToken ? this.token.accessToken : "";
  }

  get expirationDate(): string {
    return this.token.expirationDate ? this.token.expirationDate : "";
  }
}

export const newNullUser = (): User => {
  const user = new User({});
  user.isNull = true;
  return user;
};

const newNullToken = (): Token => {
  const token = new Token({});
  token.isNull = true;
  return token;
};
