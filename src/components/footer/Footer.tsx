import React from "react";

import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="px-8 bg-lime-50 flex justify-between pt-6 sm:flex-col sm:col-span-1 text-gray-500">
        <div>
          <h5 className="text-md font-semibold text-black">
            CÔNG TY TNHH ĐẦU TƯ THƯƠNG MẠI &<br />
            <span className="sm:text-center">DỊCH VỤ QUỐC TẾ ECO-HHB</span>
          </h5>

          <div className="flex items-center mt-1 sm:items-start sm:mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 select-none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>

            <p className="text-xs leading-6 ml-2">
              Địa chỉ: Ấp An Bình, xã Bình An, Long Thành, Đồng Nai
            </p>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 select-none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>

            <p className="text-xs leading-6 ml-2">ecohhb27@gmail.com</p>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 select-none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>

            <p className="text-xs leading-6 ml-2">Hotline: 0908 265 127</p>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 select-none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>

            <p className="text-xs leading-6 ml-2">
              Website: https://ehbmart.vn/
            </p>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 select-none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>

            <p className="text-xs leading-6 ml-2">
              Website: https://ehbmart.com/
            </p>
          </div>
        </div>
          <div className="sm:mt-3 md:flex md:flex-row-reverse md:items-end md:justify-between md:gap-5">
            <div>
              <h5 className="text-sm font-semibold text-black">Thông tin hỗ trợ</h5>
              <p className="text-xs mt-1">Trung tâm trợ giúp</p>
              <p className="text-xs">Câu hỏi thường gặp</p>
              <img src="/images/supermarket.png" alt="#" className="w-32 h-20 mt-7 hidden md:block"/>
            </div>
            <div className="md:flex md:flex-col-reverse">
              <div className="mb-2">
                <h5 className="text-sm font-semibold sm:mt-3 text-black">Liên hệ chúng tôi</h5>
                <div className="flex items-center mt-1">
                  <Image
                    src={"/icons/facebook.svg"}
                    alt="facebook-icon"
                    width={28}
                    height={28}
                    className="mr-2"
                  ></Image>
                  <Image
                    src={"/icons/zalo.svg"}
                    alt="zalo-icon"
                    width={28}
                    height={28}
                  ></Image>
                </div>
              </div>
              <div className="hidden md:block">
                <h5 className="text-sm font-semibold md:mt-3 text-black">Chính sách</h5>
                <p className="text-xs mt-1">Chính sách đổi trả</p>
                <p className="text-xs">Chính sách giao hàng</p>
                <p className="text-xs">Chính sách thanh toán</p>
                <p className="text-xs">Chính sách vận chuyển</p>
              </div>
            </div>
          </div>
        <div className="md:hidden">
          <h5 className="text-sm font-semibold sm:mt-3">Chính sách</h5>
          <p className="text-xs mt-1">Chính sách đổi trả</p>
          <p className="text-xs">Chính sách giao hàng</p>
          <p className="text-xs">Chính sách thanh toán</p>
          <p className="text-xs">Chính sách vận chuyển</p>
        </div>
      </div>
      <div className="px-8 bg-green-800 h-10 text-center text-white text-xs">
        <p className="leading-10">Copyright &copy;2023 ECO - HHB</p>
      </div>
    </footer>
  );
};

export default Footer;
