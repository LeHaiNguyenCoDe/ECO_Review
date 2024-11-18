"use client";

import React, { useState } from "react";

import {
  CloseButton,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { IoMdNotifications } from "react-icons/io";
import Link from "next/link";
import { GrFormClose } from "react-icons/gr";
import { motion as m } from "framer-motion";

export default function Notification({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    setIsActive((prev) => !prev);
  };
  const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsActive(false);
  };

  const handleBlur = () => {
    setIsActive(false);
  };
  return (
    <Popover>
      <PopoverButton className={`p-2 shadow-2xl focus:outline-none ${isActive ? 'bg-emerald-100 text-white' : ''} w-10 h-10 rounded-full flex justify-center items-center data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white`}
      onClick={toggleActive}
      onBlur={handleBlur}>
        <IoMdNotifications className="size-6" 
        style={{
          color: "rgb(30 107 10 / var(--tw-bg-opacity))"}}
        />
      </PopoverButton>
      <PopoverPanel
        transition
        anchor="bottom"
        className="flex flex-col w-96 md:w-full pt-3 px-3 gap-3 rounded-md bg-white text-black text-sm/6 transition duration-200 ease-in-out [--anchor-gap:12px] data-[closed]:-translate-y-1 data-[closed]:opacity-0 z-50"
      >
        <div className="flex flex-row justify-between px-2 items-center text-red-700">
          <p className="text-gray-400 text-base font-light text-left select-none">
            Thông báo mới nhận
          </p>
          <CloseButton
            as={m.div}
            onClick={handleClose}
            initial={{ opacity: 0.6 }}
            whileHover={{
              scale: 1.2,
              transition: { duration: 1 },
            }}
            whileTap={{ scale: 0.9 }}
            whileInView={{ opacity: 1 }}
            className="rounded-full bg-white hover:border-gray-300 hover:border-2 cursor-pointer"
          >
            <GrFormClose className="size-7 md:rounded-full md:border-gray-300 md:border-2" />
          </CloseButton>
        </div>
        {children}
        <Link
          href={""}
          passHref
          className="border-solid border-t border-slate-200 hover:text-green-800"
        >
          <p className="text-center p-2">Xem tất cả</p>
        </Link>
      </PopoverPanel>
    </Popover>
  );
}
