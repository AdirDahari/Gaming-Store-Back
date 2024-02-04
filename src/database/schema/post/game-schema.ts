import { Schema } from "mongoose";
import { IGame } from "../../../@types/post";

const gameSchema = new Schema<IGame>({
  category: [
    {
      required: true,
      type: String,
      minlength: 2,
      maxlength: 50,
    },
  ],
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 50,
  },
  price: {
    required: true,
    type: Number,
    min: 1,
    max: 99999,
  },
  description: {
    required: false,
    type: String,
    maxlength: 250,
  },
  images: [
    {
      url: String,
      alt: String,
    },
  ],
  productStatus: {
    required: true,
    type: String,
  },
});

export { gameSchema };
