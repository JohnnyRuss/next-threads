"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { useAuth } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { reactOnThread } from "@/database/actions/thread.actions";

interface ThreadCardActionsT {
  threadId: string;
  currentUserId: string;
  reactions: string[];
}

const ThreadCardActions: React.FC<ThreadCardActionsT> = ({
  threadId,
  currentUserId,
  reactions,
}) => {
  const { isSignedIn } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  async function onReact() {
    if (!isSignedIn || !currentUserId) return router.push("/sign-in");

    await reactOnThread({
      userId: currentUserId,
      threadId: threadId,
      path: pathname,
    });
  }

  return (
    <div className="flex gap-3.5">
      <button onClick={onReact}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.67452 4.01961C3.90169 4.82998 2.60293 6.75746 2.60293 9.05591C2.60293 11.4041 3.56385 13.2141 4.94137 14.7652C6.07672 16.0436 7.45108 17.1032 8.79144 18.1365C9.10979 18.382 9.42622 18.6259 9.73708 18.871C10.2992 19.3141 10.8006 19.703 11.284 19.9855C11.7676 20.268 12.1568 20.3971 12.4877 20.3971C12.8185 20.3971 13.2078 20.268 13.6913 19.9855C14.1747 19.703 14.6761 19.3141 15.2382 18.871C15.5491 18.6259 15.8655 18.382 16.1839 18.1365C17.5242 17.1032 18.8986 16.0436 20.0339 14.7652C21.4115 13.2141 22.3724 11.4041 22.3724 9.05591C22.3724 6.75746 21.0736 4.82998 19.3008 4.01961C17.5785 3.23234 15.2643 3.44083 13.0651 5.72571C12.914 5.88268 12.7055 5.97138 12.4877 5.97138C12.2698 5.97138 12.0613 5.88268 11.9102 5.72571C9.71102 3.44083 7.39683 3.23234 5.67452 4.01961ZM12.4877 4.05661C10.017 1.84609 7.25031 1.53686 5.00814 2.56177C2.64002 3.64424 1 6.15775 1 9.05591C1 11.9044 2.1867 14.0773 3.74284 15.8296C4.98902 17.2328 6.51431 18.4073 7.86142 19.4445C8.16679 19.6796 8.463 19.9077 8.74473 20.1298C9.29212 20.5613 9.87974 21.0214 10.4753 21.3694C11.0705 21.7173 11.7499 22 12.4877 22C13.2254 22 13.9048 21.7173 14.5001 21.3694C15.0956 21.0214 15.6832 20.5613 16.2306 20.1298C16.5123 19.9077 16.8085 19.6796 17.1139 19.4445C18.461 18.4073 19.9863 17.2328 21.2325 15.8296C22.7886 14.0773 23.9753 11.9044 23.9753 9.05591C23.9753 6.15775 22.3353 3.64424 19.9672 2.56177C17.725 1.53686 14.9584 1.84609 12.4877 4.05661Z"
            fill={reactions.includes(currentUserId) ? "rgb(239 68 68)" : "#fff"}
          />
        </svg>
      </button>

      <Link href={`/thread/${threadId}`}>
        <Image
          src="/assets/reply.svg"
          alt="reply"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      </Link>

      {/* <Image
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
      /> */}
    </div>
  );
};

export default ThreadCardActions;
