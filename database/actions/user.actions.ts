"use server";

import ConnectToDB from "@/database/mongoose";
import { User } from "@/database/models";
import { UserT } from "@/types/user";
import { UpdateUserParamsT } from "@/types/user";

import { revalidatePath } from "next/cache";

export async function updateUser(params: UpdateUserParamsT): Promise<void> {
  try {
    await ConnectToDB();

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

export async function getUser(params: { userId: string }): Promise<UserT> {
  try {
    await ConnectToDB();

    const user = await User.findOne({ id: params.userId });
    // .populate({
    //   path: "communities",
    // });

    if (!user) throw new Error("user does not exists");

    return user;
  } catch (error) {
    throw error;
  }
}
