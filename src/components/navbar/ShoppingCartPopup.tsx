"use client";

import React, { useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import { FaCartShopping } from "react-icons/fa6";
import {
  CloseButton,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import Image from "next/image";
import { useAppSelector } from "@/hooks/redux";
import { formatCurrency } from "@/utils/core";
import { useRouter } from "next/navigation";
import ShoppingCartItem from "../elements/ShoppingCartItem";
import OrderCalculator from "@/utils/calculator";
import { GrFormClose } from "react-icons/gr";

const ShoppingCartPopup = () => {
  const cartState = useAppSelector((state) => state.cart);

  const [cal, setCal] = useState<OrderCalculator>(new OrderCalculator());
  
  const route = useRouter();
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

  useEffect(() => {
    setCal(new OrderCalculator(cartState.items))
  }, [cartState.items])

  return (
    <Popover>
      <PopoverButton
        aria-label="Shopping cart icon"
        className={`relative p-2 focus:outline-none w-10 h-10 rounded-full flex justify-center items-center ${isActive ? 'bg-emerald-100 text-white' : ''}`}
        onClick={toggleActive}
        onBlur={handleBlur}
      >
        <FaCartShopping className="size-5"
          style={{
            color: "rgb(30 107 10 / var(--tw-bg-opacity))"}}
        />
        {cartState && (
          <m.span
            aria-label="total items in the cart"
            className={`w-4 h-4 flex justify-center items-center rounded-full bg-red-600 text-[0.6rem] font-sansita font-bold text-white absolute -top-1 -right-1`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            {cal.getTotalQty()}
          </m.span>
        )}
      </PopoverButton>

      <PopoverPanel
        transition
        anchor={{
          to: "bottom",
          gap: "20px",
        }}
        className="pt-3 px-3 z-50 gap-3 rounded-md bg-white overflow-hidden min-w-96 min-h-48 max-h-96 w-[440px] text-black text-sm/6 transition duration-200 ease-in-out [--anchor-gap:12px] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
      >
        {cartState.items.length !== 0 ? (
          <>
            <div className="flex items-center justify-between sm:justify-center px-4 border-b-[0.5px] h-10">
              <h5 className="text-base font-medium">
                ({cal.getTotalQty()}) Sản phẩm
              </h5>
              <span className="block text-base text-discount font-bold">
                {formatCurrency(cal.getPromotionPrice())} đ
              </span>
            </div>
            <div className="overflow-y-auto max-h-52 scrollbar-primary">
              {cartState.items.map((cartPayload, index) => (
                <div
                  key={index}
                  className={`${
                    index < cartState.items.length - 1 ? "border-b" : ""
                  }`}
                >
                  <ShoppingCartItem cartPayload={cartPayload} item="icon" />
                </div>
              ))}
            </div>
            <div className="px-4 mt-2 py-2 border-t">
              <button
                onClick={(event) => {
                  event.preventDefault();
                  route.push("/checkout");
                }}
                className="w-full py-2 rounded-lg bg-primary text-white text-base font-medium text-center"
              >
                Xem giỏ hàng và thanh toán
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center px-14 sm:px-8 py-10 sm:py-5 w-full">
            <Image
              src="/images/shopping-buyer.png"
              alt="Shopping buyer image"
              width={110}
              height={110}
            />
            <h5 className="text-primary text-base font-normal text-center">
              Giỏ hàng của bạn đang trống
            </h5>
            <span className="block text-center text-xs font-light">
              Hãy thêm sản phẩm để tiếp tục mua sắm nhé!
            </span>
            
          </div>
        )}
        <CloseButton
          as={m.div}
          onClick={handleClose}
          initial={{ opacity: 0.6 }}
          whileHover={{ scale: 1.2, transition: { duration: 1 } }}
          whileTap={{ scale: 0.9 }}
          whileInView={{ opacity: 1 }}
          className="absolute top-2 right-2 rounded-full bg-white hover:border-gray-300 hover:border-2 cursor-pointer text-red-700"
        >
          <GrFormClose className="size-7 md:rounded-full md:border-gray-300 md:border-2" />
        </CloseButton>
      </PopoverPanel>
    </Popover>
  );
};

export default ShoppingCartPopup;
