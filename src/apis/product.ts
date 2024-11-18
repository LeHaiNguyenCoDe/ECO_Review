import { SERVER_ALIAS } from "@/constants/app";

import CartItemMdl from "@/models/products/card-item";
import DiscountMdl from "@/models/products/discount";
import ProductDetailMdl from "@/models/products/product-detail";
import { UserOrderMdl } from "@/models/users/order";
import { safeDataFetching, safePostRequest } from "@/utils/http";

const getTopDealProducts = (needRevalidate: boolean) => {
  return safeDataFetching<CartItemMdl[]>(
    `${SERVER_ALIAS}/products/top-deals?page=0&size=4`,
    needRevalidate
  );
};

const getBestSellingProducts = (needRevalidate: boolean) => {
  return safeDataFetching<CartItemMdl[]>(
    `${SERVER_ALIAS}/products/featured-products?page=0&size=4`,
    needRevalidate
  );
};

const getNewProducts = (needRevalidate: boolean) => {
  return safeDataFetching<CartItemMdl[]>(
    `${SERVER_ALIAS}/products/new-products?page=0&size=4`,
    needRevalidate
  );
};

const getProductDetailsByID = (id: string) => {
  return safeDataFetching<ProductDetailMdl>(
    `${SERVER_ALIAS}/products/id=${id}`
  );
};

const getRelativeProductsByCategory = (categoryID: string) => {
  return safeDataFetching<CartItemMdl[]>(
    `${SERVER_ALIAS}/products/categoryId=${categoryID}`,
    false
  );
};

const getDiscountByProduct = () => {
  return safeDataFetching<DiscountMdl[]>(`${SERVER_ALIAS}/discounts`, false);
};

const postUserOrder = (data: UserOrderMdl) => {
  return safePostRequest<string, UserOrderMdl>(`${SERVER_ALIAS}/orders`, data);
};

export {
  getTopDealProducts,
  getBestSellingProducts,
  getNewProducts,
  getRelativeProductsByCategory,
  getProductDetailsByID,
  getDiscountByProduct,
  postUserOrder
};
