import { getDecimalPart, roundNumberToNearestHalf } from "@/utils/num";
import React from "react";
import { TiStarFullOutline, TiStarHalfOutline } from "react-icons/ti";

const Rating = ({
  avgRating,
  className,
}: {
  avgRating: number;
  className: string;
}) => {
  const haftRating = getDecimalPart(roundNumberToNearestHalf(avgRating));

  return (
    <div className="flex justify-center items-center">
      {Array.from({ length: Math.floor(avgRating) }).map((_, index) => (
        <TiStarFullOutline key={index} className={className} />
      ))}
      {haftRating !== 0 && <TiStarHalfOutline className={className} />}
    </div>
  );
};

export default Rating;
