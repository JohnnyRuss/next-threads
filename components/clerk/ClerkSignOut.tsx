"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SignedIn, SignOutButton } from "@clerk/nextjs";

interface ClerkSignOutT {
  withCaption?: boolean;
}

const ClerkSignOut: React.FC<ClerkSignOutT> = ({ withCaption = false }) => {
  const router = useRouter();

  return (
    <SignedIn>
      <SignOutButton signOutCallback={() => router.push("/")}>
        <div className={`flex cursor-pointer ${withCaption && "gap-4 p-4"}`}>
          <Image src="/assets/logout.svg" alt="logout" width={24} height={24} />

          {withCaption && (
            <span className="text-light-2 max-lg:hidden">Logout</span>
          )}
        </div>
      </SignOutButton>
    </SignedIn>
  );
};

export default ClerkSignOut;
