import React from "react";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import { getUser } from "@/database/actions/user.actions";
import { getThread } from "@/database/actions/thread.actions";

import { ThreadCard } from "@/components/cards";
import { CommentForm } from "@/components/forms";

import { AllThreadT } from "@/types/thread";

interface pageT {
  params: {
    threadId: string;
  };
}

const Thread: React.FC<pageT> = async ({ params: { threadId } }) => {
  if (!threadId) return null;

  const user = await currentUser();

  if (!user) return null;

  const userInfo = await getUser({ userId: user.id });
  if (!userInfo.onboarded) return redirect("onboarding");

  const thread = await getThread({ threadId });

  return (
    <section className="relative">
      <div>
        <ThreadCard thread={thread} currentUserId={user.id} />
      </div>

      <div className="mt-7">
        <CommentForm
          threadId={thread._id}
          currentUserImage={userInfo.image}
          currentUserId={userInfo._id.toString()}
        />
      </div>

      <div className="mt-10">
        {thread.children.map((child: AllThreadT) => (
          <ThreadCard
            key={child._id}
            thread={child}
            currentUserId={user.id}
            isComment={true}
          />
        ))}
      </div>
    </section>
  );
};

export default Thread;
