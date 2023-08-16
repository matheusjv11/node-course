import { SchemaDefinitionProperty } from "mongoose";

export type PostType = {
  postId?: string;
  titulo: string;
  texto: string;
  autor: SchemaDefinitionProperty<string> | "undefined";
  comentarios: SchemaDefinitionProperty<string>[];
};
