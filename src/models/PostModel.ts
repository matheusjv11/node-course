import { Schema, model } from "mongoose";
import { PostType } from "../types/PostType";

const PostSchema = new Schema<PostType>(
  {
    titulo: {
      type: String,
      required: true,
      maxlength: 120,
    },
    texto: {
      type: String,
      required: true,
      maxlength: 500,
    },
    autor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comentarios: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const PostModel = model("Post", PostSchema);
