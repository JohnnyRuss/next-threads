import React from "react";
import Image from "next/image";
import { UserInfoT } from "@/types/user";

interface ProfileHeaderT {
  accountId: string;
  userId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
}

const ProfileHeader: React.FC<ProfileHeaderT> = ({
  accountId,
  userId,
  name,
  username,
  bio,
  imgUrl,
}) => {
  return (
    <div className="flex flex-col w-full justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <figure className="relative h-20 w-20">
            <Image src={imgUrl} fill alt={username} className="object-cover" />
          </figure>

          <div className="flex-1">
            <h2 className="text-left text-light-1 text-heading3-bold">
              {name}
            </h2>
            <p className="text-base-medium text-gray-1">@{username}</p>
          </div>
        </div>
      </div>

      <div>Community</div>

      <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>

      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
};

export default ProfileHeader;
