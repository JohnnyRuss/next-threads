import React from "react";
import Image from "next/image";
import Link from "next/link";

import { UserT } from "@/types/user";
interface UserCardT {
  user: UserT;
  personType: string;
}

const UserCard: React.FC<UserCardT> = ({ user, personType }) => {
  return (
    <article className="user-card">
      <figure className="user-card_avatar">
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          <Image src={user.image} alt="logo" fill className="object-cover" />
        </div>

        <figcaption className="flex-1 text-ellipsis">
          <h4 className="text-base-semibold text-light-1">{user.name}</h4>
          <span className="text-sm-medium text-gray-1">@{user.username}</span>
        </figcaption>
      </figure>

      <Link
        className="user-card_btn flex items-center justify-center py-2"
        href={
          personType === "community"
            ? `/communities/${user._id}`
            : `/profile/${user.id}`
        }
      >
        View
      </Link>
    </article>
  );
};

export default UserCard;
