import { model, Schema } from "mongoose";
import { CommentType } from "../types/CommentType";

const CommentSchema = new Schema<CommentType>(
  {
    texto: {
      type: String,
      required: true,
      maxlength: 500,
    },
    likes: {
      type: Number,
      required: true,
    },
    autor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CommentModel = model("Comment", CommentSchema);
