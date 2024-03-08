import Joi from "joi";
import { IImage } from "../@types/user";
import { platformRegex, productStatusRegex, categoryRegex } from "./patterns";
import { IGame, IPost } from "../@types/post";

const schema = Joi.object<IPost>({
  platform: Joi.string().pattern(platformRegex).required(),
  game: Joi.object<IGame>({
    category: Joi.array().items(Joi.string().pattern(categoryRegex)).required(),
    name: Joi.string().min(2).max(50).required(),
    price: Joi.number().min(1).max(99999).required(),
    description: Joi.string().max(250).allow(""),
    images: Joi.array()
      .items(
        Joi.object<IImage>({
          alt: Joi.string().min(2).max(100).required(),
          url: Joi.string().min(5).max(9999).required(),
        })
      )
      .required(),
    productStatus: Joi.string().pattern(productStatusRegex).required(),
  }).required(),
});

export { schema as joiUpdatePostSchema };
