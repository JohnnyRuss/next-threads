import React from "react";

import { CommunityCard } from "@/components/cards";
import { SearchBar } from "@/components/common";

import { fetchCommunities } from "@/database/actions/community.actions";

import { AllCommunitiesT } from "@/types/community";
interface CommunitiesT {
  searchParams: { search: string };
}

const Communities: React.FC<CommunitiesT> = async ({
  searchParams: { search },
}) => {
  const data = (await fetchCommunities({
    searchStr: search,
    page: 1,
    limit: 10,
    sort: "desc",
  })) as { communities: AllCommunitiesT[]; hasNextPage: boolean };

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      <SearchBar />

      <div className="mt-14 flex flex-col gap-9">
        {data.communities.length === 0 ? (
          <p className="no-result">No Communities</p>
        ) : (
          data.communities.map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))
        )}
      </div>
    </section>
  );
};

export default Communities;
