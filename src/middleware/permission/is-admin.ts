import { RequestHandler } from "express";
import { extractToken } from "../validate-token";
import { auth } from "../../service/auth-service";
import { User } from "../../database/model/user";
import { GameError } from "../../error/gamming-store-error";

const isAdmin: RequestHandler = async (req, res, next) => {
  try {
    const token = extractToken(req);
    const { _id } = auth.verifyJWT(token as string);

    const user = await User.findById(_id);

    const isAdmin = user?.isAdmin;
    if (isAdmin) {
      return next();
    }
    throw new GameError("Must be admin", 401);
  } catch (err) {
    next(err);
  }
};

export { isAdmin };
