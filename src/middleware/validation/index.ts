import { joiLoginSchema } from "../../validation/login.joi";
import { validateSchema } from "./validate-schema";

export const validateLogin = validateSchema(joiLoginSchema);
