import React from "react";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs";

import { fetchCommunities } from "@/database/actions/community.actions";
import { getUsers } from "@/database/actions/user.actions";

import { Button } from "@/components/ui/button";

interface RightBarT {}

const RightBar: React.FC<RightBarT> = async () => {
  const user = await currentUser();

  const communities = await fetchCommunities({
    searchStr: "",
    page: 1,
    limit: 5,
    sort: "desc",
  });

  const users = await getUsers({
    searchStr: "",
    userId: user?.id || "",
    page: 1,
    limit: 5,
    sort: "desc",
  });

  return (
    <aside className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1 w-full text-center">
          Suggested Communities
        </h3>

        <div className="mt-5 flex flex-col gap-4">
          {communities.communities.length > 0 ? (
            communities.communities.map((community) => (
              <div
                key={`rightbar-${community._id}`}
                className="flex items-center gap-3"
              >
                <figure className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={community.image}
                    fill
                    alt={community.name}
                    className="object-cover"
                  />
                </figure>

                <div className="flex flex-col text-light-1 text-sm">
                  <span className="text-ellipsis">{community.name}</span>
                  <span className="text-xs text-gray-500">
                    Public Community
                  </span>
                </div>

                <Button
                  className="bg-primary-500 h-8 px-2 ml-auto cursor-none disabled:opacity-100"
                  disabled={true}
                >
                  Join
                </Button>
              </div>
            ))
          ) : (
            <p className="no-result">No Communities Found</p>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1 w-full text-center">
          Suggested Users
        </h3>

        <div className="mt-5 flex flex-col gap-4">
          {users.users.length > 0 ? (
            users.users.map((user) => (
              <div
                key={`rightbar-${user._id}`}
                className="flex items-center gap-3"
              >
                <figure className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={user.image}
                    fill
                    alt={user.name}
                    className="object-cover"
                  />
                </figure>

                <div className="flex flex-col text-light-1 text-sm">
                  <span className="text-ellipsis">{user.name}</span>
                  <span className="text-xs text-gray-500">
                    @{user.username}
                  </span>
                </div>

                <Button
                  className="bg-primary-500 h-8 px-2 ml-auto cursor-none disabled:opacity-100"
                  disabled={true}
                >
                  Follow
                </Button>
              </div>
            ))
          ) : (
            <p className="no-result">No Users Found</p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default RightBar;
