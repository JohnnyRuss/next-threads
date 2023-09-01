import React from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import { ProfileHeader, ThreadsTab } from "@/components/common";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";

import { profileTabs } from "@/config/constants";

import { getUser } from "@/database/actions/user.actions";
import { UserT } from "@/types/user";

interface pageT {
  params: {
    userId: string;
  };
}

const Profile: React.FC<pageT> = async ({ params: { userId } }) => {
  if (!userId) return null;

  const user = await currentUser();

  if (!user) return null;

  const userInfo = (await getUser({ userId: userId })) as UserT;
  if (!userInfo.onboarded) return redirect("onboarding");

  return (
    <section>
      <ProfileHeader
        accountId={userId}
        userId={userInfo._id}
        imgUrl={userInfo.image}
        name={userInfo.name}
        username={userInfo.username}
        bio={userInfo.bio}
      />

      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab) => (
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
                    {userInfo?.threads?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {profileTabs.map((tab) => (
            <TabsContent
              key={`${tab.label}_content`}
              value={tab.value}
              className="w-full text-light-1"
            >
              <ThreadsTab
                currentUserId={user.id}
                accountId={userInfo.id}
                accountType="user"
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Profile;
