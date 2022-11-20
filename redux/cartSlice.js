import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.total += action.payload.price;
    },
    reset: (state) => {
      state.products = [];
      state.total = 0;
    },
  },
});

export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;
