import BrandMdl from "../users/brand";
import DiscountMdl from "./discount";
import { InventoryMdl } from "./inventory";

type CartItemMdl = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  rating?: number;
  quantitySold?: number;
  inventories: InventoryMdl[];
  discount?: DiscountMdl;
  brand: BrandMdl;
};

export default CartItemMdl;
