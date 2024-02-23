import { Schema } from "mongoose";
import { ISeller } from "../../../@types/post";
import { required } from "joi";

const sellerSchema = new Schema<ISeller>({
  city: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 100,
  },
  firstName: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 100,
  },
  phone: {
    required: true,
    type: String,
    minlength: 5,
    maxlength: 20,
  },
  userId: {
    required: false,
    type: String,
  },
});

export { sellerSchema };
