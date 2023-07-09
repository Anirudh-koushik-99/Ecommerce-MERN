import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      //CALCULATE ITEMS PRICE
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      //CALCULATE SHIPPING PRICE (for order over 100$ shipping free else 10$ shipping price)
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

      //CALCULATE TAX PRICE (15% tax price on all items)
      state.taxPrice = addDecimals(
        Number((state.itemsPrice * 0.15).toFixed(2))
      );

      //CALCULATE TOTAL PRICE
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      localStorage.setItem('cart', JSON.stringify(state))
    },
  },
});

export const {addToCart} = cartSlice.actions;

export default cartSlice.reducer;
