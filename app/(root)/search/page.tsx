import React from "react";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import { UserCard } from "@/components/cards";
import { SearchBar } from "@/components/common";

import { getUser, getUsers } from "@/database/actions/user.actions";

interface SearchT {
  searchParams: { search: string };
}

const Search: React.FC<SearchT> = async ({ searchParams: { search } }) => {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await getUser({ userId: user.id });
  if (!userInfo.onboarded) return redirect("onboarding");

  const data = await getUsers({
    searchStr: search,
    userId: user.id,
    page: 1,
    limit: 20,
    sort: "desc",
  });

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      <SearchBar />

      <div className="mt-14 flex flex-col gap-9">
        {data.users.length === 0 ? (
          <p className="no-result">No Users</p>
        ) : (
          <>
            {data.users.map((person) => (
              <UserCard key={person._id} user={person} personType="User" />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Search;
