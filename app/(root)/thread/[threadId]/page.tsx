import React from "react";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import { getUserShortInfo } from "@/database/actions/user.actions";
import { getThread } from "@/database/actions/thread.actions";

import { ThreadCard } from "@/components/cards";
import { CommentForm } from "@/components/forms";

import { UserShortInfoT } from "@/types/user";
import { ActiveThreadT, ThreadCardInfoT } from "@/types/thread";
interface pageT {
  params: {
    threadId: string;
  };
}

const Thread: React.FC<pageT> = async ({ params: { threadId } }) => {
  if (!threadId) return null;

  const user = await currentUser();
  if (!user) return redirect("/sign-in");

  const userInfo: UserShortInfoT = await getUserShortInfo({ userId: user.id });
  if (!userInfo?.onboarded) return redirect("/onboarding");

  const thread = (await getThread({ threadId })) as ActiveThreadT;

  return (
    <section className="relative">
      <div>
        <ThreadCard
          thread={thread as ThreadCardInfoT}
          currentUserId={userInfo?._id?.toString() || ""}
        />
      </div>

      <div className="mt-7">
        <CommentForm
          threadId={thread._id.toString()}
          currentUserImage={userInfo?.image || user.imageUrl || ""}
          currentUserId={userInfo._id?.toString() || ""}
        />
      </div>

      <div className="mt-10">
        {thread.children.map((child) => (
          <ThreadCard
            key={child._id}
            thread={child as ThreadCardInfoT}
            isComment={true}
            currentUserId={userInfo?._id?.toString() || ""}
          />
        ))}
      </div>
    </section>
  );
};

export default Thread;
