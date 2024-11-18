"use client";

import React from "react";
import Image from "next/image";
import { motion as m } from "framer-motion";

const CompanyPolicies: React.FC = () => {
  return (
    // <div className="flex flex-wrap justify-center gap-10 py-8 mx-auto text-xs font-light font-serif select-none max-w-screen-xl">
    <div className="flex justify-around bg-[#f1f6f3] md:grid md:grid-cols-2 gap-10 py-8 text-xs font-light font-serif select-none max-w-screen-xl">
      <m.div
        whileHover={{ scale: 0.95 }}
        className="flex flex-col gap-3 items-center text-center w-40 rounded-lg py-4 px-5"
      >
        <Image
          src={"/icons/product-return.svg"}
          unoptimized={true}
          alt="Policies Icons"
          width={40}
          height={40}
        />
        <span className="text-sm">Đổi trả MIỄN PHÍ trong ngày</span>
      </m.div>
      <m.div
        whileHover={{ scale: 0.95 }}
        className="flex flex-col gap-3 items-center text-center w-40 rounded-lg py-4 px-5 "
      >
        <Image
          src={"/icons/credit-card.svg"}
          unoptimized={true}
          alt="Policies Icons"
          width={40}
          height={40}
        />
        <span className="text-sm">Bảo mật thanh toán</span>
      </m.div>
      <m.div
        whileHover={{ scale: 0.95 }}
        className="flex flex-col gap-3 items-center text-center w-40 rounded-lg py-4 px-5 "
      >
        <Image
          src={"/icons/free-delivery.svg"}
          unoptimized={true}
          alt="Policies Icons"
          width={40}
          height={40}
        />
        <span className="text-sm">
          Miễn phí giao hàng các quận trung tâm TPHCM
        </span>
      </m.div>
      <m.div
        whileHover={{ scale: 0.95 }}
        className="flex flex-col gap-3 items-center text-center w-40 rounded-lg py-4 px-5 "
      >
        <Image
          src={"/icons/assistant.svg"}
          unoptimized={true}
          alt="Policies Icons"
          width={40}
          height={40}
        />
        <span className="text-sm">Hỗ trợ khách hàng</span>
      </m.div>
    </div>
  );
};

export default CompanyPolicies;
