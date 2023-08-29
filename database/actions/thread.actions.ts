"use server";

import { revalidatePath } from "next/cache";
import { Thread, User } from "@/database/models";
import { CreateThreadParamsT, GetAllThreadsParamsT } from "@/types/thread";
import ConnectToDB from "../mongoose";

export async function createThread(params: CreateThreadParamsT): Promise<void> {
  try {
    await ConnectToDB();

    const thread = await Thread.create({
      text: params.text,
      author: params.author,
      community: params.communityId || null,
    });

    await User.findByIdAndUpdate(params.author, {
      $push: { threads: thread._id },
    });

    revalidatePath(params.path);
  } catch (error) {
    throw error;
  }
}

export async function getThreads(params: GetAllThreadsParamsT) {
  try {
    await ConnectToDB();

    const skip = (params.pageNumber - 1) * params.limit;

    const threadsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
      .skip(skip)
      .limit(params.limit)
      .sort({ createdAt: -1 })
      .populate({ path: "author" })
      .populate({
        path: "children",
        populate: { path: "author", select: "_id name parentId image" },
      });

    const threadsCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    });

    const threads = await threadsQuery.exec();

    const hasNextPage = threadsCount > skip + params.limit;

    return { threads, hasNextPage };
  } catch (error) {
    throw error;
  }
}
