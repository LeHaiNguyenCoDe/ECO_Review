"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image, { StaticImageData } from "next/image";

//import banner slide
import bannerSlide from "@/public/images/banner.png";
//type
type Props = {
  currentPage: number;
  direction: number;
  pages: number[];
  setPage: (value: number, direction: number) => void;
};

const variants = {
  initial: (direction: number) => {
    return {
      x: direction > 0 ? "95%" : "-95%",
    };
  },
  animate: {
    x: 0,
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? "95%" : "-95%",
    };
  },
};

const imagesAlts = ["1", "2", "3", "4", "5", "6", "7"];
// TEST : list slide
const listSlide: Array<string | StaticImageData> = [];

function Slides({ currentPage, direction, pages, setPage }: Props) {
  // TEST: create list slide [7]
  for (let i = 0; i < 7; i++) {
    // const imgElement = document.createElement("img");
    listSlide.push(bannerSlide);
  }
  // images.forEach((image, index) => {
  //   imgElement.src = image.src;
  // });

  return (
    <div className="w-full relative aspect-[3/1.3] flex items-center">
      {/* ARROW BUTTONS */}
      <button
        role="navigation"
        aria-label="previous slide"
        className="absolute active:scale-75 group-hover:opacity-100 opacity-0 transition duration-300 left-0 xl:opacity-100 py-10 px-5 lg:px-3 sm:px-0 z-10"
        onClick={() => {
          if (currentPage === 0) {
            setPage(pages.length - 1, -1);
          } else {
            setPage(currentPage - 1, -1);
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="rounded-full h-12 w-12 xxl:h-12 xl:h-10 lg:h-8 md:h-6 xxs:h-5 xxs:w-5 text-white/90 drop-shadow-[0_3px_3px_rgb(0,0,0,.2)]"
        >
          <path
            fillRule="evenodd"
            d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <button
        role="navigation"
        aria-label="next slide"
        className="absolute active:scale-75 group-hover:opacity-100 opacity-0 transition duration-300 right-0 xl:opacity-100 py-10 px-5 lg:px-3 sm:px-0 z-10"
        onClick={() => {
          if (currentPage === pages.length - 1) {
            setPage(0, 1);
          } else {
            setPage(currentPage + 1, 1);
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="rounded-full h-12 w-12 xxl:h-12 xl:h-10 lg:h-8 md:h-6 xxs:h-5 xxs:w-5 text-white/90 drop-shadow-[0_3px_3px_rgb(0,0,0,.2)]"
        >
          <path
            fillRule="evenodd"
            d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {/* SLIDES */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          className="w-full absolute top-0"
          variants={variants}
          key={currentPage}
          data-page={currentPage}
          initial={"initial"}
          animate={"animate"}
          transition={{ type: "none" }}
          exit={"exit"}
          custom={direction}
        >
          <Image
            src={listSlide[currentPage]}
            alt={imagesAlts[currentPage]}
            className="w-full slides"
            width={1920}
            height={1080}
            priority
            loading="eager"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Slides;
