import React from "react";
import Link from "next/link";
import Image from "next/image";

interface ThreadCardActionsT {
  threadId: string;
}

const ThreadCardActions: React.FC<ThreadCardActionsT> = ({ threadId }) => {
  return (
    <div className="flex gap-3.5">
      <Image
        src="/assets/heart-gray.svg"
        alt="heart"
        width={24}
        height={24}
        className="cursor-pointer"
      />

      <Link href={`/thread/${threadId}`}>
        <Image
          src="/assets/reply.svg"
          alt="reply"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      </Link>

      <Image
        src="/assets/repost.svg"
        alt="repost"
        width={24}
        height={24}
        className="cursor-pointer"
      />

      <Image
        src="/assets/share.svg"
        alt="share"
        width={24}
        height={24}
        className="cursor-pointer"
      />
    </div>
  );
};

export default ThreadCardActions;
