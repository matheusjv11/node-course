import { Request, Response } from "express";
import { Document } from "mongoose";
import { CommentModel, PostModel } from "../models";
import { CommentType } from "../types/CommentType";
import { PostType } from "../types/PostType";

export class CommentController {
  public static async store(
    req: Request<Pick<PostType, "postId">, {}, CommentType>,
    res: Response
  ) {
    const createdComment = await CommentModel.create({
      ...req.body,
      likes: 0,
      autor: req.userId,
      post: req.params.postId,
    });

    CommentController.addCommentToPost(createdComment, req.params.postId);

    return res.sendStatus(200);
  }

  public static async like(
    req: Request<Pick<CommentType, "commentId">, {}, CommentType>,
    res: Response
  ) {
    await CommentModel.findByIdAndUpdate(req.params.commentId, {
      $inc: {
        likes: 1,
      },
    });

    return res.sendStatus(200);
  }

  private static async addCommentToPost(
    createdComment: Document<unknown, {}, CommentType>,
    postId: string | undefined
  ) {
    const post = await PostModel.findById(postId);

    if (post) {
      post.comentarios.push(createdComment.id);
      await post.save();
    }
  }
}
