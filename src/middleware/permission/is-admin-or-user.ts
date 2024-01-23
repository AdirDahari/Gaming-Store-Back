import { RequestHandler } from "express";
import { auth } from "../../service/auth-service";
import { User } from "../../database/model/user";
import { IUser } from "../../@types/user";
import { extractToken } from "../validate-token";

const isAdminOrUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token as string);

    const user = (await User.findOne({ email }).lean()) as IUser;
    req.user = user;

    if (!user) throw new Error("User does not exist");

    if (id == user._id) return next();

    if (user.isAdmin) return next();

    res
      .status(401)
      .json({ message: "Only admin/The id must belong to the user" });
  } catch (e) {
    next(e);
  }
};

export { isAdminOrUser };
