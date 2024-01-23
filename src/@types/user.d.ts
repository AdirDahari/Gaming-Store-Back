import { ObjectId } from "mongoose";

type IUser = {
  name: IName;
  address: IAddress;
  image?: IImage;
  email: string;
  phone: string;
  password: string;
  isAdmin?: boolean;
  createdAt?: Date;
  _id?: string;
};

type IName = {
  first: string;
  middle?: string;
  last: string;
};

type IAddress = {
  street: string;
  city: string;
  state?: string;
  zip?: string;
  country: string;
  houseNumber: number;
};

type IImage = {
  alt: string;
  url: string;
};

export { IUser, IAddress, IImage, IName };
