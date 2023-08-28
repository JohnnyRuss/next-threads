import React from "react";

import { sidebarLinks } from "@/config/constants";
import { ClerkSignOut } from "@/components/clerk";
import NavLinkItem from "@/components/common/NavLinkItem";

interface LeftBarT {}

const LeftBar: React.FC<LeftBarT> = () => {
  return (
    <aside className="custom-scrollbar leftsidebar">
      <div className="flex flex-col w-full flex-1 gap-4 px-6">
        {sidebarLinks.map((link) => (
          <NavLinkItem
            key={`left_bar__${link.label}`}
            link={link}
            linkClasses="leftsidebar_link"
            labelStyles="text-light-1 max-lg:hidden"
          />
        ))}
      </div>

      <div className="mt-10 px-6">
        <ClerkSignOut withCaption={true} />
      </div>
    </aside>
  );
};

export default LeftBar;
