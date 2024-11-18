"use client";

import Button from "@/components/elements/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const EmptyCart = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center px-14 py-10 bg-white rounded-md mt-4 shadow-inner">
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
      <Button
        onClick={() => {
          router.push("/");
        }}
        className="bg-primary text-white px-3 py-1 rounded-md mt-4"
      >
        Tiếp tục mua sắm
      </Button>
    </div>
  );
};

export default EmptyCart;
