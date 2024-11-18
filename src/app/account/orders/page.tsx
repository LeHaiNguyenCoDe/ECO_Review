"use client";

import { useState } from "react";
import SearchBox from "./components/SearchBox";
import TabNavigation from "./components/TabNavigation";
import OrderCard from "./components/OrderCard";
import { ordersData, Order } from "./store/ordersData";

export default function OrderList() {
  const [activeTab, setActiveTab] = useState<string>("pending");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredOrders = ordersData.filter((order: Order) => {
    const matchesStatus = activeTab === "all" || order.status === activeTab;
    const matchesSearch =
      order.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderId.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="flex-grow lg:p-4 p-8">
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {filteredOrders.length > 0 ? (
        filteredOrders.map((order: Order) => (
          <OrderCard key={order.id} order={order} />
        ))
      ) : (
        <div className="text-center text-gray-500">Không có đơn hàng nào</div>
      )}
    </div>
  );
}
