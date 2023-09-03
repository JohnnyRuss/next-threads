import React from "react";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import { CommunityCard } from "@/components/cards";
import { SearchBar } from "@/components/common";

import { getUser } from "@/database/actions/user.actions";
import { fetchCommunities } from "@/database/actions/community.actions";

import { CommunityCardT } from "@/types/community";
interface CommunitiesT {
  searchParams: { search: string };
}

const Communities: React.FC<CommunitiesT> = async ({
  searchParams: { search },
}) => {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await getUser({ userId: user.id });
  if (!userInfo.onboarded) return redirect("onboarding");

  const data = await fetchCommunities({
    searchStr: search,
    page: 1,
    limit: 10,
    sort: "desc",
  });

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      <SearchBar />

      <div className="mt-14 flex flex-col gap-9">
        {data.communities.length === 0 ? (
          <p className="no-result">No Communities</p>
        ) : (
          data.communities.map((community) => (
            <CommunityCard
              key={community.id}
              community={community as CommunityCardT}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Communities;
