export type UserLogin = {
  email: string;
  password: string;
};

export type UserError = {
  wrongInfo?: string;
  other?: string;
} & Partial<UserLogin>;

export type ErrorBody = {
  body: string;
};
