import {
  CommunityMethodsT,
  CommunityModelT,
  CommunityT,
} from "@/database/models/interface/community.model.types";
import { model, models, Schema } from "mongoose";

const CommunitySchema = new Schema<
  CommunityT,
  CommunityModelT,
  CommunityMethodsT
>(
  {
    id: { type: String, required: true },
    username: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String },
    bio: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    threads: [{ type: Schema.Types.ObjectId, ref: "Thread" }],
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Community =
  models.Community ||
  model<CommunityT, CommunityModelT>("Community", CommunitySchema);
export default Community;
