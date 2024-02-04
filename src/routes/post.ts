import { Router } from "express";
import { Post } from "../database/model/post";
import { validatePost } from "../middleware/validation";
import { validateToken } from "../middleware/validate-token";
import { GameError } from "../error/gamming-store-error";
import { createPost } from "../service/post-service";
import { IPost } from "../@types/post";
import { isPostUser } from "../middleware/permission/is-post-user";
import { isPostUserOrAdmin } from "../middleware/permission/is-post-user-or-admin";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.find();

    return res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

// router.get("/all", async (req, res, next) => {
//   try {
//     const posts = await Post.find();
//     res.status(200).json(posts);
//   } catch (err) {
//     next(err);
//   }
// });

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
});

router.get("/my-posts", validateToken, async (req, res, next) => {
  try {
    const userId = req.user?._id;

    const posts = await Post.find({ "seller.userId": userId });
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

router.post("/", validateToken, validatePost, async (req, res, next) => {
  try {
    const userId = req.user?._id;

    const savedPost = await createPost(req.body as IPost, userId as string);
    res.status(201).json({ post: savedPost });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", isPostUser, validatePost, async (req, res, next) => {
  try {
    const updatePost = await Post.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json(updatePost);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", isPostUserOrAdmin, async (req, res, next) => {
  try {
    const deletedPost = (await Post.deleteOne({
      _id: req.params.id,
    }).lean()) as IPost;
    res.status(200).json(deletedPost);
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", validateToken, async (req, res, next) => {
  try {
    const { likes, _id } = (await Post.findById(req.params.id)) as IPost;
    const indexId = likes.indexOf(req.user?._id!);

    if (indexId === -1) {
      likes.push(req.user?._id!);
      const updatedLikes = (await Post.findByIdAndUpdate(
        { _id: _id },
        { likes: likes },
        { new: true }
      ).lean()) as IPost;
      res.status(200).json(updatedLikes);
    }
    likes.splice(indexId, 1);
    const updatedLikes = (await Post.findByIdAndUpdate(
      { _id: _id },
      { likes: likes },
      { new: true }
    ).lean()) as IPost;
    return res.status(200).json(updatedLikes);
  } catch (err) {
    next(err);
  }
});

export { router as postRouter };
