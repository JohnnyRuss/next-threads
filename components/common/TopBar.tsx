import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ClerkSignOut, ClerkOrganizationSwitcher } from "@/components/clerk";

interface TopBarT {}

const TopBar: React.FC<TopBarT> = () => {
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/assets/logo.svg" alt="threads" width={28} height={28} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">Threads</p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <ClerkSignOut />
        </div>

        <ClerkOrganizationSwitcher />
      </div>
    </nav>
  );
};

export default TopBar;
