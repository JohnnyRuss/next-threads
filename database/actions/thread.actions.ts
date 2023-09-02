"use server";

import { revalidatePath } from "next/cache";
import { Thread, User, Community } from "@/database/models";
import { CreateThreadParamsT, GetAllThreadsParamsT } from "@/types/thread";
import ConnectToDB from "../mongoose";

export async function createThread(params: CreateThreadParamsT): Promise<void> {
  try {
    await ConnectToDB();

    const communityIdObject = await Community.findOne(
      { id: params.communityId },
      { _id: 1 }
    );

    const thread = await Thread.create({
      text: params.text,
      author: params.author,
      community: communityIdObject || null,
    });

    await User.findByIdAndUpdate(params.author, {
      $push: { threads: thread._id },
    });

    if (communityIdObject)
      await Community.findByIdAndUpdate(communityIdObject, {
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
      .populate({ path: "community" })
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
        path: "community",
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

export async function deleteThread(args: {
  id: string;
  path: string;
}): Promise<void> {
  try {
    ConnectToDB();

    const mainThread = await Thread.findById(args.id).populate(
      "author community"
    );

    if (!mainThread) throw new Error("Thread not found");

    const descendantThreads = await fetchAllChildThreads({ threadId: args.id });

    const descendantThreadIds = [
      args.id,
      ...descendantThreads.map((thread) => thread._id),
    ];

    const uniqueAuthorIds = Array.from(
      new Set(
        [
          ...descendantThreads.map((thread) => thread.author?._id?.toString()),
          mainThread.author?._id?.toString(),
        ].filter((id) => id !== undefined)
      )
    );

    const uniqueCommunityIds = Array.from(
      new Set(
        [
          ...descendantThreads.map((thread) =>
            thread.community?._id?.toString()
          ),
          mainThread.community?._id?.toString(),
        ].filter((id) => id !== undefined)
      )
    );

    await Thread.deleteMany({ _id: { $in: descendantThreadIds } });

    await User.updateMany(
      { _id: { $in: uniqueAuthorIds } },
      { $pull: { threads: { $in: descendantThreadIds } } }
    );

    await Community.updateMany(
      { _id: { $in: uniqueCommunityIds } },
      { $pull: { threads: { $in: descendantThreadIds } } }
    );

    revalidatePath(args.path);
  } catch (error: any) {
    throw new Error(`Failed to delete thread: ${error.message}`);
  }
}

async function fetchAllChildThreads(args: {
  threadId: string;
}): Promise<any[]> {
  ConnectToDB();

  const childThreads = await Thread.find({ parentId: args.threadId });

  const descendantThreads = [];
  for (const childThread of childThreads) {
    const descendants = await fetchAllChildThreads({
      threadId: childThread._id,
    });
    descendantThreads.push(childThread, ...descendants);
  }

  return descendantThreads;
}
