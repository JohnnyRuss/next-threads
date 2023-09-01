import React from "react";
import { AllThreadT } from "@/types/thread";
import Link from "next/link";
import Image from "next/image";

interface ThreadCardT {
  thread: AllThreadT;
  currentUserId: string;
  isComment?: boolean;
}

const ThreadCard: React.FC<ThreadCardT> = ({
  thread,
  currentUserId,
  isComment,
}) => {
  return (
    <article
      className={`flex w-full flex-col rounded-xl  ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
      }`}
    >
      <div className="flex items-start justify-between ">
        <div className="flex-1 flex flex-row w-full gap-4">
          <figure className="flex flex-col items-center">
            <Link
              href={`/profile/${thread.author.id}`}
              className="relative h-11 w-11"
            >
              <Image
                src={thread.author.image}
                fill
                alt={thread.author.username}
                className="object-contain cursor-pointer rounded-full"
              />
            </Link>

            <div className="thread-card_bar" />
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
              className={`mt-5 flex flex-col gap-3 ${isComment ? "" : "mb-10"}`}
            >
              <div className="flex gap-3.5">
                <Image
                  src="/assets/heart-gray.svg"
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                />

                <Link href={`/thread/${thread._id}`}>
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

              {isComment && thread.children.length > 0 && (
                <Link href={`/thread/${thread._id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {thread.children.length} replies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ThreadCard;
