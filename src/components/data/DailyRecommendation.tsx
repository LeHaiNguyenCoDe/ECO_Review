"use client";

import React, { useState, useEffect } from "react";

interface StackedListProps {
  children: React.ReactNode;
  direction?: "vertical" | "horizontal";
  itemsPerRow?: number;
  itemsPerRowxl?: number;
  itemsPerRowmd?: number;
  itemsPerRowsm?: number;
  itemsToShow?: number;
  isFilterPage?: boolean;
  className?: string;
}

const DailyRecommendation = ({
  children,
  direction = "vertical",
  itemsPerRow = 5,
  itemsPerRowxl = 4,
  itemsPerRowmd = 4,
  itemsPerRowsm = 4,
  isFilterPage = false,
  itemsToShow,
  className,
}: StackedListProps) => {
  const childrenArr = React.Children.toArray(children);
  const limitedChildren = itemsToShow
    ? childrenArr.slice(0, itemsToShow)
    : childrenArr;

  const [itemsPerRowCount, setItemsPerRowCount] = useState(itemsPerRow);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setItemsPerRowCount(itemsPerRow);
      } else if (window.innerWidth >= 1024) {
        setItemsPerRowCount(itemsPerRowxl);
      } else if (window.innerWidth >= 768) {
        setItemsPerRowCount(itemsPerRowmd);
      } else {
        setItemsPerRowCount(itemsPerRowsm);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [itemsPerRow, itemsPerRowxl, itemsPerRowmd, itemsPerRowsm]);

  const chunkArray = (arr: React.ReactNode[], chunkSize: number) => {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  };

  const rows =
    direction === "horizontal"
      ? chunkArray(limitedChildren, itemsPerRowCount)
      : [limitedChildren];

  return (
    <div className={`mt-2 w-full ${className || ""}`}>
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex ${
            direction === "horizontal" ? "flex-row" : "flex-col"
          } gap-4 md:gap-2 overflow-x-auto my-2 ${isFilterPage ? "justify-center md:gap-4" : ""}`}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {row.map((element, index) => (
            <div key={index}>
              {element}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DailyRecommendation;
