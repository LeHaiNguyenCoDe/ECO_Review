import { SERVER_ALIAS } from "@/constants/app";

import { ProductCategoryMdl } from "@/models/products/category";
import { safeDataFetching } from "@/utils/http";

const getProductCategories = async () => {
  return safeDataFetching<ProductCategoryMdl[]>(
    `${SERVER_ALIAS}/categories`,
    false
  );
};

const getTopSellingProductCategories = async () => {
  return safeDataFetching<ProductCategoryMdl[]>(
    `${SERVER_ALIAS}/categories`,
    true
  );
};

export { getProductCategories, getTopSellingProductCategories };
