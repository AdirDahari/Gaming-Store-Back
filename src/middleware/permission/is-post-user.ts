import { RequestHandler } from "express";
import { extractToken } from "../validate-token";
import { auth } from "../../service/auth-service";
import { User } from "../../database/model/user";
import { GameError } from "../../error/gaming-store-error";
import { Post } from "../../database/model/post";

const isPostUser: RequestHandler = async (req, res, next) => {
  try {
    const token = extractToken(req);
    const { _id } = auth.verifyJWT(token);
    const user = await User.findById(_id);

    if (!user) throw new GameError("User does not exist", 401);

    const { id: postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) throw new GameError("Post does not exist", 401);

    if (post.seller.userId == user.id) {
      return next();
    }
    throw new GameError("Only user who create the post can update", 401);
  } catch (err) {
    next(err);
  }
};

export { isPostUser };
