import { createSlice, PayloadAction, Reducer } from "@reduxjs/toolkit";
import { ICartPayload } from "@/lib/types";
import { RootState } from "@/lib/store";

interface CartState {
  items: ICartPayload[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<ICartPayload>) => {
      const item = action.payload;
      if (item && item.quantity > 0) {
        const indexOfItem = state.items.findIndex(
          (it) => it.itemMdl.id === item.itemMdl.id
        );

        const newItems = [...state.items];

        if (indexOfItem !== -1) {
          const newQuantity = newItems[indexOfItem].quantity + item.quantity;
          newItems[indexOfItem] = { ...item, quantity: newQuantity };
        } else {
          newItems.push({ ...item });
        }

        return {
          items: newItems,
        };
      } else {
        return { ...state };
      }
    },
    removeCartItem: (state, action: PayloadAction<ICartPayload>) => {
      const item = action.payload;

      if (item && item.quantity > 0) {
        const indexOfItem = state.items.findIndex(
          (it) => it.itemMdl.id === item.itemMdl.id
        );

        if (indexOfItem === -1) {
          return { ...state };
        }

        let newItems = [...state.items];
        const newItemQuantity = newItems[indexOfItem].quantity - item.quantity;

        if (newItemQuantity > 0) {
          newItems[indexOfItem] = { ...item, quantity: newItemQuantity };
        } else {
          newItems = newItems.filter((it) => it.itemMdl.id !== item.itemMdl.id);
        }

        return {
          items: newItems,
        };
      } else if (item.quantity === -1) {
        const removeItem = state.items.find(
          (it) => it.itemMdl.id === item.itemMdl.id
        );

        if (removeItem) {
          const newItems = state.items.filter(
            (it) => it.itemMdl.id !== removeItem.itemMdl.id
          );

          return {
            items: newItems,
          };
        }

        return { ...state };
      }
    },
    clearCart: () => {
      return { items: [], totalPrice: 0, totalQuantity: 0 };
    },
  },
});

export const { addCartItem, removeCartItem, clearCart } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart.items;
export default cartSlice.reducer as Reducer<CartState>;
