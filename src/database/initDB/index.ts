import { auth } from "../../service/auth-service";
import { User } from "../model/user";
import { usersData } from "./user-data";

const initDB = async () => {
  try {
    const usersCount = await User.countDocuments();
    if (usersCount !== 0) return;

    for (let user of usersData) {
      user.password = await auth.hashPassword(user.password);
      const saved = await new User(user).save();
      console.log("User saved", saved);
    }

    // Add posts
  } catch (err) {
    console.log("Error Connecting to database", err);
  }
};
export { initDB };
