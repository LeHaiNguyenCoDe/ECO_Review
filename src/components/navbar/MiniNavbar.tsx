"use client";

import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      stiffness: 100,
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export default function MiniNavbar() {
  return (
    <nav className="relative block h-8 text-[0.65rem] text-white w-full bg-[#1E6B0A]">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative h-full max-w-[2560px] flex items-center mx-auto md:flex md:flex-col"
      >
        {/* Phần bên trái chứa hai link */}
        <motion.div variants={item} className="flex h-full items-center space-x-4 px-7">
          <Link href="/seller/auth/login" className="text-white text-sm xl:text-xs">Kênh người bán</Link>
          <span>|</span>
          <Link href="/seller/auth/register" className="text-white text-sm xl:text-xs">Trở thành người bán</Link>
        </motion.div>
        
        {/* Phần giữa chứa văn bản */}
        <motion.div variants={item} className="absolute left-1/2 transform -translate-x-1/2 md:hidden h-full flex items-center px-7">
          <p className="text-[16px]">Sức khoẻ - tiện ích cho mọi nhà</p>
        </motion.div>
      </motion.div>
    </nav>
  );
}
