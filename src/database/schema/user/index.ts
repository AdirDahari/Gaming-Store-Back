import { Schema } from "mongoose";
import { nameSchema } from "./name-schema";
import { imageSchema } from "./image-schema";
import { addressSchema } from "./address-schema";
import { IUser } from "../../../@types/user";

const userSchema = new Schema<IUser>({
  name: nameSchema,
  address: addressSchema,
  image: {
    type: imageSchema,
    required: false,
    default: {
      alt: "user-profile",
      url: "https://cdn.iconscout.com/icon/premium/png-256-thumb/gamer-profile-5366389-4480305.png",
    },
  },
  phone: {
    required: true,
    type: String,
    minlength: 5,
    maxlength: 20,
  },
  email: {
    unique: true,
    required: true,
    type: String,
    minlength: 5,
    maxlength: 100,
  },
  password: {
    required: true,
    type: String,
    minlength: 5,
    maxlength: 100,
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: false,
  },
  createdAt: {
    type: Date,
    required: false,
    default: new Date(),
  },
});

export { userSchema };
