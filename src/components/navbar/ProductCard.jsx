import React from "react";

const ProductCard = ({ title, content }) => {
  return (
    <div>
      <h2 className="font-bold text-lg">{title}</h2>
      <p>{content}</p>
    </div>
  );
};

export default ProductCard;
