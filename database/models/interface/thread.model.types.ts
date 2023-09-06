import { Model, Document, Schema } from "mongoose";

export interface ThreadT extends Document {
  text: string;
  author: Schema.Types.ObjectId;
  community: Schema.Types.ObjectId;
  parentId: string;
  children: Schema.Types.ObjectId[];
  reactions: Schema.Types.ObjectId[];
}

export interface ThreadMethodsT {}

export type ThreadModelT = Model<ThreadT, {}, ThreadMethodsT>;
