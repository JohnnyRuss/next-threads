import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AllThreadsChildrenT } from "@/types/thread";

interface ThreadCardRepliesOnMainT {
  threadChildren: AllThreadsChildrenT[];
  threadId: string;
}

const ThreadCardRepliesOnMain: React.FC<ThreadCardRepliesOnMainT> = ({
  threadChildren,
  threadId,
}) => {
  const lastTwoReplyAuthorIds = Array.from(
    new Set(threadChildren.map((child) => child._id))
  ).slice(0, 2);

  const lastTwoReplyAuthorImages = threadChildren
    .filter((child) => lastTwoReplyAuthorIds.includes(child._id))
    .map((child) => child.author.image);

  return (
    <div className="absolute bottom-0 flex items-center gap-4 w-max left-0">
      <div className="flex">
        {lastTwoReplyAuthorImages.map((imgUrl, i) => (
          <figure
            key={`imgUrl-${imgUrl}`}
            className={`w-8 h-8 relative rounded-full overflow-hidden ${
              i > 0 ? "-ml-5" : ""
            }`}
          >
            <Image
              src={imgUrl}
              alt={imgUrl}
              fill
              className="object-cover cursor-pointer "
            />
          </figure>
        ))}
      </div>

      <Link href={`/thread/${threadId}`}>
        <p className="mt-1 text-subtle-medium text-gray-1">
          {threadChildren.length} replies
        </p>
      </Link>
    </div>
  );
};

export default ThreadCardRepliesOnMain;
