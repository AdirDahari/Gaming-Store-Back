import { joiLoginSchema } from "../../validation/login.joi";
import { joiPostSchema } from "../../validation/post.joi";
import { joiUpdateUser } from "../../validation/update-user.joi";
import { joiUserSchema } from "../../validation/user.joi";
import { validateSchema } from "./validate-schema";

export const validateLogin = validateSchema(joiLoginSchema);
export const validateRegister = validateSchema(joiUserSchema);
export const validateUpdateUser = validateSchema(joiUpdateUser);
export const validatePost = validateSchema(joiPostSchema);
