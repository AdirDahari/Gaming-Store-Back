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
import * as fs from "fs";
import multer from "multer";
import { GameError } from "../error/gamming-store-error";

const router = Router();

// const uploadImage = multer({
//   dest: `C:/Users/Adir/Desktop/Repositories/Gamming-Store-Back/public/images`,
// });

// router.post("/image", uploadImage.single("File"), async (req, res, next) => {
//   try {
//     const file = `${req.file?.destination}/${req.file?.originalname}`;
//     console.log(req.file?.originalname);

//     fs.rename(req.file?.path as string, file, (err) => {
//       if (err) {
//         console.log(err);

//         next(err);
//       } else {
//         res.status(200).json({ message: "Saved", file });
//       }
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// router.get("/image/:imageName", isUser, async (req, res, next) => {
//   try {
//     const userId = req.user?._id;
//     const imageName = req.params.imageName;
//     const readStream = fs.createReadStream(
//       `C:/Users/Adir/Desktop/Repositories/Gamming-Store-Back/public/images/${imageName}`
//     );
//     console.log(readStream);
//     readStream.pipe(res);
//   } catch (err) {
//     next(err);
//   }
// });

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
    const { password, ...rest } = req.user!;
    console.log(rest);

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
    if (!updateUser) {
      throw new GameError("User does not update", 401);
    }
    const { password, ...rest } = updateUser;
    res.status(200).json({ message: "User update", user: rest });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", isAdminOrUser, async (req, res, next) => {
  try {
    const { id } = req.params;
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
