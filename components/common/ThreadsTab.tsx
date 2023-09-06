import React from "react";
import { redirect } from "next/navigation";

import { ThreadCard } from "@/components/cards";

import { getUserThreads } from "@/database/actions/user.actions";
import { fetchCommunityPosts } from "@/database/actions/community.actions";

import { UserThreadsT } from "@/types/user";
import { CommunityThreadsT } from "@/types/community";
interface ThreadsTabT {
  accountId: string;
  accountType: "community" | "user";
  currentUserId: string;
}

const ThreadsTab: React.FC<ThreadsTabT> = async ({
  accountId,
  accountType,
  currentUserId,
}) => {
  if (!accountId) return redirect("/");

  const data: UserThreadsT | CommunityThreadsT | null =
    accountType === "community"
      ? ((await fetchCommunityPosts({
          communityId: accountId,
        })) as CommunityThreadsT)
      : accountType === "user"
      ? ((await getUserThreads({ userId: accountId })) as UserThreadsT)
      : null;

  return (
    <section className="mt-9 flex flex-col gap-10">
      {data ? (
        data.threads.map((thread) => (
          <ThreadCard
            key={thread._id}
            thread={thread}
            currentUserId={currentUserId}
          />
        ))
      ) : (
        <p>There are no threads</p>
      )}
    </section>
  );
};

export default ThreadsTab;
