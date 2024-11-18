'use client';
import React, { useState, useEffect } from "react";
import { Home, Heart, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import Notification from "@/components/elements/Notification";
import ShoppingCartPopup from "@/components/navbar/ShoppingCartPopup";
import Login from "../auth/Login";
const MobileNavBar = () => {
  const [active, setActive] = useState("home");
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const handleLoginSuccess = (name) => {
    setIsLoggedIn(true);
    setUserName(name);
  };

  const handleSetActive = (name) => {
    setActive(name);
  };

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setShowNavbar(true); // Hide navbar on scroll down
    } else {
      setShowNavbar(true); // Show navbar on scroll up
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className={`hidden md:block fixed z-50 bottom-0 w-full bg-white shadow-md rounded-t-lg ${showNavbar ? "" : "translate-y-full"} transition-transform duration-300`}>
      <div className="flex justify-around items-center py-2 w-full">
        <Link href="/" onClick={() => handleSetActive("home")} className={`flex flex-col items-center w-1/4 ${active === "home" ? "text-[--primary-color]" : "text-primary"}`}>
          <Home className="h-6 w-6" />
          <span className="text-xs">Home</span>
        </Link>

        <Link href="/" onClick={() => handleSetActive("cart")} className={`flex flex-col items-center w-1/4 ${active === "cart" ? "text-[--primary-color]" : "text-primary"}`}>
          <ShoppingCartPopup />
          <span className="text-xs">Giỏ hàng</span>
        </Link>

        <Link href="/" onClick={() => handleSetActive("notification")} className={`flex flex-col items-center w-1/4 ${active === "notification" ? "text-[--primary-color]" : "text-primary"}`}>
          <Notification>
            <Link href={""}>Mua coffee thành công</Link>
            <Link href={""}>Chuyển khoản thành công</Link>
            <Link href={""}>Đặt hàng thành công</Link>
          </Notification>
          <span className="text-xs">Thông báo</span>
        </Link>

        <Link href="/" onClick={() => handleSetActive("favorites")} className={`flex flex-col items-center w-1/4 ${active === "favorites" ? "text-[--primary-color]" : "text-primary"}`}>
          <Login  onLoginSuccess={handleLoginSuccess} onClick={() => setIsLoggedIn(!isLoggedIn)} />
          <span className="text-xs">{isLoggedIn ? userName : "Tài khoản"}</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileNavBar;
