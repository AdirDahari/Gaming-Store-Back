import mongoose from "mongoose";
import { postSchema } from "../schema/post";

const Post = mongoose.model("posts", postSchema);

export { Post };
