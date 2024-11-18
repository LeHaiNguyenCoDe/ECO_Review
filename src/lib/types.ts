import CartItemMdl from "@/models/products/card-item";

export interface ICartPayload {
  itemMdl: CartItemMdl;
  quantity: number;
}
