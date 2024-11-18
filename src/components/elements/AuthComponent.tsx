import React, { useEffect, useRef } from "react";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import Button from "@/components/elements/Button";
import Logo from "./Logo";
import { GrFormClose } from "react-icons/gr";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode; 
}

export default function Modal({ isVisible, onClose, children }: ModalProps) {
  if (!isVisible) return null;
   const modalRef = useRef<HTMLDivElement>(null); 
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-auto md:px-2">
      <div className="bg-white rounded-xl shadow-lg relative max-w-[902px] w-full flex items-center sm:flex-col sm:m-auto sm:mt-auto" ref={modalRef}>
        {/* Left Image Section */}
        <div className="w-5/12 rounded-l-xl overflow-hidden sm:rounded-full sm:ml-0 sm:mt-16 sm:-mb-10 sm:border-2  sm:h-36 sm:w-36">
          <Image
            src={logo}
            alt="logo vouchers"
            width={400}
            height={600}
            className="sm:hidden rounded-l-xl"
          />
          <div className="hidden sm:block p-5 w-auto h-auto">
            <Logo />
          </div>
        </div>

        {/* Right Form Section */}
        <div className="w-7/12 p-8 flex flex-col justify-center md:w-full h-[600px]">
          {children}
        </div>

        {/* Close Button */}
        <Button
          onClick={onClose}
          className="absolute top-2 right-2 rounded-full bg-white hover:border-gray-300 hover:border-2 cursor-pointer text-gray-300"
        >
          <GrFormClose className="size-7 md:rounded-full md:border-gray-300 md:border-2" />
        </Button>
      </div>
    </div>
  );
}
