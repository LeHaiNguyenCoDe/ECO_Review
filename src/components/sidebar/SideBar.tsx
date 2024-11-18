"use client";

import React, { useState, useEffect } from "react";
import { getProductCategories } from "@/apis/product-category";
import { ProductCategoryMdl } from "@/models/products/category";
import Image from "next/image";
import { CgMenuRight } from "react-icons/cg";
import Link from "next/link";
import { FaUser, FaBell, FaClipboardList } from "react-icons/fa";
import avatarIcon from "@/public/images/avatar-icon.png";
import { CloseButton } from "@headlessui/react";
import { GrFormClose } from "react-icons/gr";
import { m } from "framer-motion";

interface SideBarProps {
  isAccountPage: boolean;
  isSidebarOpen: boolean;
}

const SideBar = ({ isAccountPage}: SideBarProps) => {
  const [userName, setUserName] = useState<string | null>(null);
  const [productCategories, setProductCategories] = useState<ProductCategoryMdl[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [currentPath, setCurrentPath] = useState<string>(""); // Track the current path

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  // Fetch the product categories and store them in state
  useEffect(() => {
   const fetchCategories = async () => {
     const categories = await getProductCategories();
     if (categories) {
       setProductCategories(categories);
     }
   };
    fetchCategories();
  }, []);

  // Set the current path from localStorage when the component mounts
  useEffect(() => {
    const storedPath = localStorage.getItem("currentPath");
    if (storedPath) {
      setCurrentPath(storedPath);
    } else {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  // Fetch logged-in user from localStorage
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  // Update the current path and store it in localStorage when a link is clicked
  const handleLinkClick = (path: string) => {
    setCurrentPath(path);
    localStorage.setItem("currentPath", path);
  };
  const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex flex-col w-full gap-2 lg:text-[0.75rem]">
      {/* Product Categories List */}
      { !isAccountPage && (
        <div className="flex flex-col w-full gap-2 md:gap-0">
          {/* Sidebar Toggle Icon */}
          <div className="w-full h-12 flex flex-row items-center gap-4 bg-[#1E6B0A] md:bg-white md:shadow-none shadow-inner rounded-md px-3 py-2" onClick={toggleSidebar}>
            <CgMenuRight className={`size-5 text-white/90 md:hidden`} />
            <p className="text-white md:text-black md:font-bold md:text-base lg:text-[0.75rem]">Danh mục sản phẩm</p>
            <CloseButton
                  as={m.div}
                  initial={{ opacity: 0.6 }}
                  whileHover={{ scale: 1.2, transition: { duration: 1 } }}
                  whileTap={{ scale: 0.9 }}
                  whileInView={{ opacity: 1 }}
                  onClick={handleClose} 
                  className="absolute top-5 right-2 text-black hidden md:block"
                >
                  <GrFormClose className="size-7 font-bold" />
            </CloseButton>
          </div>
          <ul className="flex flex-col gap-2 rounded-md p-3 bg-[#FFFFFF] shadow-inner md:shadow-none overflow-x-hidden">
          {productCategories.length > 0 && productCategories.map((category: ProductCategoryMdl) => (
            <li key={category.id}>
              <Link
                href={`/category/${category.id}`}
                onClick={() => handleLinkClick(`/category/${category.id}`)} // Update the current path on click
                className={`flex flex-row w-full content-start p-2 gap-4 items-center hover:bg-green-100 hover:cursor-pointer hover:rounded-md ${
                  currentPath === `/category/${category.id}` ? "text-green-700" : "text-gray-700"
                }`}
              >
                <Image
                  src={category.iconUrl}
                  alt="Product Category Icon"
                  width={24}
                  height={24}
                />
                <span className="block mt-0.5 font-normal">
                  {category.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        </div>
      )}

      {/* Show account management links only if it's an account page */}
      {isAccountPage && (
        <div className="flex flex-col w-full gap-4 p-4">
          {/* User Profile Section */}
          {userName && (
            <div className="w-full h-16 flex flex-row items-center gap-4 bg-green-700 shadow-inner rounded-md px-4 py-2">
              <Image
                src={avatarIcon}
                alt="User Avatar"
                className="rounded-full w-10 h-10"
              />
              <p className="text-white font-medium text-base">{userName}</p>
            </div>
          )}
        
        {/* Account Management Links */}
        <ul className="flex flex-col bg-white rounded-lg shadow p-4 gap-4 xl:pr-0 w-full">
          <li className="flex items-center gap-2">
            <FaUser className="text-green-700" />
            <Link href="/account/profile" onClick={() => handleLinkClick("/account/profile")}>
              <span className={`text-base font-medium xl:text-sm ${
                currentPath === "/account/profile" ? "text-green-700" : "text-gray-700"
              }`}>Quản lý tài khoản</span>
            </Link>
          </li>
          <li className="flex items-center gap-2 pl-8">
            <Link href="/account/profile" onClick={() => handleLinkClick("/account/profile")}>
              <span className={`text-base ${
                currentPath === "/account/profile" ? "text-green-700" : "text-gray-700"
              }`}>Hồ sơ cá nhân</span>
            </Link>
          </li>
          <li className="flex items-center gap-2 pl-8">
            <Link href="/account/address" onClick={() => handleLinkClick("/account/address")}>
              <span className={`text-base ${
                currentPath === "/account/address" ? "text-green-700" : "text-gray-700"
              }`}>Địa chỉ</span>
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <FaClipboardList className="text-gray-700" />
            <Link href="/account/orders" onClick={() => handleLinkClick("/account/orders")}>
              <span className={`text-base ${
                currentPath === "/account/orders" ? "text-green-700" : "text-gray-700"
              }`}>Quản lý đơn hàng</span>
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <FaBell className="text-gray-700" />
            <Link href="/account/notifications" onClick={() => handleLinkClick("/account/notifications")}>
              <span className={`text-base ${
                currentPath === "/account/notifications" ? "text-green-700" : "text-gray-700"
              }`}>Thông báo</span>
            </Link>
          </li>
        </ul>
      </div>
    )}
  </div>
);
};

export default SideBar;
