import React from "react";
import { redirect } from "next/navigation";

import { ThreadCard } from "@/components/cards";

import { getUserThreads } from "@/database/actions/user.actions";

import { AllThreadT } from "@/types/thread";
interface ThreadsTabT {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const ThreadsTab: React.FC<ThreadsTabT> = async ({
  accountId,
  accountType,
  currentUserId,
}) => {
  let data = await getUserThreads({ userId: accountId });

  if (!data) return redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {data.threads.map((thread: AllThreadT) => (
        <ThreadCard
          key={thread._id}
          currentUserId={currentUserId}
          thread={thread}
        />
      ))}
    </section>
  );
};

export default ThreadsTab;
