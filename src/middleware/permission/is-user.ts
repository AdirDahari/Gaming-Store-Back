import { RequestHandler } from "express";
import { extractToken } from "../validate-token";
import { auth } from "../../service/auth-service";
import { User } from "../../database/model/user";
import { IUser } from "../../@types/user";

const isUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token as string);

    const user = (await User.findOne({ email }).lean()) as IUser;

    if (!user) throw new Error("User does not exist");

    req.user = user;

    if (id === user._id) return next();

    throw new Error("The id must belong to the user");
  } catch (err) {
    next(err);
  }
};

export { isUser };
