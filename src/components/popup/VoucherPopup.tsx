"use client";

import { useEffect,useRef, useState } from "react";
import { FiInfo } from "react-icons/fi";
import { FaRegCopy } from "react-icons/fa";
import { GrFormClose } from "react-icons/gr";
import Image from "next/image";
import noVouchers from "@/public/images/vouchers.png";
import DiscountMdl from "@/models/products/discount";
import { isOutdated } from "@/utils/datetime";
import { copyToClipboard } from "@/utils/core";
import { Input } from "@headlessui/react";

type VoucherPopupProps = {
  onClose: () => void;
  onApply: (voucher: DiscountMdl[]) => void;
  vouchers: DiscountMdl[];
}

type VoucherItemProps = {
  info: DiscountMdl;
  isChecked: boolean;
  onChecked: (val: boolean) => void;
};

const VoucherPopup: React.FC<VoucherPopupProps> = ({
  onClose,
  onApply,
  vouchers,
}) => {
  const [selectedVouchers, setSelectedVouchers] = useState<Set<string>>(
    new Set()
  );

  const [activeTab, setActiveTab] = useState<"all" | "shipping" | "others">(
    "all"
  );

  const [searchedVoucherCode, setSearchedVoucherCode] = useState<string>("");

  const [discountsByCategory, setDiscountsByCategory] = useState<
    Map<string, DiscountMdl[]>
  >(new Map());

  useEffect(() => {
    setDiscountsByCategory(() => {
      const newVal = new Map();

      vouchers.forEach((val) => {
        if (!newVal.has(val.id)) {
          newVal.set(val.id, [val]);
        }

        newVal.get(val.id)?.push(val);
      });

      return newVal;
    });
  }, [vouchers]);

  const popupRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
          onClose(); // Close the modal if clicked outside
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [onClose]);

  const handleApplyVoucher = () => {
    const selectedVoucher = vouchers.filter((voucher) =>
      selectedVouchers.has(voucher.id)
    );
    
    if (selectedVoucher) {
      onApply(selectedVoucher);
      onClose();
    } else {
      alert("Vui lòng chọn một mã ưu đãi hợp lệ.");
    }
  };

  const renderVouchers = (activeTab: string) => {
    if (vouchers.length === 0) {
      return <EmptyVoucherSection />;
    }

    let voucherItems: DiscountMdl[] | undefined = [];

    if (searchedVoucherCode) {
      voucherItems = vouchers.filter((val) =>
        val.id.includes(searchedVoucherCode)
      );
    } else {
      voucherItems = discountsByCategory.get(activeTab) || [];
    }

    const onCheckedVoucher = (val: boolean, voucher: DiscountMdl) => {
      if (val) {
        setSelectedVouchers((prev) => {
          const newVal = new Set(prev);
          newVal.add(voucher.id);

          return newVal;
        });
      } else {
        setSelectedVouchers((prev) => {
          const newVal = new Set(prev);
          newVal.delete(voucher.id);

          return newVal;
        });
      }
    };

    return voucherItems.map((voucher) => {
      return (
        <>
          <VoucherItem
            info={voucher}
            isChecked={selectedVouchers.has(voucher.id)}
            onChecked={(val) => {
              onCheckedVoucher(val, voucher);
            }}
          />
        </>
      );
    });
  };

  return (
    <div className="fixed md:px-2 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-full max-w-md shadow-lg" ref={popupRef}>
        <div className="flex justify-between items-center p-3">
          <h2 className="text-lg font-semibold">Mã ưu đãi từ gia dụng ABC</h2>
          <button
            onClick={onClose}
            className="bg-white hover:border-gray-300 hover:border-2 cursor-pointer text-gray-300"
          >
             <GrFormClose className="size-7 md:rounded-full md:border-gray-300 md:border-2" />
          </button>
        </div>
        <div className="px-3 mb-4 flex space-x-2">
          <input
            type="text"
            placeholder="Nhập mã ưu đãi"
            className="flex-grow p-2 border border-primary rounded"
            value={searchedVoucherCode}
            onChange={(e) => setSearchedVoucherCode(e.target.value)}
          />
          <button
            className={`px-4 py-2 rounded ${
              searchedVoucherCode &&
              vouchers.some(
                (voucher) => voucher.discountCode === searchedVoucherCode
              )
                ? "bg-primary text-white"
                : "bg-gray-100 text-zinc-400"
            }`}
            onClick={handleApplyVoucher}
            disabled={!searchedVoucherCode}
          >
            Áp dụng
          </button>
        </div>
        <div className="mb-6">
          <div className="flex justify-between text-gray-600 text-sm mb-2 border-b">
            <button
              className={`flex-1 pb-2 ${
                activeTab === "all"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("all")}
            >
              Tất cả
            </button>
            <button
              className={`flex-1 pb-2 ${
                activeTab === "shipping"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("shipping")}
            >
              Vận chuyển
            </button>
            <button
              className={`flex-1 pb-2 ${
                activeTab === "others"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("others")}
            >
              Ưu đãi khác
            </button>
          </div>
          <ul className="divide-y divide-gray-200 overflow-y-auto h-64 p-3 scrollbar-rounded scrollbar-thin scrollbar-none">
            {renderVouchers(activeTab)}
          </ul>
        </div>
        <div className="flex justify-between items-center border-t pt-4 px-3 pb-2">
          <p className="text-sm text-gray-700 grid">
            Tiết kiệm{" "}
            <span className="text-red-500">
              {selectedVouchers.size * 25000}đ
            </span>
          </p>
          <button
            onClick={handleApplyVoucher}
            className={`px-4 py-2 rounded ${
              selectedVouchers.size > 0
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
            disabled={selectedVouchers.size === 0}
          >
            Áp dụng mã
          </button>
        </div>
      </div>
    </div>
  );
};

const VoucherItem = ({ info, isChecked, onChecked }: VoucherItemProps) => {
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);

  const isExpired = isOutdated(info.expiredDate || "");

  const baseClass = isChecked
    ? "bg-green-50 border-green-500 border-primary"
    : "bg-gray-50 border-gray-300";
  const textClass = isExpired ? "text-gray-400" : "text-orange-500";

  return (
    <li
      key={info.id}
      className={`flex items-center justify-between py-2 relative ${
        isExpired ? "opacity-50" : ""
      }`}
    >
      <Input
        type="checkbox"
        id={`voucher-checkbox-${info.id}`}
        className="hidden"
        checked={isChecked}
        onChange={(e) => onChecked(e.target.checked)}
        disabled={isExpired}
      />
      <label
        htmlFor={`voucher-checkbox-${info.id}`}
        className={`flex items-center justify-center w-5 h-5 rounded-sm border-2 mr-2 ${
          isChecked
            ? "bg-primary border-primary"
            : "bg-gray-100 border-gray-300"
        } cursor-pointer`}
      >
        {isChecked && (
          <svg
            className="w-4 h-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </label>

      <div
        className={`flex items-center w-full relative rounded-lg overflow-hidden`}
      >
        <div
          className={`flex-grow p-3 ${baseClass} border-r-0 rounded-l-lg relative border`}
        >
          <span
            className={`text-sm font-semibold ${textClass} flex items-center`}
          >
            Giảm {info.discountPercent} tới đa {info.maxDiscountPrice} đơn từ{" "}
            {info.minOrderPrice}
            <span
              className="ml-2 cursor-pointer relative"
              onMouseEnter={() => setTooltipVisible(true)}
              onMouseLeave={() => setTooltipVisible(false)}
            >
              <FiInfo />
            </span>
          </span>
          <p className="text-xs text-gray-500">
            HSD: {info.expiredDate}{" "}
            {isExpired && <span className="text-red-500">Mã đã hết hạn</span>}
          </p>
        </div>
        <div
          className={`w-8 h-16 ${baseClass} border-2 border-l-0 rounded-r-lg flex items-center justify-between relative`}
        >
          <div
            className={`absolute top-[-0.625rem] left-[-0.625rem] w-5 h-5 ${baseClass} border-2 rounded-full`}
          />
          <div className={`h-10 border-l-2 border-dotted ${baseClass}`} />
          <div
            className={`absolute bottom-[-0.625rem] left-[-0.625rem] w-5 h-5 ${baseClass} border-2 rounded-full`}
          />
        </div>
      </div>

      {tooltipVisible && (
        <div
          className="fixed w-64 p-4 bg-white border boder-primary rounded shadow-lg z-50 top-1 left-1"
          onMouseEnter={() => setTooltipVisible(true)}
          onMouseLeave={() => setTooltipVisible(false)}
        >
          <p className="font-bold flex items-center">
            Mã: {info.discountCode}
            <button
              onClick={() => copyToClipboard(info.discountCode)}
              className="ml-2 flex items-center text-green-500"
            >
              <FaRegCopy />
            </button>
          </p>
          <p>Hạn sử dụng: {info.expiredDate}</p>
          <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
            {info.discountCons?.map((condition, index) => (
              <li key={index}>{condition}</li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

const EmptyVoucherSection = () => {
  return (
    <div className="flex flex-col items-center justify-center h-40">
      <div className="mb-4 p-2 bg-blue-100 text-blue-600 rounded-lg flex items-center">
        <FiInfo className="mr-2" />
        <p>Vui lòng chọn sản phẩm trong giỏ hàng trước khi chọn mã giảm giá</p>
      </div>
      <Image src={noVouchers} alt="logo vouchers" className="w-16 h-16 mb-4" />
      <p className="text-gray-500 text-center">Chưa có mã giảm giá của Shop</p>
    </div>
  );
};

export default VoucherPopup;
