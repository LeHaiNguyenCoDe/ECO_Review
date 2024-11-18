"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion as m } from "framer-motion";
import AdsBanner from "@/components/elements/AdsBanner";

const adsData = [
  {
    imgURL: "/images/market-ads.png",
    imgWidth: 140,
    imgHeight: 70,
    className: "bg-[#FFF7DD] h-48 w-full md:h-40",
    title: "Chia sẻ niềm vui, kết nối cảm xúc!",
    link: "#",
  },
  {
    imgURL: "/images/fruits-store-ads.png",
    imgWidth: 140,
    imgHeight: 200,
    className: "bg-[#DFFFE4] h-48 w-full md:h-40",
    title: "Chia sẻ niềm vui, kết nối cảm xúc!",
    link: "#",
  },
  {
    imgURL: "/images/coffee-store-ads.png",
    imgWidth: 120,
    imgHeight: 50,
    className: "bg-[#DEE5FF] h-48 w-full md:h-40",
    title: "Chia sẻ niềm vui, kết nối cảm xúc!",
    link: "#",
  },
];

const AdsBannerStackedList = () => {
  const carousel = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleScrollRight();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const handleScrollRight = () => {
    if (carousel.current) {
      const newIndex = (currentIndex + 1) % adsData.length;
      const newPosition =
        newIndex * (carousel.current.scrollWidth / adsData.length);

      carousel.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });

      setCurrentIndex(newIndex);
    }
  };

  return (
    <div className="flex flex-row items-center relative">
      <m.div
        ref={carousel}
        className="bg-white mt-2 w-full h-auto overflow-hidden relative"
      >
        <m.ul className="flex flex-nowrap md:gap-2">
          {adsData.map((ad, index) => (
            <m.li key={index} className="w-2/3 flex-shrink-0">
              <AdsBanner
                imgURL={ad.imgURL}
                imgWidth={ad.imgWidth}
                imgHeight={ad.imgHeight}
                position="bottom right"
                className={`${ad.className} flex flex-col p-2`}
              >
                <span className="block text-green-800 font-bold text-2xl font-sansita w-11/12 lg:text-sm md:text-lg">
                  {ad.title}
                </span>
                <a href={ad.link} className="flex mb-2">
                  <button className="rounded-lg border-2 text-lg lg:text-sm md:text-xs text-white bg-green-700 p-1.5 xl:mt-5">
                    Xem ngay {">"}
                  </button>
                </a>
              </AdsBanner>
            </m.li>
          ))}
        </m.ul>
      </m.div>
    </div>
  );
};

export default AdsBannerStackedList;
