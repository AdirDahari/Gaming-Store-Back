import { ObjectId } from "mongoose";
import { IImage } from "./user";

type IPost = {
  game: IGame;
  seller: ISeller;
};

type IGame = {
  category: string;
  name: string;
  price: number;
  description: string;
  productStatus: string;
  images: IImage[];
};

type ISeller = {
  userId: string;
  firstName: string;
  city: string;
  phone: string;
};

export { IGame, IPost, ISeller };
