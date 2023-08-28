import React from "react";
import Link from "next/link";
import Image from "next/image";

import { sidebarLinks } from "@/config/constants";

import NavLinkItem from "@/components/common/NavLinkItem";

interface BottomBarT {}

const BottomBar: React.FC<BottomBarT> = () => {
  return (
    <footer className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((link) => (
          <NavLinkItem
            key={`footer__${link.label}`}
            link={link}
            linkClasses="bottombar_link"
            labelStyles="text-[12px] font-semibold leading-2 text-light-1 max-sm:hidden"
          />
        ))}
      </div>
    </footer>
  );
};

export default BottomBar;
