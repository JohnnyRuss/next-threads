import React from "react";
import { currentUser } from "@clerk/nextjs";

import { getThreads } from "@/database/actions/thread.actions";

import { ThreadCard } from "@/components/cards";

import { AllThreadT } from "@/types/thread";
interface HomeT {}

const Home: React.FC<HomeT> = async () => {
  const user = await currentUser();

  const data = (await getThreads({
    pageNumber: 1,
    limit: 20,
  })) as { threads: AllThreadT[]; hasNextPage: boolean };

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
                currentUserId={user?.id || ""}
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
