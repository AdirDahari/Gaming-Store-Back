import { Schema } from "mongoose";
import { IPost } from "../../../@types/post";
import { gameSchema } from "./game-schema";
import { sellerSchema } from "./seller-schema";

const postSchema = new Schema<IPost>({
  platform: {
    required: true,
    type: String,
  },
  game: gameSchema,
  seller: sellerSchema,
  createdAt: {
    type: Date,
    required: false,
    default: new Date(),
  },
});
export { postSchema };
