import mongoose from "mongoose";
import { userSchema } from "../schema/user";

const User = mongoose.model("users", userSchema);

export { User };
