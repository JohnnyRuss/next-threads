import React from "react";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";

import { sidebarLinks } from "@/config/constants";
import { ClerkSignOut } from "@/components/clerk";
import NavLinkItem from "@/components/common/NavLinkItem";

import { unAuthorizedRoutes } from "@/config/constants";

const LeftBar: React.FC = async () => {
  const user = await currentUser();

  return (
    <aside className="custom-scrollbar leftsidebar">
      <div className="flex flex-col w-full flex-1 gap-4 px-6">
        {sidebarLinks
          .filter((link) =>
            user ? link : unAuthorizedRoutes.includes(link.route)
          )
          .map((link) => (
            <NavLinkItem
              key={`left_bar__${link.label}`}
              link={link}
              linkClasses="leftsidebar_link"
              labelStyles="text-light-1 max-lg:hidden"
              userId={user?.id || ""}
            />
          ))}
      </div>

      <div className="mt-10 px-6">
        <ClerkSignOut withCaption={true} />
      </div>

      {!user && (
        <div className="mt-10 px-6 text-white">
          <Link href="sign-in">Sign in</Link>
        </div>
      )}
    </aside>
  );
};

export default LeftBar;
