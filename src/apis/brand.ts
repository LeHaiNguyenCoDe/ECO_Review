import { SERVER_ALIAS } from "@/constants/app";
import DiscountMdl from "@/models/products/discount";
import { safeDataFetching } from "@/utils/http";

// TODO: enhance later with [EW-101]
const getDiscountVoucherByUserID = () => {
  return safeDataFetching<DiscountMdl>(`${SERVER_ALIAS}/discounts`);
};

export { getDiscountVoucherByUserID };
