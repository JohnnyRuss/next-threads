"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BaseNavLinkT } from "@/types";
import { isActiveLink } from "@/utils";

interface NavLinkItemT {
  link: BaseNavLinkT;
  linkClasses?: string;
  labelStyles?: string;
  imgSize?: number;
}

const NavLinkItem: React.FC<NavLinkItemT> = ({
  link,
  linkClasses,
  labelStyles,
  imgSize = 24,
}) => {
  const pathname = usePathname();
  const isActive = isActiveLink({ url: link.route, pathname });

  return (
    <Link
      href={link.route}
      key={link.route}
      className={`${isActive && "bg-primary-500"} ${linkClasses || ""}`}
    >
      <Image
        src={link.imgURL}
        alt={link.label}
        width={imgSize}
        height={imgSize}
        className="object-contain"
      />
      <span className={`${labelStyles || ""} line-clamp-1 text-center`}>
        {link.label}
      </span>
    </Link>
  );
};

export default NavLinkItem;
