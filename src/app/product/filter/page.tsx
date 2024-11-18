"use client";
import DailyRecommendation from "@/components/data/DailyRecommendation";
import CartItem from "@/components/elements/CartItem";
import CartItemMdl from "@/models/products/card-item";
import { cartItems } from "../../store/dailyRecommendationData";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import {
  numPages,
  sortingItemsBrand,
  sortingItemsPrice,
  sortingItemsType,
  sortingItemsWeight,
} from "./dataFilter";
export default function filter() {
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isInteractingWithDropdown, setIsInteractingWithDropdown] =
    useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [filteredItems, setFilteredItems] = useState<CartItemMdl[]>(cartItems);

  const [defaultSuggestions, setDefaultSuggestions] = useState([
    "Nước mắm Vịnh Vân Phong (Chai du lịch mini)",
    "Muối Lá É Dì Hưng",
    "Nước Rửa Chén Bồ Hòn Chai 500 ml",
  ]);
  // Danh mục nổi bật
  const [categories, setCategories] = useState([
    { name: "Nước Mắm", icon: "🍶" },
    { name: "Nước Tương", icon: "🍶" },
    { name: "Rượu", icon: "🍷" },
    { name: "Muối & Đường & Bột", icon: "🧂" },
    { name: "Muối & Đường & Bột", icon: "🧂" },
    { name: "Mật & Hạt", icon: "🍯" },
  ]);

  const handleMouseDownOnDropdown = () => {
    setIsInteractingWithDropdown(true);
  };

  const handleBlur = () => {
    if (!isInteractingWithDropdown) {
      setShowDropdown(false);
    }
    setIsInteractingWithDropdown(false);
  };

  const handleFocus = () => {
    setShowDropdown(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length > 0) {
      setShowDropdown(true);
      const filtered = cartItems.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(cartItems);
      setShowDropdown(false);
    }
  };

  const filterItems = (keyword: string) => {
    const lowercasedKeyword = keyword.toLowerCase();
    const filtered = cartItems.filter((item) =>
      item.name.toLowerCase().includes(lowercasedKeyword)
    );
    setFilteredItems(filtered);
  };

  const handleSearch = () => {
    if (search.trim() === "") return;

    if (!searchHistory.includes(search)) {
      const updatedHistory = [search, ...searchHistory.slice(0, 4)];
      setSearchHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    }

    filterItems(search); 
    setShowDropdown(false);
  };

  const handleSuggestionClick = (value: string) => {
    setSearch(value);
    setShowDropdown(false);
  };
  return (
    <main className="flex flex-col w-full px-10 xl:px-0 pb-5 md:p-0 gap-3">
      <div className="flex flex-col items-center gap-5 bg-white md:bg-transparent p-4 md:pt-0 -mx-10 lg:-mx-0">
        <h2 className="font-bold text-2xl text-green-700">
          Kết quả tìm kiếm {"(" + filteredItems.length + ")"}
        </h2>
        <div className="relative flex-1 flex items-center bg-white border border-black/10 rounded-xl text-gray-600 text-sm w-1/2 md:w-full">
          <CiSearch className="ml-2 size-7" />
          <Input
            type="text"
            value={search}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Tìm kiếm sản phẩm tươi ngon"
            className="w-full pl-2 pr-4 placeholder:text-sm border-none focus:ring-0 rounded-r-xl"
            style={{
              border: "0",
              boxShadow: "none",
              height: "2.75rem",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          {showDropdown && (
            <div
              className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50"
              onMouseDown={handleMouseDownOnDropdown}
            >
              {/* Nội dung dropdown */}
              <div className="flex items-center py-2 px-4 border-gray-300 rounded-lg text-sm text-gray-500 font-bold h-[2.5rem] bg-[#F1FFF3]">
                Tìm kiếm phổ biến
              </div>
              {searchHistory.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center py-2 px-4 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(item)}
                >
                  <CiSearch className="mr-2" />
                  <span>{item}</span>
                </div>
              ))}
              <div className="flex items-center py-2 px-4 border-gray-300 rounded-lg text-sm text-gray-500 font-bold h-[2.5rem] bg-[#F1FFF3]">
                Gợi ý tìm kiếm
              </div>
              {defaultSuggestions.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center py-2 px-4 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(item)}
                >
                  <CiSearch className="mr-2" />
                  <span>{item}</span>
                </div>
              ))}
              <div className="flex items-center py-2 px-4 border-gray-300 rounded-lg text-sm text-gray-500 font-bold h-[2.5rem] bg-[#F1FFF3]">
                Danh mục nổi bật
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2 p-4">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center py-2 px-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSuggestionClick(category.name)}
                  >
                    <span className="mr-2">{category.icon}</span>
                    <span>{category.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-5 w-full justify-between">
        <div className={`flex flex-row md:flex-row items-center space-x-2 overflow-x-auto mx-20 xl:mx-10 mt-2 ${filteredItems.length === 0 ? "hidden":""}`}>
          <span className="text-gray-400 text-lg md:hidden">Sắp xếp theo</span>
          <div className="flex items-center gap-4 md:border md:border-black rounded-md">
            <span className="border p-2 rounded-md border-none bg-white whitespace-nowrap">
              Bộ lọc
            </span>
          </div>
          <div className="flex items-center gap-4 md:border md:border-black rounded-md">
            <select className="border p-2 border-none w-20 rounded-md">
              <option>Giá</option>
              {sortingItemsPrice.map((option) => (
                <option key={option.id}>{option.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-4 md:border md:border-black rounded-md">
            <select className="border p-2 rounded-md border-none">
              <option>Loại</option>
              {sortingItemsType.map((option) => (
                <option key={option.id}>{option.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-4 md:border md:border-black rounded-md">
            <select className="border p-2 rounded-md border-none w-36">
              <option>Thương hiệu</option>
              {sortingItemsBrand.map((option) => (
                <option key={option.id}>{option.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-4 md:border md:border-black rounded-md">
            <select className="border p-2 rounded-md border-none w-32">
              <option>Khối lượng</option>
              {sortingItemsWeight.map((option) => (
                <option key={option.id}>{option.name}</option>
              ))}
            </select>
          </div>
        </div>
        <DailyRecommendation
          direction="horizontal"
          itemsPerRow={5}
          itemsPerRowxl={4}
          itemsPerRowmd={3}
          itemsPerRowsm={2}
          isFilterPage={true}
          className="flex flex-col gap-1"
        >
          {filteredItems &&
            filteredItems.map((item: CartItemMdl) => (
              <CartItem
                key={item.id}
                itemMdl={item}
                href={`/product/${item.name}?productID=${item.id}`}
                isFilterPage={true}
              />
            ))}
        </DailyRecommendation>
        <div className={`flex space-x-2 overflow-x-auto justify-center items-center md:mb-5 ${filteredItems.length === 0 ? "hidden":""}`}>
          {numPages.map((category, index) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-lg text-sm md:text-xs whitespace-nowrap font-medium transition-all duration-200 ${
                index === 1
                  ? "bg-green-700 text-white"
                  : "bg-white text-green-800 hover:bg-green-700 hover:text-white focus:bg-green-700 focus:text-white"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className={`${filteredItems.length === 0 ? "":"hidden"}`}>
          <span>Không có sản phẩm tìm kiếm...</span>
        </div>
      </div>
    </main>
  );
}
