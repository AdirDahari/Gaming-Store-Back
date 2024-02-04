import { IUser } from "../../@types/user";
import { auth } from "../../service/auth-service";
import { Post } from "../model/post";
import { User } from "../model/user";
import { postData } from "./post-data";
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

    const { _id } = (await User.findOne({ isAdmin: true })) as IUser;
    for (let post of postData) {
      post.seller.userId = _id!;
      const saved = await new Post(post).save();
      console.log("Post saved", saved);
    }
  } catch (err) {
    console.log("Error Connecting to database", err);
  }
};
export { initDB };
