type IJWTPayload = {
  _id: string;
  isAdmin: boolean;
};

type ILogin = {
  email: string;
  password: string;
};

export { IJWTPayload, ILogin };
