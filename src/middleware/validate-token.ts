import { RequestHandler, Request } from "express";
import { auth } from "../service/auth-service";
import { User } from "../database/model/user";

const extractToken = (req: Request) => {
  const authHeader = req.header("Authorization");

  if (
    authHeader &&
    authHeader.length > 7 &&
    authHeader.toLowerCase().startsWith("bearer ")
  ) {
    return authHeader.substring(7);
  }
  return console.log("token is missing in Authorization header");
};

const validateToken: RequestHandler = async (req, res, next) => {
  try {
    const token = extractToken(req);

    const { email } = auth.verifyJWT(token as string);
    const user = await User.findOne({ email });
    if (!user) return console.log("User does not exist");
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

export { validateToken, extractToken };
