type IJWTPayload = {
  email: string;
  isAdmin: boolean;
};

type ILogin = {
  email: string;
  password: string;
};

export { IJWTPayload, ILogin };
