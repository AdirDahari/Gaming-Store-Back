import { IUser } from "../@types/user";
import { User } from "../database/model/user";
import { GameError } from "../error/gamming-store-error";
import { Logger } from "../logs/logger";
import { auth } from "./auth-service";

const createUser = async (userData: IUser) => {
  try {
    const user = new User(userData);
    user.password = await auth.hashPassword(user.password);
    return user.save();
  } catch (err) {
    Logger.error("Create user failed...", err);
  }
};

const validateUser = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return new GameError("Bad credentials", 401);
    }

    const isPasswordValid = await auth.validatePassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return new GameError("Bad credentials", 401);
    }
    const jwt = auth.generateJWT({ email, isAdmin: user.isAdmin! });

    return { jwt };
  } catch (err) {
    return new GameError("Login user failed...", 500);
  }
};

export { createUser, validateUser };
