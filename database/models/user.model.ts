import {
  UserMethodsT,
  UserModelT,
  UserT,
} from "@/database/models/interface/user.model.types";
import { model, models, Schema } from "mongoose";

const UserSchema = new Schema<UserT, UserModelT, UserMethodsT>({
  id: { type: String, required: true },
  username: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String },
  bio: { type: String },
  threads: [{ type: Schema.Types.ObjectId, ref: "Thread" }],
  onboarded: { type: Boolean, default: false },
  communities: [{ type: Schema.Types.ObjectId, ref: "Community" }],
});

const User = models.User || model<UserT, UserModelT>("User", UserSchema);
export default User;
