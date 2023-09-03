"use server";

import { FilterQuery, SortOrder } from "mongoose";
import { Thread, User, Community } from "@/database/models";
import ConnectToDB from "@/database/mongoose";

ConnectToDB();

export async function createCommunity(args: {
  id: string;
  name: string;
  username: string;
  image: string;
  bio: string;
  createdById: string;
}) {
  try {
    const user = await User.findOne({ id: args.createdById });

    if (!user) throw new Error("User not found");

    const newCommunity = new Community({
      id: args.id,
      name: args.name,
      username: args.username,
      image: args.image,
      bio: args.bio,
      createdBy: user._id,
    });

    const createdCommunity = await newCommunity.save();

    user.communities.push(createdCommunity._id);
    await user.save();

    return createdCommunity;
  } catch (error) {
    console.error("Error creating community:", error);
    throw error;
  }
}

export async function fetchCommunityDetails(args: { communityId: string }) {
  try {
    const communityDetails = await Community.findOne({
      id: args.communityId,
    }).populate([
      "createdBy",
      {
        path: "members",
        select: "name username image _id id",
      },
    ]);

    return communityDetails;
  } catch (error) {
    console.error("Error fetching community details:", error);
    throw error;
  }
}

export async function fetchCommunityPosts(args: { communityId: string }) {
  try {
    const communityPosts = await Community.findById(args.communityId).populate({
      path: "threads",
      populate: [
        {
          path: "author",
          select: "name image id",
        },
        {
          path: "community",
          select: "name image id",
        },
        {
          path: "children",
          populate: {
            path: "author",
            select: "image _id",
          },
        },
      ],
    });

    return communityPosts;
  } catch (error) {
    console.error("Error fetching community posts:", error);
    throw error;
  }
}

export async function fetchCommunities(args: {
  searchStr?: string;
  page?: number;
  limit?: number;
  sort?: SortOrder;
}) {
  try {
    const searchStr = args.searchStr || "";
    const sort = args.sort || "desc";

    const page = args.page || 1;
    const limit = args.limit || 10;
    const skip = (page - 1) * limit;

    const regex = new RegExp(searchStr || "", "i");

    const query: FilterQuery<typeof Community> = {};

    if (searchStr.trim() !== "")
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];

    const sortOptions = { createdAt: sort };

    const communitiesQuery = Community.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .populate("members");

    const communities = await communitiesQuery.exec();
    const totalCommunitiesCount = await Community.countDocuments(query);

    const hasNextPage = totalCommunitiesCount > skip + limit;

    return { communities, hasNextPage };
  } catch (error) {
    console.error("Error fetching communities:", error);
    throw error;
  }
}

export async function addMemberToCommunity(args: {
  communityId: string;
  memberId: string;
}) {
  try {
    const community = await Community.findOne({ id: args.communityId });

    if (!community) throw new Error("Community not found");

    const user = await User.findOne({ id: args.memberId });

    if (!user) throw new Error("User not found");

    if (community.members.includes(user._id))
      throw new Error("User is already a member of the community");

    community.members.push(user._id);
    await community.save();

    user.communities.push(community._id);
    await user.save();

    return community;
  } catch (error) {
    console.error("Error adding member to community:", error);
    throw error;
  }
}

export async function removeUserFromCommunity(args: {
  userId: string;
  communityId: string;
}) {
  try {
    const userIdObject = await User.findOne({ id: args.userId }, { _id: 1 });
    const communityIdObject = await Community.findOne(
      { id: args.communityId },
      { _id: 1 }
    );

    if (!userIdObject) throw new Error("User not found");

    if (!communityIdObject) throw new Error("Community not found");

    await Community.updateOne(
      { _id: communityIdObject._id },
      { $pull: { members: userIdObject._id } }
    );

    await User.updateOne(
      { _id: userIdObject._id },
      { $pull: { communities: communityIdObject._id } }
    );

    return { success: true };
  } catch (error) {
    console.error("Error removing user from community:", error);
    throw error;
  }
}

export async function updateCommunityInfo(args: {
  communityId: string;
  name: string;
  username: string;
  image: string;
}) {
  try {
    const updatedCommunity = await Community.findOneAndUpdate(
      { id: args.communityId },
      { name: args.name, username: args.username, image: args.image }
    );

    if (!updatedCommunity) throw new Error("Community not found");

    return updatedCommunity;
  } catch (error) {
    console.error("Error updating community information:", error);
    throw error;
  }
}

export async function deleteCommunity(args: { communityId: string }) {
  try {
    const deletedCommunity = await Community.findOneAndDelete({
      id: args.communityId,
    });

    if (!deletedCommunity) throw new Error("Community not found");

    await Thread.deleteMany({ community: args.communityId });

    const communityUsers = await User.find({ communities: args.communityId });

    const updateUserPromises = communityUsers.map((user) => {
      user.communities.pull(args.communityId);
      return user.save();
    });

    await Promise.all(updateUserPromises);

    return deletedCommunity;
  } catch (error) {
    console.error("Error deleting community: ", error);
    throw error;
  }
}
