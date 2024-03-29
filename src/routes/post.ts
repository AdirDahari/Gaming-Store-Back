import { Router } from "express";
import { Post } from "../database/model/post";
import { validatePost, validateUpdatePost } from "../middleware/validation";
import { validateToken } from "../middleware/validate-token";
import { createPost } from "../service/post-service";
import { IPost } from "../@types/post";
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

router.get("/platform/:name", async (req, res, next) => {
  try {
    const { name } = req.params;
    const posts = await Post.find({ platform: name });

    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
});

router.get("/profile/my-posts", validateToken, async (req, res, next) => {
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

router.put(
  "/:id",
  isPostUserOrAdmin,
  validateUpdatePost,
  async (req, res, next) => {
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
  }
);

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

    const userId = req.user?._id?.toString();
    const indexId = likes.indexOf(req.user?._id!);

    if (indexId === -1) {
      let tempLikes = [userId, ...likes];
      const updatedLikes = (await Post.findByIdAndUpdate(
        { _id: _id },
        { likes: tempLikes },
        { new: true }
      ).lean()) as IPost;
      const response = updatedLikes.likes;
      return res.status(200).json({ likes: response });
    }
    likes.splice(indexId, 1);
    const updatedLikes = (await Post.findByIdAndUpdate(
      { _id: _id },
      { likes: likes },
      { new: true }
    ).lean()) as IPost;
    const response = updatedLikes.likes;
    return res.status(200).json({ likes: response });
  } catch (err) {
    next(err);
  }
});

export { router as postRouter };
