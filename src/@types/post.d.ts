import { ObjectId } from "mongoose";
import { IImage } from "./user";

type IPost = {
  _id?: string;
  platform: string;
  game: IGame;
  seller: ISeller;
  likes: string[];
  createdAt?: Date;
};

type IGame = {
  category: string[];
  name: string;
  price: number;
  description?: string;
  productStatus: string;
  images: IImage[];
};

type ISeller = {
  userId?: string;
  firstName: string;
  city: string;
  phone: string;
};

export { IGame, IPost, ISeller };
