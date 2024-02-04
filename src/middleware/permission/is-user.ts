import { RequestHandler } from "express";
import { extractToken } from "../validate-token";
import { auth } from "../../service/auth-service";
import { User } from "../../database/model/user";
import { IUser } from "../../@types/user";
import { GameError } from "../../error/gamming-store-error";

const isUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token as string);

    const user = (await User.findOne({ email }).lean()) as IUser;

    if (!user) throw new GameError("User does not exist", 401);

    req.user = user;
    console.log(id, user._id);

    if (id === user._id?.toString()) return next();

    throw new GameError("The id must belong to the user", 401);
  } catch (err) {
    next(err);
  }
};

export { isUser };
