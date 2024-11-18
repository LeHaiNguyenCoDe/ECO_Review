import React from "react";
import { motion } from "framer-motion";

type Props = {
  currentPage: number;
  setPage: (a: number, b?: number) => void;
  pages: Array<number>;
  autoSlide: boolean;
  setAutoSlide: (value: boolean) => void;
};

function Pagination({ currentPage, setPage, pages }: Props) {
  return (
    <motion.div
      className="lg:hidden flex justify-center absolute bottom-2 xl:bottom-10"
      layout
    >
      {pages.map((page) => (
        <Dot
          key={page}
          onClick={() => {
            setPage(page);
          }}
          isSelected={page === currentPage}
        />
      ))}
    </motion.div>
  );
}

type DotProps = {
  isSelected: boolean;
  onClick: () => void;
};

function Dot({ isSelected, onClick }: DotProps) {
  return (
    <div className="p-1 cursor-pointer" onClick={onClick}>
      <div className={`bg-neutral-400 rounded relative w-6 h-0.5`}>
        {isSelected && (
          <motion.div
            className="bg-gradient-to-b from-green-200 to-green-400 rounded w-full h-full absolute"
            layoutId="highlight"
          />
        )}
      </div>
    </div>
  );
}

export default Pagination;
