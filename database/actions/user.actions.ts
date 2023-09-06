"use server";

import { SortOrder, FilterQuery } from "mongoose";
import ConnectToDB from "@/database/mongoose";
import { Thread, User } from "@/database/models";
import { UserT } from "@/types/user";
import { UpdateUserParamsT } from "@/types/user";

import { revalidatePath } from "next/cache";

ConnectToDB();

export async function updateUser(params: UpdateUserParamsT): Promise<void> {
  try {
    await User.findOneAndUpdate(
      { id: params.userId },
      {
        username: params.username.toLocaleLowerCase(),
        name: params.name,
        bio: params.bio,
        image: params.image,
        onboarded: true,
      },
      { upsert: true }
    );

    if (params.path === "/profile/edit") revalidatePath(params.path);
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function getUserShortInfo(params: { userId: string }) {
  try {
    const user = await User.findOne({ id: params.userId }).select(
      "image username name bio id onboarded"
    );

    return user;
  } catch (error) {
    throw error;
  }
}

export async function getUser(params: { userId: string }) {
  try {
    const user = await User.findOne({ id: params.userId }).populate({
      path: "communities",
    });

    return user;
  } catch (error) {
    throw error;
  }
}

export const getUserThreads = async (args: { userId: string }) => {
  try {
    const threads = await User.findOne({ id: args.userId }).populate({
      path: "threads",
      populate: [
        {
          path: "community",
          select: "name id image _id",
        },
        {
          path: "author",
          select: "id _id name username image",
        },
        {
          path: "children",
          populate: {
            path: "author",
            select: "name image id _id",
          },
        },
      ],
    });

    return threads;
  } catch (error) {
    throw new Error("Failed to get threads.");
  }
};

export const getUsers = async (args: {
  userId: string;
  searchStr?: string;
  page?: number;
  limit?: number;
  sort?: SortOrder;
}): Promise<{ hasNextPage: boolean; users: UserT[] }> => {
  try {
    const limit = args.limit || 20;
    const page = args.page || 1;
    const skip = (page - 1) * limit;
    const regex = new RegExp(args.searchStr || "", "i");

    const query: FilterQuery<typeof User> = { id: { $ne: args.userId } };

    if (args.searchStr?.trim() !== "")
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];

    const sortOpt = { createdAt: args.sort || "desc" };

    const userQuery = User.find(query).sort(sortOpt).skip(skip).limit(limit);

    const users = await userQuery.exec();
    const totalUsersCount = await User.countDocuments(query);

    const hasNextPage = totalUsersCount > skip + limit;

    return { users, hasNextPage };
  } catch (error) {
    throw error;
  }
};

export const getActivity = async (args: { userId: string }) => {
  try {
    const userThreads = await Thread.find({ author: args.userId });

    const childrenIds = userThreads.reduce(
      (acc, userThread) => acc.concat(userThread.children),
      []
    );

    const replies = await Thread.find({
      _id: { $in: childrenIds },
      author: { $ne: args.userId },
    }).populate({
      path: "author",
      select: "name image _id id",
    });

    return replies;
  } catch (error) {
    throw error;
  }
};
