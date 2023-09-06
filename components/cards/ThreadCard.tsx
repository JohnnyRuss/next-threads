import React from "react";
import Link from "next/link";
import Image from "next/image";

import ThreadCardActions from "./ThreadCardActions";
import ThreadCardCommunityPath from "./ThreadCardCommunityPath";
import ThreadCardRepliesOnMain from "./ThreadCardRepliesOnMain";

import { ThreadCardInfoT } from "@/types/thread";
interface ThreadCardT {
  thread: ThreadCardInfoT | null;
  isComment?: boolean;
  currentUserId?: string;
}

const ThreadCard: React.FC<ThreadCardT> = ({
  thread,
  isComment,
  currentUserId,
}) => {
  return (
    thread && (
      <article
        className={`flex w-full flex-col rounded-xl  ${
          isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
        }`}
      >
        <div className="flex items-start justify-between ">
          <div className="flex-1 flex flex-row w-full gap-4">
            <figure className="flex flex-col items-center relative">
              <Link
                href={`/profile/${thread?.author?.id}`}
                className="relative h-11 w-11 rounded-full overflow-hidden"
              >
                <Image
                  src={thread.author.image || ""}
                  fill
                  alt={thread.author.name || ""}
                  className="object-cover cursor-pointer "
                />
              </Link>

              <div className="thread-card_bar" />

              {!isComment && thread.children.length > 0 && (
                <ThreadCardRepliesOnMain
                  threadChildren={thread.children || []}
                  threadId={thread._id.toString() || ""}
                />
              )}
            </figure>

            <div className="flex w-full flex-col">
              <Link href={`/profile/${thread.author.id}`} className="w-fit">
                <h4 className="cursor-pointer text-base-semibold text-light-1">
                  {thread.author.name}
                </h4>
              </Link>

              <p className="mt-2 text-small-regular text-light-2">
                {thread.text}
              </p>

              <div
                className={`mt-5 flex flex-col gap-3 ${
                  isComment ? "mb-10" : "mb-8"
                }`}
              >
                <ThreadCardActions
                  threadId={thread._id.toString() || ""}
                  currentUserId={currentUserId || ""}
                  reactions={thread.reactions}
                />

                {isComment && thread.children.length > 0 && (
                  <Link href={`/thread/${thread._id.toString()}`}>
                    <p className="mt-1 text-subtle-medium text-gray-1">
                      {thread.children.length} replies
                    </p>
                  </Link>
                )}
              </div>
            </div>
          </div>
          {/* // 1.delete thread // 2.show replies num */}
        </div>

        {!isComment && thread.community && (
          <ThreadCardCommunityPath
            community={thread.community}
            createdAt={thread.createdAt}
          />
        )}
      </article>
    )
  );
};

export default ThreadCard;
