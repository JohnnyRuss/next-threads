import React from "react";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { getUser, getActivity } from "@/database/actions/user.actions";

const page: React.FC = async () => {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await getUser({ userId: user.id });
  if (!userInfo.onboarded) return redirect("onboarding");

  const activities = await getActivity({ userId: userInfo._id });

  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        {activities.length > 0 ? (
          <>
            {activities.map((activity) => (
              <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                <article className="activity-card">
                  <figure className="w-5 h-5 rounded-full overflow-hidden relative">
                    <Image
                      src={activity.author.image}
                      fill
                      alt="profile picture"
                      className="object-cover"
                    />
                  </figure>

                  <p className="!text-small-regular text-light-1">
                    <span className="mr-1 text-primary-500">
                      {activity.author.name}
                    </span>
                    &nbsp; replied to your thread
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="no-result">No Activities yet</p>
        )}
      </section>
    </section>
  );
};

export default page;
