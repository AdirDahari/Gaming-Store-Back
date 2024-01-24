import { IUser } from "../@types/user";
import { User } from "../database/model/user";
import { auth } from "./auth-service";

const createUser = async (userData: IUser) => {
  try {
    const user = new User(userData);
    user.password = await auth.hashPassword(user.password);
    return user.save();
  } catch (err) {
    console.log("Create user failed...", err);
  }
};

const savedProfileImage = async (imageName: string) => {};

const validateUser = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return console.log("Bad credentials", 401);
    }

    const isPasswordValid = await auth.validatePassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return console.log("Bad credentials", 401);
    }

    const jwt = auth.generateJWT({ email });

    return { jwt };
  } catch (err) {
    return console.log("Login user failed...", 500);
  }
};

export { createUser, validateUser };
