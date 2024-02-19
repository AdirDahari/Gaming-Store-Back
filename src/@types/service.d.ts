type IJWTPayload = {
  email: string;
  image: string;
};

type ILogin = {
  email: string;
  password: string;
};

export { IJWTPayload, ILogin };
