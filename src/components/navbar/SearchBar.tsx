"use client"; // Chỉ sử dụng "use client" trong file này để cho phép sử dụng các sự kiện tương tác

import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";

interface SearchBarProps {
  className?: string; // Add this line to define className as a prop
}

export default function SearchBar({ className }: SearchBarProps) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const recentSearches = ["Rửa Chén", "muối lá é", "mật hoa dừa"];
  const popularSearches = [
    "Nước mắm Vịnh Vân Phong (Chai du lịch mini)",
    "Muối Lá É Dì Hưng",
    "Nước Rửa Chén Bồ Hòn Chai 500 ml",
  ];

  const popularCategories = [
    { name: "Nước Mắm", icon: "🍶" },
    { name: "Nước Tương", icon: "🍶" },
    { name: "Rượu", icon: "🍷" },
    { name: "Muối & Đường & Bột", icon: "🧂" },
    { name: "Mật & Hạt", icon: "🍯" },
  ];

  const showDropdown = () => {
    setDropdownVisible(true);
  };

  const hideDropdown = () => {
    setTimeout(() => setDropdownVisible(false), 150);
  };
  const handleSearchClick = () => {
    window.location.href = '/product/filter';
    setDropdownVisible(false);
  };
  return (
    <div
      className={`relative flex items-center bg-gray-100 rounded-lg px-3 py-2 w-full max-w-xl ${
        className || ""
      } ${isDropdownVisible ? "border border-green-600":""}`}
    >
      <CiSearch className="text-gray-400 mr-2" fontSize={30} />
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm tươi ngon"
        className="bg-transparent w-full outline-none text-sm text-gray-700 placeholder-gray-400"
        onFocus={showDropdown}
        onBlur={hideDropdown}
      />

      {/* Dropdown Search */}
      {isDropdownVisible && (
        <div
          id="searchDropdown"
          className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-2 p-4 z-10"
          onMouseDown={(e) => e.preventDefault()} // Ngăn dropdown ẩn khi click bên trong
        >
          {/* Recent Searches */}
          <div className="mb-4">
            <h3 className="text-green-600 font-semibold text-sm mb-2">
              Lịch sử tìm kiếm
            </h3>
            {recentSearches.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-1 cursor-pointer text-gray-800 text-sm hover:bg-gray-100 rounded-md px-2"
              >
                <div className="flex items-center" onClick={handleSearchClick}>
                  <CiSearch className="mr-2 text-gray-400" />
                  <span>{item}</span>
                </div>
                <AiOutlineClose className="text-gray-400 cursor-pointer" />
              </div>
            ))}
          </div>

          {/* Popular Searches */}
          <div className="mb-4">
            <h3 className="text-green-600 font-semibold text-sm mb-2">
              Tìm kiếm phổ biến
            </h3>
            {popularSearches.map((item, index) => (
              <div
                key={index}
                className="flex items-center py-1 cursor-pointer text-gray-800 text-sm hover:bg-gray-100 rounded-md px-2"
                onClick={handleSearchClick}
              >
                <CiSearch className="mr-2 text-gray-400" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="text-green-600 font-semibold text-sm mb-2">
              Danh mục nổi bật
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {popularCategories.map((category, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center py-2 px-4 bg-gray-100 rounded-md cursor-pointer hover:bg-green-100"
                  onClick={handleSearchClick}
                >
                  <span className="mr-2">{category.icon}</span>
                  <span>{category.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
