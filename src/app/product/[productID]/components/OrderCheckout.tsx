"use client";

import React, { useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import { Button } from "@headlessui/react";
import Image from "next/image";
import { CiDeliveryTruck } from "react-icons/ci";
import { GoPackageDependents } from "react-icons/go";
import { PiInfoLight } from "react-icons/pi";
import NumberInput from "../../../../components/elements/NumberInput";
import { formatCurrency } from "@/utils/core";
import { useAppDispatch } from "@/hooks/redux";
import { addCartItem } from "@/lib/features/checkout/cartSlice";
import CartItemMdl from "@/models/products/card-item";
import { useRouter } from "next/navigation";
import OrderCalculator from "@/utils/calculator";

interface OrderCheckoutProps {
  brandLogo: string;
  brandName: string;
  product: CartItemMdl;
}

const OrderCheckout = ({
  brandLogo,
  brandName,
  product,
}: OrderCheckoutProps) => {
  const dispatch = useAppDispatch();
  const [calculator, setCalculator] = useState<OrderCalculator>(
    new OrderCalculator()
  );
  const [orderQuantity, setOrderQuantity] = useState(1);
  const route = useRouter();

  useEffect(() => {
    setCalculator(new OrderCalculator([{ itemMdl: product, quantity: 1 }]));
  }, [product]);

  const handleOrderQuantityChange = (val: number) => {
    setOrderQuantity(val);
  };

  const handleClickBuyNowBtn = () => {
    dispatch(addCartItem({ itemMdl: product, quantity: orderQuantity }));
    route.push("/checkout");
  };

  // Set initial windowWidth to 0
  const [windowWidth, setWindowWidth] = React.useState(0);

  React.useEffect(() => {
    // Update windowWidth after the component has mounted
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize(); // Set the width initially
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getSize = () => {
    if (windowWidth <= 1280) {
      return "small";
    }
    return "big";
  };

  return (
    <div className="bg-white rounded-xl shadow-inner px-4 py-2 flex flex-col gap-2 min-w-80 xl:min-w-40 xl:w-min md:w-full">
      <div className="py-2.5 border-b-[0.5px] border-slate-300">
        <div className="w-fit cursor-pointer justify-start items-center gap-5 xl:gap-2 md:gap-5 inline-flex">
          <div className="rounded-full overflow-hidden w-10 h-10 relative border-[0.5px]">
            <Image src={brandLogo} alt="Brand Logo Icon" fill={true}></Image>
          </div>
          <span className="block text-xl xl:text-lg font-semibold font-serif select-none">
            {brandName}
          </span>
        </div>
      </div>
      <div className="mb-2">
        <h6 className="mb-3 text-lg select-none">Số lượng</h6>
        <NumberInput size={getSize()} onValChange={handleOrderQuantityChange} />
      </div>
      <div>
        <span className="block text-lg md:text-base select-none">Tạm tính</span>
        <span className="block font-bold text-2xl xl:text-xl font-sans">
          {formatCurrency(calculator.getPromotionPrice())} đ
        </span>
      </div>
      <div className="flex flex-row justify-between gap-3 items-center mt-2">
        <Button
          as={m.button}
          whileTap={{
            scale: 0.95,
            transition: { duration: 0.1, ease: "easeInOut" },
          }}
          className="w-full xl:w-1/2 h-10 xl:h-8 py-2 text-center text-white text-base xl:text-xs font-medium rounded-lg xl:rounded-md bg-discount"
          onClick={handleClickBuyNowBtn}
        >
          Mua ngay
        </Button>
        <Button
          as={m.button}
          whileTap={{
            scale: 0.95,
            transition: { duration: 0.1, ease: "easeInOut" },
          }}
          className="w-full xl:w-1/2 h-10 xl:h-8 py-2 rounded-lg xl:rounded-md border text-lime-800 xl:text-xs border-lime-800 flex-col justify-center items-center gap-2.5 inline-flex"
          onClick={() => {
            dispatch(
              addCartItem({ itemMdl: product, quantity: orderQuantity })
            );
          }}
        >
          Thêm vào giỏ
        </Button>
      </div>
      <div className="h-[0px] border-b border-slate-300"></div>
      <div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex gap-1 items-center">
            <CiDeliveryTruck className="fill-lime-800 size-6 xl:size-4 xl:min-w-4 min-w-0 md:size-6" />
            <p className="text-lime-800 text-xs">Đổi trả MIỄN PHÍ trong ngày</p>
          </div>
          <PiInfoLight className="size-5" />
        </div>
        <div className="flex flex-row items-center justify-between md:justify-start gap-1 mt-1">
          <GoPackageDependents className="fill-lime-800 size-6 min-w-6  xl:size-4 xl:min-w-4 md:size-6" />
          <p className="text-lime-800 text-xs text-wrap">
            Miễn phí giao hàng các quận trung tâm TPHCM
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderCheckout;
