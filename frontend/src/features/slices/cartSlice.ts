import { createSlice } from "@reduxjs/toolkit";
import { ICartItemState } from "../../types/interfaces";

const initialState: ICartItemState = {
  items:
    (localStorage.getItem("cart") &&
      JSON.parse(localStorage.getItem("cart"))) ||
    [],
  totalQuantity: 0,
  total: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state: ICartItemState) => {
      state.items = [];
    },
    addItem: (state: ICartItemState, action) => {
      state.items = action.payload;
    },
    removeItem: (state: ICartItemState, action) => {
      const iId = action.payload;
      state.items = state.items.filter((item) => item.id !== iId);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    increase: (state, { payload }) => {
      const cartItem = state.items.find((item) => item.id === payload.id);
      cartItem.quantity = cartItem.quantity + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.items.find((item) => item.id === payload.id);
      cartItem.quantity = cartItem.quantity - 1;
    },
    calculateTotals: (state) => {
      let totalQuantity = 0;
      let total = 0;
      state.items.forEach((item) => {
        totalQuantity += item.quantity;
        total +=
          item.quantity * (item.price + item.price * (item.taxSlab / 100));
      });
      state.totalQuantity = totalQuantity;
      state.total = total;
    },
  },
});

export const {
  clearCart,
  increase,
  decrease,
  removeItem,
  addItem,
  calculateTotals,
} = cartSlice.actions;
export default cartSlice.reducer;
