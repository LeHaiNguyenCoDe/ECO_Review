import {
  getBestSellingProducts,
  getNewProducts,
  getTopDealProducts,
} from "@/apis/product";
import AdsBanner from "@/components/elements/AdsBanner";
import CartItem from "@/components/elements/CartItem";
import ProductTitle from "@/components/elements/ProductTitle";
import HeroSlider from "@/components/heroslider/HeroSlider";
import StackedList from "@/components/collection/StackedList";
import AdsBannerStackedList from "@/components/collection/AdsBannerStackedList";
import SideBar from "@/components/sidebar/SideBar";
import CartItemMdl from "@/models/products/card-item";
import React from "react";
import {
  imagePartner,
  listItems,
  categoryListItems,
} from "@/components/data/store/stackedListData";
import DailyRecommendation from "@/components/data/DailyRecommendation";
import { cartItems } from "./store/dailyRecommendationData";

const HomePage = async () => {
  const topDealProducts = await getTopDealProducts(true);

  const bestSellingProducts = await getBestSellingProducts(true);

  const newProducts = await getNewProducts(true);
  return (
    <main className="flex flex-col w-full px-10 pt-5 md:p-2 gap-3">
      <div className="flex flex-row gap-5 overflow-visible">
        {/* Sidebar section */}
        <div className="w-[25%] sticky top-3 left-0 h-fit md:hidden">
          <SideBar isAccountPage={false} isSidebarOpen={true} />
          <AdsBanner
            imgURL="/images/maps-ads.png"
            imgWidth={163}
            imgHeight={116}
            position="bottom right"
            className="bg-[#FFA439] h-44 mt-3"
          >
            <span className="absolute block text-white font-bold text-base font-sansita w-1/3 xl:w-full top-3 px-2">
              Giao hàng đúng giờ, không lo chờ đợi
            </span>
          </AdsBanner>
        </div>

        <div className="w-[75%] flex flex-col gap-5 md:gap-4 md:w-full">
          <HeroSlider />
          <div className="bg-white md:bg-transparent md:shadow-none rounded-lg p-4 shadow-inner md:p-2">
            <ProductTitle title="Top Deal - Siêu rẻ" style="hot" href="" />
            <StackedList>
              {topDealProducts &&
                topDealProducts.map((item: CartItemMdl) => (
                  <CartItem
                    key={item.id}
                    itemMdl={item}
                    href={`/product/${item.name}?productID=${item.id}`}
                    isFilterPage={false}
                  />
                ))}
            </StackedList>
          </div>
          {/* Advertisement section */}
          <div className="hidden xl:block">
            <AdsBannerStackedList />
          </div>
          <div className="md:flex-col flex flex-row gap-4 justify-between xl:hidden">
            <AdsBanner
              imgURL={"/images/market-ads.png"}
              imgWidth={140}
              imgHeight={70}
              position="bottom right"
              className="bg-[#FFF7DD] h-48 w-full md:h-40 relative flex flex-col"
            >
              <span className="absolute block text-green-800 font-bold text-2xl xl:text-3xl md:text-lg font-sansita w-8/12 top-3 left-3">
                Chia sẻ niềm vui, kết nối cảm xúc!
              </span>
              <a href="#" className="my-auto mx-4">
                <button className="rounded-lg border-2 text-lg text-white bg-green-700 mt-10 p-1.5">
                  Xem ngay {">"}
                </button>
              </a>
            </AdsBanner>
            <AdsBanner
              imgURL="/images/fruits-store-ads.png"
              imgWidth={140}
              imgHeight={200}
              position="bottom right"
              className="bg-[#DFFFE4] h-48 w-full md:h-40 relative flex flex-col"
            >
              <span className="absolute block text-green-800 font-bold text-2xl md:text-lg font-sansita w-8/12 top-3 left-3">
                Chia sẻ niềm vui, kết nối cảm xúc!
              </span>
              <a href="#" className="my-auto mx-4">
                <button className="rounded-lg border-2 text-lg text-white bg-green-700 p-1.5 mt-10">
                  Xem ngay {">"}
                </button>
              </a>
            </AdsBanner>
            <AdsBanner
              imgURL="/images/coffee-store-ads.png"
              imgWidth={120}
              imgHeight={50}
              position="bottom right"
              className="bg-[#DEE5FF] h-48 w-full md:h-40 relative flex flex-col"
            >
              <span className="text-green-800 font-bold text-2xl md:text-lg font-sansita w-8/12 md:w-8/12 text-start p-2">
                Chia sẻ niềm vui, kết nối cảm xúc!
              </span>
              <a href="#" className="my-2 mx-4">
                <button className="rounded-lg border-2 text-lg text-white bg-green-700 p-1.5">
                  Xem ngay {">"}
                </button>
              </a>
            </AdsBanner>
          </div>
          <div className="bg-white md:bg-transparent md:shadow-none rounded-lg p-4 shadow-inner md:p-2">
            <ProductTitle title="Sản phẩm bán chạy" style="normal" href="" />
            <StackedList>
              {bestSellingProducts &&
                bestSellingProducts.map((item: CartItemMdl) => (
                  <CartItem
                    key={item.id}
                    itemMdl={item}
                    href={`/product/${item.name}?productID=${item.id}`}
                    isFilterPage={false}
                  />
                ))}
            </StackedList>
          </div>
          <div className="bg-white md:bg-transparent md:shadow-none rounded-lg p-4 shadow-inner">
            <ProductTitle title="Sản phẩm mới" style="normal" href="" />
            <StackedList>
              {newProducts &&
                newProducts.map((item: CartItemMdl) => (
                  <CartItem
                    key={item.id}
                    itemMdl={item}
                    href={`/product/${item.name}?productID=${item.id}`}
                    isFilterPage={false}
                  />
                ))}
            </StackedList>
          </div>
          <div className="flex flex-col gap-2 bg-white md:bg-transparent md:shadow-none rounded-lg p-4 shadow-inner md:p-2">
            <ProductTitle title="Gợi ý hôm nay" style="normal" href="" />
            <div className="flex space-x-2 overflow-x-auto">
              {categoryListItems.map((category, index) => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-lg text-md md:text-xs whitespace-nowrap font-medium transition-all duration-200 ${
                    index === 0
                      ? "bg-green-700 text-white"
                      : "bg-green-50 text-green-800 hover:bg-green-700 hover:text-white focus:bg-green-700 focus:text-white"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <DailyRecommendation direction="horizontal" itemsPerRow={4} itemsToShow={16} className="flex flex-col gap-1">
              {cartItems &&
                cartItems.map((item: CartItemMdl) => (
                  <CartItem
                    key={item.id}
                    itemMdl={item}
                    href={`/product/${item.name}?productID=${item.id}`}
                    isFilterPage={false}
                  />
                ))}
            </DailyRecommendation>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 justify-center items-center p-4 bg-white rounded-lg">
        <h2 className="font-bold leading-7 text-2xl md:hidden">
          Đối tác của ECO-HHB
        </h2>
        <div
          className="flex justify-center xl:justify-start overflow-x-auto w-full"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="flex w-full gap-6 justify-between">
            {listItems.map((ad: imagePartner) => (
              <div
                key={ad.id}
                className="w-52 h-28 flex-shrink-0 md:w-1/5 md:h-8 bg-white hover:shadow-xl p-2 rounded-lg border md:border-none hover:scale-95 flex flex-row justify-center items-center"
              >
                <a href={ad.link}>
                  <img
                    src={ad.imgURL}
                    alt={`Image of ${ad.id}`}
                    width={ad.imgWidth}
                    height={ad.imgHeight}
                    className="object-cover md:w-3/4 h-auto"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-row bg-[#FFA439] items-center justify-center -mx-10 md:mx-0">
        <div className="w-1/5 mx-10 md:hidden">
          <img src="/images/supermarket.png" alt="#" className="w-32 h-20" />
        </div>
        <div className="flex flex-row w-4/5 md:w-full items-center md:p-2">
          <h2 className="w-4/5 text-white font-bold text-roboto leading-7 text-2xl md:text-sm md:hidden">
            Đăng ký ngay để nhận ưu đãi thành <br className="md:hidden" />
            viên từ ECO-HHB
          </h2>
          <p className="w-4/5 text-white font-bold leading-7 text-2xl md:text-sm hidden md:block">
            Đăng ký ngay để nhận ưu đãi
            <br /> thành viên từ ECO-HHB
          </p>
          <div className="w-1/5 flex justify-end mx-10 md:mx-0">
            <button className="rounded-lg text-lg text-green-700 bg-white px-6 py-2 whitespace-nowrap h-fit md:text-xs">
              <h3 className="font-medium">Đăng ký ngay</h3>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
