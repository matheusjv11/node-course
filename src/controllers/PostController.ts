import { PostType } from "../types/PostType";
import { Request, Response } from "express";
import { PostModel } from "../models";

export class PostController {
  public static async index(req: Request<PostType>, res: Response) {
    return res.send(await PostModel.find({}).populate("autor", "nome"));
  }

  public static async show(req: Request<PostType>, res: Response) {
    const postFound = await PostModel.findById(req.params.postId)
      .populate("autor", ["nome", "email"])
      .populate({
        path: "comentarios",
        populate: {
          path: "autor",
          select: ["nome", "email"],
        },
      });

    if (postFound) {
      return res.send(postFound);
    }

    return res.sendStatus(404);
  }

  public static async store(req: Request<{}, {}, PostType>, res: Response) {
    const { titulo, texto } = req.body;

    await PostModel.create({ titulo, texto, autor: req.userId });

    return res.sendStatus(201);
  }

  public static async update(
    req: Request<Pick<PostType, "postId">, {}, PostType>,
    res: Response
  ) {
    await PostModel.findByIdAndUpdate(req.params.postId, req.body);

    return res.sendStatus(200);
  }

  public static async delete(req: Request<PostType>, res: Response) {
    await PostModel.findByIdAndDelete(req.params.postId);
    return res.sendStatus(200);
  }
}
