import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoginDialogContent from "./modal/LoginDialogContent"; // Import your new component
import RegisterDialogContent from "./modal/RegisterDialogContent"; // Import your new component
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isRegister, setIsRegister] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
      setIsActive(prev => !prev);
  };

  const handleLoginSuccess = (name: string) => {
    setIsLoggedIn(true);
    setUserName(name);
  };

  const handleRegisterSuccess = (name: string) => {
    setIsLoggedIn(true);
    setUserName(name);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    setActiveItem(null);
  };

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  const handleToggleDialog = () => {
    setIsRegister(!isRegister);
  };
  const handleBlur = () => {
    setIsActive(false);
  };

  return (
    <div onBlur={handleBlur}>
      {!isLoggedIn ? (
        <Dialog>
          <DialogTrigger asChild>
            <div>
              <div className="flex md:hidden items-center">
                <div className={`grid relative p-2 focus:outline-none h-10 w-10 flex justify-center items-center  ${isActive? "bg-emerald-50 rounded-full":""}`} onClick={toggleActive}>
                    <FaUser className="size-4" style={{ color: "rgb(30 107 10 / var(--tw-bg-opacity))" }}/>
                </div>
                <div className="ml-2 xl:text-xs">
                  <p className="cursor-pointer text-black-600 hover:underline text-base xl:text-sm xl:whitespace-nowrap" onClick={() => {setIsRegister(false);toggleActive()}}>Đăng nhập</p>
                  <p className="cursor-pointer text-gray-400 hover:underline" onClick={() => {setIsRegister(true);toggleActive()}}>Đăng ký</p>
                </div> 
              </div>
              <div className="hidden md:flex flex-col">
                <div className={`grid relative p-2 focus:outline-none h-10 w-10 flex justify-center items-center  ${isActive? "bg-emerald-50 rounded-full":""}`} onClick={toggleActive}>
                      <FaUser className="size-4" style={{ color: "rgb(30 107 10 / var(--tw-bg-opacity))" }}/>
                  </div>
                </div>  
              </div>  
          </DialogTrigger>
          {isRegister ? (
            <RegisterDialogContent onClose={() => {}} onRegisterSuccess={handleRegisterSuccess}/>
          ) : (
            <LoginDialogContent onClose={() => {}} onLoginSuccess={handleLoginSuccess}/>
          )}
        </Dialog>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-none"><FaUserCircle className="bg- green-500"/>{userName}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => handleItemClick("profile")}
                className={activeItem === "profile" ? "bg-gray-200" : ""}
              >
                <User />
                <span>Hồ sơ cá nhân</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleItemClick("billing")}
                className={activeItem === "billing" ? "bg-gray-200" : ""}
              >
                <CreditCard />
                <span>Quản lý đơn hàng</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleItemClick("settings")}
                className={activeItem === "settings" ? "bg-gray-200" : ""}
                disabled
              >
                <Settings />
                <span>Cài đặt</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              <span>Đăng xuất</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}