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
      .populate({
        path: "author",
        select: "-__v -bio -onboarded -threads -communities",
      })
      .populate({
        path: "children",
        populate: { path: "author", select: "_id name image" },
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

export const getThread = async ({
  threadId,
}: {
  threadId: string;
}): Promise<any> => {
  try {
    await ConnectToDB();

    const thread = await Thread.findById(threadId)
      .populate({
        path: "author",
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            select: "_id id name image parentId",
          },
          {
            path: "children",
            populate: { path: "author", select: "_id id name image parentId" },
          },
        ],
      });

    if (!thread) throw new Error("Thread does not exits");

    return thread;
  } catch (error) {
    throw error;
  }
};

export const addComment = async (args: {
  threadId: string;
  commentText: string;
  userId: string;
  path: string;
}) => {
  try {
    ConnectToDB();

    const originalThread = await Thread.findById(args.threadId);

    if (!originalThread) throw new Error("Thread not found");

    const newThread = await Thread.create({
      author: args.userId,
      parentId: args.threadId,
      text: args.commentText,
    });

    originalThread.children.push(newThread._id);

    await originalThread.save();

    revalidatePath(args.path);
  } catch (error) {
    throw error;
  }
};
