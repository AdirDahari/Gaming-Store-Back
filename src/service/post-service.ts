import { IPost } from "../@types/post";
import { Post } from "../database/model/post";
import { GameError } from "../error/gaming-store-error";

const createPost = async (data: IPost, userId: string) => {
  try {
    const post = new Post(data);
    post.seller.userId = userId;
    post.likes = [];
    return post.save();
  } catch (err) {
    throw new GameError("Create post failed...", 500);
  }
};

export { createPost };
