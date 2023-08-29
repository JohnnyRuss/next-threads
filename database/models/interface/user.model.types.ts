import { Model, Document, Schema } from "mongoose";

export interface UserT extends Document {
  id: string;
  username: string;
  name: string;
  image: string;
  bio: string;
  onboarded: boolean;
  threads: [Schema.Types.ObjectId];
  communities: [Schema.Types.ObjectId];
}

export interface UserMethodsT {}

export type UserModelT = Model<UserT, {}, UserMethodsT>;
