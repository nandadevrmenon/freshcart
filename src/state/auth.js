import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  cart: {},
  cartShop: null,
  shop: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateCart: (state, action) => {
      const { item, count } = action.payload;
      if (count === 0) delete state.cart[item];
      else state.cart[item] = count;
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.cart = { ...state.cart, ...action.payload.user.cart };
      state.cartShop = action.payload.user.cartShop;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.cart = [];
      state.shop = null;
      state.cartShop = null;
    },
    setShopLogin: (state, action) => {
      delete state.cart;
      delete state.cartShop;
      state.shop = action.payload.shop;
      state.token = action.payload.token;
    },
  },
});

export const { updateCart, setLogin, setLogout, setShopLogin } =
  authSlice.actions;

export default authSlice.reducer;
