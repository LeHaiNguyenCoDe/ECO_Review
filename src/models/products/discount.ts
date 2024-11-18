import { DateTime } from "next-auth/providers/kakao";

type DiscountMdl = {
  id: string;
  name: string;
  type: string;
  discountCode: string;
  discountPrice: number;
  discountPercent: number;
  maxDiscountPrice: number;
  minOrderPrice: number;
  discountCons?: string[];
  expiredDate?: DateTime;
  description?: string;
};

export default DiscountMdl;
