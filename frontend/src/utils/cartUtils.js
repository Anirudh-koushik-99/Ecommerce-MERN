export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  export const updateCart = (state) => {
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

      return state
  }