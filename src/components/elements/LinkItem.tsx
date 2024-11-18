"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type LinkItemProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
};

const LinkItem = ({ children, href, className }: LinkItemProps) => {
  const pathname = usePathname();

  const isActive = pathname === `/${href}`;
  return (
    <Link
      href={`${href}`}
      className={
        `${
          className ? className + " " : ""
        } flex items-center px-2 h-full hover:border-[#B95A30] hover:border-b-2 hover:text-[#B95A30]  hover:shadow-sm` +
        (isActive ? "text-[#B95A30] border-b-2 border-[#B95A30]" : "")
      }
      passHref
    >
      {children}
    </Link>
  );
};

export default LinkItem;
