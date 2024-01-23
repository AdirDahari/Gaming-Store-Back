import { Router } from "express";
import { User } from "../database/model/user";
import { isAdmin } from "../middleware/permission/is-admin";
import { isAdminOrUser } from "../middleware/permission/is-admin-or-user";
import { ILogin } from "../@types/service";
import { validateUser } from "../service/user-service";
import { validateLogin } from "../middleware/validation";

const router = Router();

router.get("/", isAdmin, async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", isAdminOrUser, async (req, res, next) => {
  try {
    if (!req.user) {
      res.status(401).json("User does not exist");
    }
    const { password, ...rest } = req.body;
    console.log("User found");
    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
});

router.post("/login", validateLogin, async (req, res, next) => {
  try {
    const { email, password } = req.body as ILogin;
    const jwt = await validateUser(email, password);
    console.log("User logged in");
    res.status(200).json(jwt);
  } catch (err) {
    next(err);
  }
});

export { router as userRouter };
