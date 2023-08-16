import Joi from "joi";
import { CommentType } from "../types/CommentType";

export const CommentValidator = Joi.object<CommentType>({
  texto: Joi.string().max(500).required(),
});
