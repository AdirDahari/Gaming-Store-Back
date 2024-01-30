import { Router } from "express";
import { Post } from "../database/model/post";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.find().limit(8);
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

router.get("/all", async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

export { router as postRouter };
