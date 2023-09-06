import React from "react";
import { currentUser } from "@clerk/nextjs";

import { UserCard } from "@/components/cards";
import { SearchBar } from "@/components/common";

import { getUsers } from "@/database/actions/user.actions";

import { UserT } from "@/types/user";
interface SearchT {
  searchParams: { search: string };
}

const Search: React.FC<SearchT> = async ({ searchParams: { search } }) => {
  const user = await currentUser();

  const data = (await getUsers({
    searchStr: search,
    userId: user?.id || "",
    page: 1,
    limit: 20,
    sort: "desc",
  })) as { users: UserT[]; hasNextPage: boolean };

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      <SearchBar />

      <div className="mt-14 flex flex-col gap-9">
        {data?.users.length === 0 ? (
          <p className="no-result">No Users</p>
        ) : (
          <>
            {data?.users.map((person) => (
              <UserCard key={person._id} user={person} personType="User" />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Search;
