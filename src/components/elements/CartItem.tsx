"use client";

import React from "react";
import Image from "next/image";
import CartItemMdl from "@/models/products/card-item";
import { useRouter } from "next/navigation";
import Rating from "./Rating";
import { formatCurrency } from "@/utils/core";
import CustomButton from "./Button";
import { useAppDispatch } from "@/hooks/redux";
import { addCartItem } from "@/lib/features/checkout/cartSlice";
import { IoCartOutline } from "react-icons/io5";

interface CartItemProps {
  itemMdl: CartItemMdl;
  href: string;
  isFilterPage?: boolean;
}

const CartItem = ({ itemMdl,isFilterPage = false, ...props }: CartItemProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  return (
    <div
      className={`w-60 p-2 bg-white rounded-lg md:rounded-xl shadow-lg md:shadow-none border border-gray-200 cursor-pointer xl:w-56 xl:h-80 ${!isFilterPage? "md:w-36 md:h-48":"md:w-40 md:h-48"} md:min-w-36  overflow-hidden`}
      onClick={() => {
        router.push(props.href);
      }}
    >
      <div className="relative w-full h-48 md:h-1/2 transition transform hover:scale-105">
        <Image
          src={itemMdl.imageUrl}
          alt={itemMdl.name}
          fill={true}
          sizes="(max-width: 768px) 50vw, 200vw"
          className="object-cover"
        />
        {itemMdl.discount ? (
          <span className="absolute top-2 left-2 bg-red-500 px-2 py-1 rounded-full text-white text-xs gap-1 hidden">
            <p className="md:hidden">Giảm</p> {itemMdl.discount.discountPercent}%
          </span>
        ) : null}


        <div className="hidden md:grid items-center absolute top-2 right-[0.72rem] text-center border-none justify-items-center"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(addCartItem({ itemMdl: itemMdl, quantity: 1 }));
          }} 
        >
          <IoCartOutline className="text-2xl text-green-800" />
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="px-2 pt-2 text-sm font-bold leading-tight hidden md:block h-10">{itemMdl.name}</h3>
        <div className="p-4 md:p-2 md:flex md:flex-col-reverse md:h-1/4 mb-auto">
          <h3 className="text-sm font-bold leading-tight truncate md:hidden">{itemMdl.name}</h3>
          <div className="flex justify-between items-center mt-1 md:justify-between md:w-full">
            {itemMdl.rating !== undefined && itemMdl.rating <= 5 && (
              <Rating
                avgRating={itemMdl.rating}
                className="text-yellow-400"
              />
            )}
            <span className="text-gray-500 text-xs ml-2 whitespace-nowrap">
              Đã bán {itemMdl.quantitySold}
            </span>
          </div>
          <div className="flex justify-between items-center mt-2 md:mt-0">
            {itemMdl.discount ? (
              <div className="flex md:flex-row md:whitespace-nowrap items-center gap-3 md:gap-1">
                <p className="text-base md:text-xs font-semibold text-red-500">
                  {formatCurrency(itemMdl.discount.discountPrice)} <span className="underline">đ</span>
                </p>
                <p className="text-xs md:text-xxs text-gray-400 line-through">
                  {formatCurrency(itemMdl.price)} <span className="underline">đ</span>
                </p>
              </div>
            ) : (
              <p className="text-base font-semibold">
                {formatCurrency(itemMdl.price)} <span className="underline">đ</span>
              </p>
            )}
            <CustomButton
              className="bg-white text-green-700 border rounded md:hidden p-1 border-green-700 hover:bg-green-700 hover:text-white hover:bg-primary-dark"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(addCartItem({ itemMdl: itemMdl, quantity: 1 }));
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
