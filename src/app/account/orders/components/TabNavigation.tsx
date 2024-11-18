interface TabNavigationProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
  }
  
  const tabs = [
    { key: "all", label: "Tất cả" },
    { key: "pending", label: "Chờ thanh toán" },
    { key: "processing", label: "Chờ lấy hàng" },
    { key: "shipping", label: "Chờ giao hàng" },
    { key: "delivered", label: "Đã giao" },
    { key: "canceled", label: "Đã hủy" },
    { key: "returned", label: "Trả hàng/Hoàn tiền" },
  ];
  
  export default function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
    return (
      <div className="bg-white rounded-lg shadow-md w-[70.31rem] lg:w-full flex overflow-x-auto whitespace-nowrap">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`px-6 py-4 ${
              activeTab === tab.key
                ? "text-primary border-b-2 border-primary"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  }
  