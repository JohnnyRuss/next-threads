import { Model, Document, Schema } from "mongoose";

export interface CommunityT extends Document {
  id: string;
  username: string;
  name: string;
  image: string;
  bio: string;
  createdBy: Schema.Types.ObjectId;
  onboarded: boolean;
  members: [Schema.Types.ObjectId];
}

export interface CommunityMethodsT {}

export type CommunityModelT = Model<CommunityT, {}, CommunityMethodsT>;
