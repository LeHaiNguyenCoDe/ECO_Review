"use client";

import React, { useState } from "react";

import AdsBanner from "@/components/elements/AdsBanner";
import Article from "@/components/elements/Article";
import ProductTitle from "@/components/elements/ProductTitle";
import StackedList from "@/components/collection/StackedList";
import Image from "next/image";

import {
  getProductDetailsByID,
  getRelativeProductsByCategory,
} from "@/apis/product";
import Error from "@/app/error";
import Link from "next/link";
import CartItem from "@/components/elements/CartItem";
import CartItemMdl from "@/models/products/card-item";
import Rating from "@/components/elements/Rating";
import { formatCurrency } from "@/utils/core";
import OrderCheckout from "./components/OrderCheckout";
import {
  calculateRatingPercentages,
  filterbutton,
  getAverageRating,
  getLenghtDetals,
  getRatingMessage,
  ratingList,
  Comment,
} from "./store/ratingData";
import { FaStar } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";   
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IoChevronBack } from "react-icons/io5";
const ProductDetailPage = async ({
  searchParams,
}: {
  params: string;
  searchParams: { productID: string; categoryID: string };
}) => {
  // TODO: enhance later by below reason
  let productInfo: CartItemMdl | undefined;
  interface RatingDetailProps {
    rating: Comment;
  }

  const RatingDetail: React.FC<RatingDetailProps> = ({ rating }) => {
    const maxLength = 70;
    const { truncated, isTruncated } = getLenghtDetals(rating, maxLength);
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };

    return (
      <div>
        <p className="text-gray-500">
          {isExpanded ? rating.details : truncated}
        </p>
        {isTruncated && (
          <button onClick={toggleExpand} className="text-blue-500">
            {isExpanded ? "Ẩn bớt" : "Xem thêm"}
          </button>
        )}
      </div>
    );
  };
  // const [showAll, setShowAll] = useState(false);
  // const ratingsToShow = showAll ? ratingList : ratingList.slice(0,);

  // const toggleShowAll = () => {
  //   setShowAll(!showAll);
  // };
  const productData = await getProductDetailsByID(searchParams.productID).then(
    (data) => {
      // TODO: enhance later because the business is not clear && need discus with API to optimized
      if (data) {
        productInfo = {
          id: data.id,
          name: data.name,
          price: data.price,
          imageUrl: data.imageUrl,
          discount: data.discount,
          inventories: data.inventories,
          brand: data.brand,
        };

        return data;
      }
    }
  );

  const relativeProducts = await getRelativeProductsByCategory(
    productData?.category.id || ""
  );

  // TODO: enhance later by upper reason
  if (productData === undefined || productInfo === undefined) return <Error />;

  return (
    <main className="px-default xl:px-1 gap-3 flex flex-col overflow-hidden">
      {/* Sub Navigation section */}
      <div className="flex items-center gap-2 mt-5 text-start text-[#5f5f5f] text-sm font-light">
        <Link href={"/"} className="hover:text-green-900 hover:cursor-pointer">
          Trang chủ
        </Link>
        <span className="font-extralight">/</span>
        <Link href={"/"} className="hover:text-green-900 hover:cursor-pointer">
          {productData.category.name}
        </Link>
        <span className="font-extralight">/</span>
        <span className="text-[#B95A30]">{productData.name}</span>
      </div>
      <div className="flex flex-row md:grid md:grid-cols-1 gap-3 mt-4 overflow-visible">
        {/* Product Information section */}
        <div className="md:w-full flex flex-col gap-3">
          <div className="flex md:w-full md:grid md:grid-col-1 justify-start items-start gap-4 bg-white shadow-inner p-5 rounded-xl">
            <div className="flex flex-col w-2/5 xl:w-2/6 md:w-full md:grid md:grid-col-1">
              <div className="relative w-full h-72 xl:h-52 lg:h-40 md:h-72">
                <Image src={productData.imageUrl} alt="" fill={true} />
                <div className="hidden md:grid items-center bg-gray-100 absolute top-2 left-0 border border-2 h-[2rem] w-[2rem] rounded-full text-center justify-items-center">
                  <IoChevronBack className="text-xl" />
                </div>
                <div className="hidden md:grid items-center bg-gray-100 absolute top-2 right-[50px] border border-2 h-[2rem] w-[2rem] rounded-full text-center justify-items-center">
                  <IoCartOutline className="text-xl" />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="hidden md:grid items-center bg-gray-100 absolute top-2 right-2 border border-2 h-[2rem] w-[2rem] rounded-full text-center justify-items-center">
                    <BsThreeDotsVertical className="text-xl" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Về Trang chủ</DropdownMenuItem>
                    <DropdownMenuItem>Sao chép liên kết</DropdownMenuItem>
                    <DropdownMenuItem>Chia sẻ</DropdownMenuItem>  
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <StackedList>
                {productData.imageDetailUrl.map((img, index) => {
                  return (
                    <Image
                      key={index}
                      src={img}
                      alt={`Detail image of ${productData.name}`}
                      width={70}
                      height={70}
                      className="rounded-lg border border-lime-800 xl:size-10 md:size-auto"
                    />
                  );
                })}
              </StackedList>
            </div>
            <div className="w-3/5 xl:w-4/5 md:w-full md:grid md:grid-col-1 flex flex-col justify-start items-start gap-3">
              <div className="w-full flex flex-col gap-1">
                <div className="self-stretch flex flex-row justify-between items-center">
                  <h2 className="text-2xl xl:text-xl text-stone-950 font-medium">
                    {productData.name}
                  </h2>
                  {productData.discount && (
                    <span className="block px-1 py-1 bg-discount rounded text-white text-xs font-normal">
                      Giảm {productData.discount.discountPercent}%
                    </span>
                  )}
                </div>
                {productData.discount ? (
                  <div className="flex flex-row gap-4 items-center">
                    <span className="text-discount text-xl xl:text-lg font-bold">
                      {formatCurrency(productData.discount.discountPrice)}{" "}
                      <u>đ</u>
                    </span>
                    <span className="text-informal text-base line-through">
                      {formatCurrency(productData.price)} đ
                    </span>
                  </div>
                ) : (
                  <span className="block text-xl font-bold">
                    {formatCurrency(productData.price)} <u>đ</u>
                  </span>
                )}
                <div className="inline-flex flex-row mt-2 gap-3 items-center">
                  <Rating
                    avgRating={productData.averageRating}
                    className="text-yellow-400 size-5"
                  />
                  <div className="relative flex gap-6">
                    <span className="text-lime-800 text-sm font-normal font-[Inter] leading-normal">
                      (Đánh giá {productData.quantityAvailable})
                    </span>
                    <span className="relative top-[2px] w-[0.5px] block border-l-[0.5px] border-gray-500 h-4"></span>
                    <span className="text-informal text-sm font-normal font-[Inter] leading-normal">
                      Đã bán {productData.quantitySold}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-2 w-full">
                <h6 className="text-xl font-medium">Thông tin chi tiết</h6>
                <div className="items-center gap-2 inline-flex">
                  <span className="block w-2/6 text-informal">Thương hiệu</span>
                  <span>{productData.origin}</span>
                </div>
                <div className="items-center gap-2 inline-flex">
                  <span className="block w-2/6 text-informal">Xuất sứ</span>
                  <span>{productData.origin}</span>
                </div>
                <div className="items-center gap-2 inline-flex ">
                  <span className="block w-2/6 text-informal">Thành phần</span>
                  <span>{productData.ingredient}</span>
                </div>
                <div className="items-center gap-2 inline-flex">
                  <span className="block w-2/6 text-informal">Hạn sử dụng</span>
                  <span>{productData.expirationDate}</span>
                </div>
                <div className="items-center gap-2 inline-flex">
                  <span className="block w-2/6 text-informal">Bảo hành</span>
                  <span>{productData.warranty}</span>
                </div>
              </div>
              <div className="overflow-auto">
                <h2 className="text-xl font-medium">Mô tả sản phẩm</h2>
                <Article slice={1} className="">
                  <span>
                    Đặc trưng của Sparkling là có tiếng nổ và sủi bọt khí sau
                    khi mở khui và rót ra ly. Đây là một trong các loại vang
                    được dùng trong các buổi tiệc tùng sôi nổi, sinh nhật, lễ
                    hội, ăn mừng,… có nguồn gốc từ giống nho đặc biệt của người
                    Pháp, trồng thành công ở khu vực Nam Trung Bộ nước ta, cho
                    ra được những ly rượu ngon nhất, chất lượng nhất mang thương
                    hiệu The Moshav Farm. Đặc trưng của Sparkling là có tiếng nổ
                    và sủi bọt khí sau khi mở khui và rót ra ly. Đây là một
                    trong các loại vang được dùng trong các buổi tiệc tùng sôi
                    nổi, sinh nhật, lễ hội, ăn mừng,… có nguồn gốc từ giống nho
                    đặc biệt của người Pháp, trồng thành công ở khu vực Nam
                    Trung Bộ nước ta, cho ra được những ly rượu ngon nhất, chất
                    lượng nhất mang thương hiệu The Moshav Farm. Có nguồn gốc từ
                    giống nho đặc biệt của người Pháp, trồng thành công ở khu
                    vực Nam Trung Bộ nước ta, cho ra được những ly rượu ngon
                    nhất, chất lượng nhất mang thương hiệu The Moshav Farm. Đặc
                    trưng của Sparkling là có tiếng nổ và sủi bọt khí sau khi mở
                    khui và rót ra ly. Đây là một trong các loại vang được dùng
                    trong các buổi tiệc tùng sôi nổi, sinh nhật, lễ hội, ăn
                    mừng,…
                  </span>
                  <AdsBanner
                    imgURL="/images/product-detail.png"
                    position="full"
                    className="h-56"
                  />
                  <span>
                    Có nguồn gốc từ giống nho đặc biệt của người Pháp, trồng
                    thành công ở khu vực Nam Trung Bộ nước ta, cho ra được những
                    ly rượu ngon nhất, chất lượng nhất mang thương hiệu The
                    Moshav Farm.
                  </span>
                  <span>
                    Đặc trưng của Sparkling là có tiếng nổ và sủi bọt khí sau
                    khi mở khui và rót ra ly. Đây là một trong các loại vang
                    được dùng trong các buổi tiệc tùng sôi nổi, sinh nhật, lễ
                    hội, ăn mừng,…
                  </span>
                </Article>
              </div>
            </div>
          </div>
          {ratingList.length == 0 ? (
            <div className="bg-white shadow-inner h-96 p-5 rounded-xl justify-center items-center flex">
              <div className="flex-col justify-center items-center gap-6 flex">
                <Image
                  src={"/images/rating.png"}
                  alt="Rating Image"
                  width={100}
                  height={100}
                />
                <div className="self-stretch h-[53px] flex-col justify-start items-center gap-2 flex">
                  <span className="text-center text-xl font-medium">
                    Chưa có thông tin đánh giá
                  </span>
                  <span className="text-[#6b6b7c] text-base font-normal leading-snug">
                    Chọn mua sản phẩm để trở thành người đầu tiên đánh giá sản
                    phẩm
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-col justify-center items-center gap-6 flex">
              <div className="flex flex-col gap-5 md:gap-2 p-5 bg-white rounded-lg">
                <h2 className="text-xl font-bold flex flex-row gap-2 items-center">
                  Đánh giá <p className="md:hidden">khách hàng về sản phẩm</p>
                  <a
                    className="hidden md:flex text-sm absolute right-6 text-green-600"
                    href="#"
                  >
                    Xem tất cả
                  </a>
                </h2>
                <div className="flex flex-row p-4 rounded-xl border md:border-none md:p-0 gap-4 w-2/3 xl:w-full">
                  <div className="w-1/2 md:w-full">
                    <div className="flex flex-row items-center gap-1">
                      <span className="flex flex-row items-end text-lg">
                        <h2 className="text-green-600 text-2xl font-semibold">
                          {getAverageRating(ratingList).toFixed(1)}
                        </h2>
                        /5
                      </span>
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          className={`${
                            index < getAverageRating(ratingList)
                              ? "text-yellow-300 inline-flex"
                              : "text-gray-300 inline-flex"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        ({ratingList.length} đánh giá)
                      </span>
                    </div>
                    <span className="text-lg md:hidden">
                      Dưới đây là thông tin về sản phẩm đã được khách hàng đánh
                      giá.
                    </span>
                  </div>
                  <div className="border md:hidden"></div>
                  <div className="w-1/2 flex flex-col justify-center md:hidden">
                    {calculateRatingPercentages(ratingList)
                      .reverse()
                      .map((percentage, index) => (
                        <div
                          key={index}
                          className="flex items-center mb-2 gap-2"
                        >
                          {[...Array(5)].map((_, starIndex) => (
                            <FaStar
                              key={starIndex}
                              className={`${
                                starIndex < 5 - index
                                  ? "text-yellow-300 size-4 xl:size-3"
                                  : "text-gray-300 size-4 xl:size-3"
                              }`}
                            />
                          ))}
                          <div className="relative w-6/12 xl:w-5/12 bg-gray-200 h-3 rounded">
                            <div
                              className="h-full bg-green-500 transition-all duration-300 rounded"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="ml-2">{percentage}</span>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="flex flex-row gap-3 items-center md:hidden">
                  <h3 className="font-semibold">Lọc Theo:</h3>
                  <div className="flex flex-row gap-2">
                    {filterbutton.map((filter, index) => (
                      <button
                        key={index}
                        className={`text-black px-3 py-1 rounded-lg border ${
                          index === 0
                            ? "bg-green-700 text-white"
                            : "bg-white text-black border hover:bg-green-700 hover:text-white focus:bg-green-700 focus:text-white"
                        }`}
                      >
                        {filter.star}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col p-4 md:p-0 border-b border-gray-300 gap-3">
                  {ratingList.map((rating, index) => (
                    <div key={rating.id} className="flex flex-col gap-1">
                      <div className="flex flex-row gap-2 items-center mb-2">
                        <Image
                          src={rating.avatar}
                          alt=""
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex flex-col">
                          <h2 className="text-lg font-semibold">
                            {rating.name}
                          </h2>
                          <span className="text-gray-500 text-sm">
                            {rating.date}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center mb-1">
                        <span className="flex flex-row gap-1">
                          {[...Array(5)].map((_, index) => (
                            <FaStar
                              key={index}
                              className={`${
                                index < Math.floor(rating.rate)
                                  ? "text-yellow-300"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </span>
                        <span className="ml-2 font-medium">
                          {getRatingMessage(rating.rate)}
                        </span>
                      </div>
                      <span className="text-gray-700">{rating.comment}</span>
                      <div className="flex gap-2 mt-2">
                        {rating.img.map((image, index) => (
                          <Image
                            key={index}
                            src={image}
                            alt={`Hình ảnh sản phẩm ${index + 1}`}
                            width={100}
                            height={100}
                            className="w-24 h-24 rounded-md"
                          />
                        ))}
                      </div>
                      <div className="flex flex-row items-start gap-2 rounded-xl p-3 bg-gray-100 mt-2">
                        <img
                          src={rating.brandsLogo}
                          alt="Review Image"
                          className="w-10 h-10 rounded-full my-1"
                        />
                        <div>
                          <p className="font-bold text-lg">
                            {rating.brandname}
                          </p>
                          <span className="hidden md:block">
                            <RatingDetail key={rating.id} rating={rating} />
                          </span>
                          <span className="md:hidden text-gray-500 text-md">
                            {rating.details}
                          </span>
                        </div>
                      </div>
                      {index !== ratingList.length - 1 && (
                        <div className="border w-full md:hidden"></div>
                      )}
                    </div>
                  ))}
                  {/* {ratingList.length > 5 && (
                    <button
                      onClick={toggleShowAll}
                      className="text-blue-500 mt-4 hidden"
                    >
                      {showAll ? "Ẩn bớt" : "Xem thêm"}
                    </button>
                  )} */}
                </div>
              </div>
            </div>
          )}
        {/* Review and Rating section */}
        </div>
        {/* User Order Information section */}
        <div className="w-1/4 inline-flex flex-col gap-4 sticky h-fit top-0 right-0 md:w-full md:grid md:grid-cols-1">
          <OrderCheckout
            brandLogo={productData.brand.avatarUrl}
            brandName={productData.brand.name}
            // TODO: need enhance - read the upper reason
            product={productInfo}
          />
          <AdsBanner
            imgURL="/images/tea-ads.png"
            position="full"
            className="w-full h-40"
          />
        </div>
      </div>
      {/* Relative Products section */}
      <div className="p-5 bg-white rounded-xl shadow-inner">
        <ProductTitle title="Sản phẩm liên quan" style="normal" href="" />
        <StackedList>
          {relativeProducts &&
            relativeProducts.map((item: CartItemMdl) => (
              <CartItem
                key={item.id}
                itemMdl={item}
                href={`/${item.name}?productID=${item.id}`}
              />
            ))}
        </StackedList>
      </div>
    </main>
  );
};

export default ProductDetailPage;
