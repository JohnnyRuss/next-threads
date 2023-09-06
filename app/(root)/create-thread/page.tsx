import React from "react";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUserShortInfo } from "@/database/actions/user.actions";

import { PostThread } from "@/components/forms";

import { UserShortInfoT } from "@/types/user";
interface CreateThreadT {}

const CreateThread: React.FC<CreateThreadT> = async () => {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");

  const userInfo = (await getUserShortInfo({
    userId: user.id,
  })) as UserShortInfoT | null;
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className="head-text">Create Thread</h1>
      <PostThread userId={userInfo._id.toString()} />
    </>
  );
};

export default CreateThread;
