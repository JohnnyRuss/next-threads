import { Model, Document, Schema } from "mongoose";

export interface CommunityT extends Document {
  id: string;
  username: string;
  name: string;
  image: string;
  bio: string;
  createdBy: Schema.Types.ObjectId;
  threads: [Schema.Types.ObjectId];
  members: [Schema.Types.ObjectId];
  createdAt: string;
  updatedAt: string;
}

export interface CommunityMethodsT {}

export type CommunityModelT = Model<CommunityT, {}, CommunityMethodsT>;
