import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  cart: [],
  cartShop: null,
  shop: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = { ...state.cart, ...action.payload.item };
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.cart = { ...state.cart, ...action.payload.user.cart };
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.cart = null;
      state.shop = null;
      state.cartShop = [];
    },
    setShopLogin: (state, action) => {
      delete state.cart;
      delete state.cartShop;
      state.shop = action.payload.shop;
      state.token = action.payload.token;
    },
  },
});

export const { setCart, setLogin, setLogout, setShopLogin } = authSlice.actions;

export default authSlice.reducer;
