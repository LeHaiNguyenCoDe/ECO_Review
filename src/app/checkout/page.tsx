"use client";

import { getTopDealProducts } from "@/apis/product";
import ShoppingCart from "./components/ShoppingCart";
import AdsBanner from "@/components/elements/AdsBanner";
import CartItem from "@/components/elements/CartItem";
import ProductTitle from "@/components/elements/ProductTitle";
import CompanyPolicies from "@/components/footer/CompanyPolicies";
import StackedList from "@/components/collection/StackedList";
import { useAppSelector } from "@/hooks/redux";
import { ICartPayload } from "@/lib/types";
import CartItemMdl from "@/models/products/card-item";
import React, { useEffect, useState } from "react";
import OrderSummary from "./components/OrderSummary";
import EmptyCart from "./components/EmptyCart";
import OrderCalculator from "@/utils/calculator";

const ShoppingCartPage = () => {
  const cartState = useAppSelector((state) => state.cart);

  const [cal, setCal] = useState<OrderCalculator>(new OrderCalculator());

  const [topDealProducts, setTopDealProducts] = useState<CartItemMdl[]>();

  const [checkedItems, setCheckedItems] = useState<ICartPayload[]>();

  useEffect(() => {
    getTopDealProducts(false).then((data) => {
      setTopDealProducts(data);
    });
  }, []);

  useEffect(() => {
    setCal(new OrderCalculator(cartState.items))
  }, [cartState.items])

  return (
    <div>
      <main className="px-default gap-3 flex flex-col h-fit">
          {cal.getTotalQty() > 0 ? (
            <>
              {/* Shopping Cart section with user orders */}
              <h2 className="text-xl font-semibold mt-6 select-none hover:text-primary h-fit w-fit">
                Giỏ hàng của bạn
              </h2>
              <div className="flex md:grid flex-row gap-4 mt-3 overflow-visible">
                {/* Shopping products cart */}
                <div className="w-3/4  md:w-full flex flex-col gap-3 text-sm">
                  <ShoppingCart
                    onCheckedItems={(val) => {
                      setCheckedItems(val);
                    }}
                  />
                </div>
                {/* Order Summary */}
                <div className="w-1/4 md:w-full min-w-80 min-h-72 h-fit flex flex-col gap-4 sticky top-0">
                  <OrderSummary items={checkedItems || []} />
                  <AdsBanner
                    imgURL="/images/tea-ads.png"
                    position="full"
                    className="w-full h-40 select-none pointer-events-none"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Shopping Cart section without user orders */}
              <EmptyCart />
              {/* Top Selling Products section */}
              <div className="bg-white rounded-lg p-4 shadow-inner">
                <ProductTitle title="Sản phẩm bán chạy" style="normal" href="" />
                <StackedList>
                  {topDealProducts &&
                    topDealProducts.map((item: CartItemMdl) => (
                      <CartItem
                        key={item.id}
                        itemMdl={item}
                        href={`/product/${item.name}?productID=${item.id}`}
                      />
                    ))}
                </StackedList>
              </div>
              {/* Relative Products section */}
              <div className="bg-white rounded-lg p-4 shadow-inner">
                <ProductTitle title="Sản phẩm liên quan" style="normal" href="" />
                <StackedList>
                  {topDealProducts &&
                    topDealProducts.map((item: CartItemMdl) => (
                      <CartItem
                        key={item.id}
                        itemMdl={item}
                        href={`/product/${item.name}?productID=${item.id}`}
                      />
                    ))}
                </StackedList>
              </div>
            </>
          )}
          {/* Eco-HHB Policies section */}
        
          <div></div>
        </main>
      <CompanyPolicies />
    </div>
    
  );
};

export default ShoppingCartPage;
