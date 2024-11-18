import { ICartPayload } from "@/lib/types";
import BrandMdl from "@/models/users/brand";

class OrderCalculator {
  private readonly cartItems: ICartPayload[];

  private totalQty: number = 0;
  private temPrice: number = 0;
  private discountPrice: number = 0;
  private promotionPrice: number = 0;

  constructor(cartItems: ICartPayload[] = []) {
    this.cartItems = cartItems;

    this.totalQty = this.computeTotalQty();
    this.temPrice = this.computeTemporaryPrice();
    this.discountPrice = this.computeDiscountPrice();
    this.promotionPrice = this.computePromotionalPrice();
  }

  private computeTemporaryPrice(): number {
    let ret = 0;

    this.cartItems.forEach((val) => {
      ret += val.itemMdl.inventories[0].price * val.quantity;
    });

    return ret;
  }

  private computeDiscountPrice(): number {
    // TODO: [EW-101] will change later by business
    // let ret = 0;

    // this.cartItems.forEach((val) => {
    //   ret +=
    //     val.itemMdl.price *
    //     ((val.itemMdl.discount?.discountPercent || 100) / 100) *
    //     val.quantity;
    // });

    return 0;
  }

  private computePromotionalPrice(): number {
    return this.temPrice - this.discountPrice;
  }

  private computeTotalQty(): number {
    return this.cartItems.reduce((total, val) => total + val.quantity, 0);
  }

  /**
   * Sorts the items in the cart by brand.
   *
   * @returns A map containing the sorted items grouped by brand.
   */
  sortItemsByBrand(): Map<
    string,
    {
      brand: BrandMdl;
      products: ICartPayload[];
    }
  > {
    const brandInfo = new Map<string, BrandMdl>();
    const itemsByBrand = new Map<string, Map<string, ICartPayload>>();

    this.cartItems.forEach((payload) => {
      const cartItem = payload.itemMdl;

      if (!itemsByBrand.has(cartItem.brand.id)) {
        itemsByBrand.set(cartItem.brand.id, new Map());
      }

      itemsByBrand.get(cartItem.brand.id)?.set(cartItem.id, payload);
      brandInfo.set(cartItem.brand.id, cartItem.brand);
    });

    const ret = new Map();
    itemsByBrand.forEach((item, key) => {
      if (brandInfo.has(key))
        ret.set(key, {
          brand: brandInfo.get(key) || { id: key },
          products: [...item.values()],
        });
    });

    return ret;
  }

  getTemPrice(): number {
    return this.temPrice;
  }

  getDiscountPrice(): number {
    return this.discountPrice;
  }

  getPromotionPrice(): number {
    return this.promotionPrice;
  }

  getTotalQty(): number {
    return this.totalQty;
  }
}

export default OrderCalculator;
