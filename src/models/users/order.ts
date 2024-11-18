type UserOrderMdl = {
  orderInfoList: {
    productId: string;
    quantity: number;
    productInventoryId: string;
  }[];
  shippingAddress: string;
  discountCode: string;
  phoneNumber: string;
  email: string;
  customerName: string;
  subTotalPrice: number;
  shippingPrice: number;
  discountPrice: number;
  totalPrice: number;
};

export type {UserOrderMdl}