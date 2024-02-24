import { RequestHandler, Request } from "express";
import { auth } from "../service/auth-service";
import { User } from "../database/model/user";
import { GameError } from "../error/gamming-store-error";
import { IUser } from "../@types/user";

const extractToken = (req: Request) => {
  const authHeader = req.header("Authorization");

  if (
    authHeader &&
    authHeader.length > 7 &&
    authHeader.toLowerCase().startsWith("bearer ")
  ) {
    return authHeader.substring(7);
  }
  throw new GameError("token is missing in Authorization header", 400);
};

const validateToken: RequestHandler = async (req, res, next) => {
  try {
    const token = extractToken(req);

    const { email } = auth.verifyJWT(token as string);
    const user = (await User.findOne({ email }).lean()) as IUser;
    console.log(user);

    if (!user) throw new GameError("User does not exist", 401);
    req.user = user;

    next();
  } catch (e) {
    next(e);
  }
};

export { validateToken, extractToken };
