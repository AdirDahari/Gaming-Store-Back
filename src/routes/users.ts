import { Router } from "express";
import { User } from "../database/model/user";
import { isAdmin } from "../middleware/permission/is-admin";
import { isAdminOrUser } from "../middleware/permission/is-admin-or-user";
import { ILogin } from "../@types/service";
import { createUser, validateUser } from "../service/user-service";
import {
  validateLogin,
  validateRegister,
  validateUpdateUser,
} from "../middleware/validation";
import { IUser } from "../@types/user";
import { isUser } from "../middleware/permission/is-user";
import { GameError } from "../error/gaming-store-error";
import { validateToken } from "../middleware/validate-token";
import { Post } from "../database/model/post";

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
    if (!req.user) throw new GameError("user does not exist", 401);
    const { password, ...rest } = req.user!;

    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
});

router.post("/login", validateLogin, async (req, res, next) => {
  try {
    const { email, password } = req.body as ILogin;
    const jwt = await validateUser(email, password);

    res.status(200).json(jwt);
  } catch (err) {
    next(err);
  }
});

router.post("/", validateRegister, async (req, res, next) => {
  try {
    const saved = await createUser(req.body as IUser);
    const { password, ...rest } = saved._doc!;

    res.status(201).json({ message: "Saved", user: rest });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", isUser, validateUpdateUser, async (req, res, next) => {
  try {
    const updateUser = (await User.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).lean()) as IUser;
    const { password, ...rest } = updateUser;

    res.status(200).json({ message: "User update", user: rest });
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", isAdmin, async (req, res, next) => {
  try {
    const { isAdmin } = (await User.findById(req.params.id)) as IUser;
    const updateUser = (await User.findByIdAndUpdate(
      { _id: req.params.id },
      { isAdmin: !isAdmin },
      { new: true }
    ).lean()) as IUser;

    if (!updateUser) throw new GameError("User does not update", 401);
    const { isAdmin: newIsAdmin } = updateUser;
    res.status(200).json({ isAdmin: newIsAdmin });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", isAdminOrUser, async (req, res, next) => {
  try {
    const { id } = req.params;

    await Post.deleteMany({ "seller.userId": id });

    const deleteUser = (await User.findByIdAndDelete({
      _id: id,
    }).lean()) as IUser;
    const { password, ...rest } = deleteUser;

    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
});

export { router as userRouter };
