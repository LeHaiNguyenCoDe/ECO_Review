"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Logo from "@/components/elements/Logo";
import SearchBar from "./SearchBar";
import { Link } from "lucide-react";
import ShoppingCartPopup from "./ShoppingCartPopup";
import Login from "../auth/Login";
import Notification from "../elements/Notification";
import Language from "../elements/Language";
import { CiMenuBurger } from "react-icons/ci";

export default function Navbar() {
  const pathname = usePathname();
  // Update path checks for seller routes
  const isLogin = pathname === "/seller/auth/login";
  const isRegister = pathname === "/seller/auth/register";
  const isSellerChannel = pathname.startsWith("/seller"); // This remains to check if we are in the seller context

  return (
    <div>
      <header className="grid grid-cols-8 items-center px-8 py-4 bg-white shadow-sm md:hidden">
        {/* Logo and Title */}
        <div className="col-span-1 flex items-center space-x-5">
          <div
            className="flex-shrink-0"
            style={{
              width: isLogin || isRegister ? "60px" : "112px",
              height: isLogin || isRegister ? "20px" : "40px",
            }}
          >
            <Logo />
          </div>
          {isLogin && (
            <h1 className="text-lg font-bold text-gray-900 whitespace-nowrap">Kênh người bán</h1>
          )}
          {isRegister && (
            <h1 className="text-lg font-bold text-gray-900 whitespace-nowrap">Đăng ký trở thành người bán</h1>
          )}
        </div>
        {!isSellerChannel && (
          <SearchBar className="w-full max-w-2xl xl:max-w-md xl:col-span-3 xl:col-start-3 col-span-4 ml-5 xl:ml-1 col-start-3 flex justify-center" />
        )}

        {/* User Section */}
        <div className="col-span-2 col-start-7 flex justify-end items-center space-x-4 lg:space-x-2">
          <div className="relative">
            <Notification>
              <Link href={""}>Mua coffee thành công</Link>
              <Link href={""}>Chuyển khoản thành công</Link>
              <Link href={""}>Đặt hàng thành công</Link>
            </Notification>
          </div>
          <div className="relative">
            <ShoppingCartPopup />
          </div>
          <div className="flex items-center space-x-2">
            <Login />
          </div>
          <div className="flex items-center space-x-2">
            <Language />
          </div>
        </div>
      </header>
      {/*Mobile navbar*/}
      <div className="hidden md:flex flex-col w-full p-2 pt-0">
        <div className="flex justify-between items-center">
          <CiMenuBurger className="size-6 cursor-pointer w-1/5" />
          <Logo className="p-2 w-3/5 size-13" />
          <div className="w-1/5 flex justify-center items-center">
            <Language />
          </div>
        </div>
        {!isSellerChannel && <SearchBar className="w-full flex justify-center" />}
        {isLogin && (
          <h1 className="text-lg font-bold text-gray-900 whitespace-nowrap text-center">Người bán</h1>
        )}
        {isRegister && (
          <h1 className="text-lg font-bold text-gray-900 whitespace-nowrap text-center">Kênh người bán</h1>
        )}
      </div>
    </div>
  );
}
