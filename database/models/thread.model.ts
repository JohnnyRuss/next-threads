import {
  ThreadMethodsT,
  ThreadModelT,
  ThreadT,
} from "@/database/models/interface/thread.model.types";
import { model, models, Schema } from "mongoose";

const ThreadSchema = new Schema<ThreadT, ThreadModelT, ThreadMethodsT>(
  {
    text: { type: String, required: true },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    community: {
      type: Schema.Types.ObjectId,
      ref: "Community",
    },
    parentId: {
      type: String,
    },
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thread",
      },
    ],
  },
  { timestamps: true }
);

const Thread =
  models.Thread || model<ThreadT, ThreadModelT>("Thread", ThreadSchema);
export default Thread;
