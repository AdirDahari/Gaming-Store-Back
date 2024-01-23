import { RequestHandler } from "express";
import { extractToken } from "../validate-token";
import { auth } from "../../service/auth-service";
import { User } from "../../database/model/user";

const isAdmin: RequestHandler = async (req, res, next) => {
  try {
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token as string);

    const user = await User.findOne({ email });

    const isAdmin = user?.isAdmin;
    if (isAdmin) {
      return next();
    }
    throw new Error("Must be admin");
  } catch (err) {
    next(err);
  }
};

export { isAdmin };
