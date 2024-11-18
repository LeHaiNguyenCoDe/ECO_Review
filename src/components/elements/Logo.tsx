"use client";

import React from "react";
import Image from "next/image";
import logoHHB from "@/public/images/logo-hhb.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Logo = ({ className }: { className?: string }) => {
  const route = useRouter();

  return (
    <Link
      aria-label="logo hhb, click to go to the homepage"
      href="/"
      className={`flex items-center justify-center h-full ${className}`} // Add className here
      onClick={() => route.push("/")}
    >
      <Image src={logoHHB} alt="logo HHB" />
    </Link>
  );
};

export default Logo;
