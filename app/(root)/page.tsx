import React from "react";
import { currentUser } from "@clerk/nextjs";

import { getThreads } from "@/database/actions/thread.actions";
import { getUserShortInfo } from "@/database/actions/user.actions";

import { ThreadCard } from "@/components/cards";

import { ThreadCardInfoT } from "@/types/thread";

const Home: React.FC = async () => {
  const user = await currentUser();

  const userInfo = await getUserShortInfo({ userId: user?.id || "" });

  const data = (await getThreads({
    pageNumber: 1,
    limit: 20,
  })) as { threads: ThreadCardInfoT[]; hasNextPage: boolean };

  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {data.threads.length === 0 ? (
          <p className="no-result">No Threads Found</p>
        ) : (
          <>
            {data.threads.map((thread) => (
              <ThreadCard
                key={thread._id}
                currentUserId={userInfo?._id?.toString() || ""}
                thread={thread}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
};

export default Home;
