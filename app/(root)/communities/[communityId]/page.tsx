import React from "react";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs";

import { UserCard } from "@/components/cards";
import { ProfileHeader, ThreadsTab } from "@/components/common";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";

import { communityTabs } from "@/config/constants";
import { fetchCommunityDetails } from "@/database/actions/community.actions";

import { UserT } from "@/types/user";
interface pageT {
  params: {
    communityId: string;
  };
}

const Community: React.FC<pageT> = async ({ params: { communityId } }) => {
  if (!communityId) return null;

  const user = await currentUser();
  if (!user) return null;

  const communityDetails = await fetchCommunityDetails({ communityId });

  return (
    <section>
      <ProfileHeader
        accountId={communityDetails.id}
        userId={communityDetails._id}
        imgUrl={communityDetails.image}
        name={communityDetails.name}
        username={communityDetails.username}
        bio={communityDetails.bio}
        type="Community"
      />

      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {communityTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                <Image
                  src={tab.icon}
                  alt="tab"
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>

                {tab.label === "Threads" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                    {communityDetails?.threads?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="threads" className="w-full text-light-1">
            <ThreadsTab
              currentUserId={user.id}
              accountId={communityDetails._id}
              accountType="community"
            />
          </TabsContent>

          <TabsContent value="members" className="w-full text-light-1">
            <section className="mt-9 flex flex-col gap-10">
              {communityDetails.members.map((member: UserT) => (
                <UserCard
                  key={`member__${member.id}`}
                  user={member}
                  personType="user"
                />
              ))}
            </section>
          </TabsContent>

          <TabsContent value="requests" className="w-full text-light-1">
            <ThreadsTab
              currentUserId={user.id}
              accountId={communityDetails._id}
              accountType="community"
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Community;
