import { RequestHandler } from "express";
import { auth } from "../../service/auth-service";
import { User } from "../../database/model/user";
import { IUser } from "../../@types/user";
import { extractToken } from "../validate-token";
import { GameError } from "../../error/gamming-store-error";

const isAdminOrUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token as string);

    const requestUser = (await User.findOne({ email }).lean()) as IUser;

    if (!requestUser) throw new GameError("User does not exist", 401);
    if (id == requestUser._id) {
      req.user = requestUser;
      return next();
    }
    if (requestUser.isAdmin) {
      const responseUser = (await User.findOne({ _id: id }).lean()) as IUser;
      if (!responseUser) throw new GameError("User does not exist", 401);
      req.user = responseUser;
      return next();
    }

    res
      .status(401)
      .json({ message: "Only admin/The id must belong to the user" });
  } catch (e) {
    next(e);
  }
};

export { isAdminOrUser };
