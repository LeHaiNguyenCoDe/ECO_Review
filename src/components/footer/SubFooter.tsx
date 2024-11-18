import React from "react";

import Image from "next/image";
import Button from "../elements/Button";

const SubFooter: React.FC = () => {
  return (
    <div className="px-8 bg-amber-500 flex items-center justify-between select-none">
      <div className="flex items-center">
        <Image
          src="/images/supermarket.png"
          alt="hhb-logo"
          width={120}
          height={100}
        ></Image>
        <div className="ms-10">
          <p className="text-white font-semibold">
            Đăng ký ngay để nhận ưu đãi thành <br /> viên từ ECO - HHB
          </p>
        </div>
      </div>
      <div className="">
        <Button
          type="button"
          className="bg-white hover:bg-gray-100 font-semibold py-2 px-4 rounded shadow text-green-700"
        >
          Đăng ký ngay
        </Button>
      </div>
    </div>
  );
};

export default SubFooter;
