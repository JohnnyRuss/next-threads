import React from "react";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUser } from "@/database/actions/user.actions";

import { PostThread } from "@/components/forms";

interface CreateThreadT {}

const CreateThread: React.FC<CreateThreadT> = async () => {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await getUser({ userId: user.id });

  if (!userInfo.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className="head-text">Create Thread</h1>
      <PostThread userId={userInfo._id.toString()} />
    </>
  );
};

export default CreateThread;
