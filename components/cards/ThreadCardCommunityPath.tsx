import React from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDateString } from "@/utils";

import { CommunityT } from "@/types/thread";

interface ThreadCardCommunityPathT {
  community: CommunityT;
  createdAt: string;
}

const ThreadCardCommunityPath: React.FC<ThreadCardCommunityPathT> = ({
  community,
  createdAt,
}) => {
  return (
    <Link
      href={`/communities/${community.id}`}
      className="mt-5 flex items-center"
    >
      <p className="text-subtle-medium text-gray-1">
        {formatDateString(createdAt)}
        &nbsp; &mdash; &nbsp;
        {community.name} Community
      </p>

      <Image
        src={community.image}
        alt={community.name}
        width={14}
        height={14}
        className="ml-1 rounded-full object-cover min-h-[14px] min-w-[14px]"
      />
    </Link>
  );
};

export default ThreadCardCommunityPath;
