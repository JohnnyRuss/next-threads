"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UserT } from "@/types/user";

import { Button } from "@/components/ui/button";

interface UserCardT {
  user: UserT;
  personType: string;
}

const UserCard: React.FC<UserCardT> = ({ user }) => {
  const router = useRouter();

  return (
    <article className="user-card">
      <figure className="user-card_avatar">
        <Image
          src={user.image}
          alt="logo"
          width={48}
          height={48}
          className="rounded-full min-h-[48px]"
        />
        <figcaption className="flex-1 text-ellipsis">
          <h4 className="text-base-semibold text-light-1">{user.name}</h4>
          <span className="text-sm-medium text-gray-1">@{user.username}</span>
        </figcaption>
      </figure>

      <Button
        className="user-card_btn"
        onClick={() => router.push(`/profile/${user.id}`)}
      >
        View
      </Button>
    </article>
  );
};

export default UserCard;
