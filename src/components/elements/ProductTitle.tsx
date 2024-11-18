import Link from "next/link";
import React from "react";

interface ProductTitleProps {
  title: string;
  style: "hot" | "normal";
  href: string;
}

const ProductTitle = ({ title, style, href }: ProductTitleProps) => {
  return (
    <div className="flex justify-between items-center select-none">
      <h2
        className={`text-xl font-semibold ${
          style == "hot" ? "text-red-500" : "text-slate-800"
        }`}
      >
        {title}
      </h2>
      <Link href={href} className="block text-sm text-green-800">
        Xem tất cả
      </Link>
    </div>
  );
};

export default ProductTitle;
