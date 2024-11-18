import React from "react";
import Image from "next/legacy/image";
import { AiOutlineRight } from "react-icons/ai";
import { Textarea } from "@/components/ui/textarea";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: number;
  productName: string;
  volume: string;
  weight: string;
  type: string;
  quantity: number;
  price: string;
  productLogo: string;
}

interface ShopInfo {
  shopName: string;
  logo: string;
}

interface VoucherInfo {
  title: string;
  icon: string;
}

interface CardProductProps {
  shopInfo: ShopInfo;
  products: Product[];
  voucher: VoucherInfo;
}

const CardProduct: React.FC<CardProductProps> = ({ shopInfo, products, voucher }) => {
  const [isFullNameVisible, setIsFullNameVisible] = React.useState(false);

  const toggleFullName = () => {
    setIsFullNameVisible(!isFullNameVisible);
  };

  return (
    <CardContent>
      <div className="rounded-md border px-3 px-3">
        <div className="w-full border-b border-gray-100 flex items-center py-3 px-3 mb-3">
          <Image src={shopInfo.logo} alt="Logo shop" className="rounded-full mr-4" width={30} height={30} />
          <p className="font-medium text-gray-900">{shopInfo.shopName}</p>
          <AiOutlineRight className="ml-2" />
        </div>
        {products.map(({ id, productName, volume, weight, type, quantity, price, productLogo }) => (
          <div className="flex items-center justify-between mb-6" key={id}>
            <div className="flex items-center">
              <Image src={productLogo} alt={productName} className="rounded-md mr-4" width={70} height={70} />
              <div className="ml-3">
                <span className="text-base text-gray-800 block sm:hidden">{productName}</span>
                <span className={`text-base text-gray-800 hidden md:block md:text-xs`} onClick={toggleFullName}>
                  {isFullNameVisible ? productName : `${productName.slice(0, 10)}...`}
                </span>
                <div className="text-xs text-gray-600 flex">
                  <p className="mr-2 md:whitespace-nowrap">Thể tích: {volume}</p>
                </div>
              </div>
            </div>
            <p className="font-medium text-right whitespace-nowrap">{price}</p>
          </div>
        ))}

        <div className="flex items-center mt-4">
          <Image src={voucher.icon} alt="Voucher" className="rounded-full mr-2" />
          <p className="font-medium text-gray-900 ml-2 whitespace-nowrap">{voucher.title}</p>
          <AiOutlineRight className="ml-2" />

          <Badge className="inline-flex items-center px-3 py-0 border-2 border-[#FFAA00] text-[#FFAA00] text-base rounded-[5px] bg-[#FFF9F1] relative">
            <div className="absolute -left-[0.13rem] w-2 h-3 border-l-0 border-2 border-[#FFAA00] bg-[#FFF9F1] rounded-r-full"></div>
            <p className="whitespace-nowrap md:text-xs">Đã giảm 50.000đ</p>
            <div className="absolute -right-[0.11rem] w-2 h-3 border-r-0 border-2 border-[#FFAA00] bg-[#FFF9F1] rounded-l-full"></div>
          </Badge>
        </div>

        <div className="mt-3 mb-3">
          <label htmlFor="note" className="text-sm block mb-2">Ghi chú cho người bán</label>
          <Textarea className="h-[6.25rem]" placeholder="Ghi chú..." />
        </div>
      </div>
    </CardContent>
  );
};

export default CardProduct;