import { SchemaDefinitionProperty } from "mongoose";

export type CommentType = {
  commentId?: string;
  texto: string;
  likes: number;
  autor: SchemaDefinitionProperty<string> | "undefined";
  post: SchemaDefinitionProperty<string> | "undefined";
};
