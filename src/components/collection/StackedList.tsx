"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion as m } from "framer-motion";
import {HiOutlineChevronLeft, HiOutlineChevronRight} from 'react-icons/hi';

interface StackedListProps {
  children: React.ReactNode;
  direction?: "vertical" | "horizontal";
  className?: string;
}

/**
 * A stacked list component that renders a list of elements in either a row or column direction.
 *
 * @component
 * @param {StackedListProps<any>} props - The props for the StackedList component.
 * @param {Array<any>} props.elements - The array of elements to render in the list.
 * @param {boolean} props.direction - The direction in which the elements should be stacked. If true, elements are stacked horizontally (row direction), otherwise stacked vertically (column direction).
 * @returns {JSX.Element} The rendered StackedList component.
 */
const StackedList = ({
  children,
  direction = "horizontal",
  className,
}: StackedListProps) => {
  const childrenArr = React.Children.toArray(children);

  const [width, setWidth] = useState(0);

  const carousel = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLeftArrowVisible, setIsLeftArrowVisible] = useState(false);
  const [isRightArrowVisible, setIsRightArrowVisible] = useState(true);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);
  const handleScrollLeft = () => {
    if (carousel.current) {
      const newPosition = Math.max(scrollPosition - 300, 0);
      carousel.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };
  const handleScrollRight = () => {
    if (carousel.current) {
      const newPosition = Math.min(scrollPosition + 300, width);
      carousel.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };
  useEffect(() => {
    setIsLeftArrowVisible(scrollPosition > 0);
    setIsRightArrowVisible(scrollPosition < width);
  }, [scrollPosition, width]);

  useEffect(() => {
    const handleScroll = () =>{
      if (carousel.current) {
        setScrollPosition(carousel.current.scrollLeft);
      }
    };
    if (carousel.current) {
      carousel.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (carousel.current) {
        carousel.current.removeEventListener("scroll", handleScroll);
      }
    };
  },[]);

  return (
    <div className="flex flex-row items-center relative">
      <m.div
      ref={carousel}
      whileTap={{ cursor: "grabbing" }}
      className={`bg-white md:bg-transparent mt-2 ${
        className || ""
      } bg-white mt-2 w-full h-auto overflow-hidden relative`}
    >
      <m.ul
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        className={`flex flex-nowrap ${
          direction == "horizontal" ? "flex-row" : "flex-col"
        } gap-3 md:gap-2`}
      >
        {childrenArr.map((element, index) => {
          return <m.li key={index} className=" md:min-w-36">{element}</m.li>;
        })}
      </m.ul>
    </m.div>
    {isLeftArrowVisible &&(
      <HiOutlineChevronLeft className="size-7 cursor-pointer p-2 rounded-full bg-slate-200 absolute top-1/2 transform -translate-y-1/2 -left-7 md:hidden"
      onClick={handleScrollLeft}/>
    )}
    {isRightArrowVisible && (
      <HiOutlineChevronRight className="size-7 cursor-pointer p-2 rounded-full bg-slate-200 absolute top-1/2 transform -translate-y-1/2 -right-7 md:hidden"
      onClick={handleScrollRight}/>
    )}
    </div>
  );
};

export default StackedList;
