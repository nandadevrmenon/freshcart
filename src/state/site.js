import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

const initialState = {
  user: null,
  token: null,
  cart: {},
  cartShop: null,
  shop: null,
};

const siteSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateCart: (state, action) => {
      const { item, count } = action.payload;
      if (count === 0) {
        delete state.cart[item];
        if (Object.keys(state.cart).length === 0) {
          state.cartShop = ""; // Set cartShop to empty string if the cart is empty
        }
      } else {
        state.cart[item] = count;
      }
    },
    updateCartShop: (state, action) => {
      const { shopId } = action.payload;
      state.cartShop = shopId;
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.cart = action.payload.cart;
      state.cartShop = action.payload.user.cartShop;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.cart = {};
      state.shop = null;
      state.cartShop = null;
      state.items = null;
    },
    setShopLogin: (state, action) => {
      state.cart = {};
      delete state.cartShop;
      state.shop = action.payload.shop;
      state.token = action.payload.token;
      state.items = action.payload.items;
    },
    updateShopItem: (state, action) => {
      const newItem = action.payload.item;
      state.items = state.items.map((item) => {
        if (item._id === newItem._id) return newItem;
        return item;
      });
    },
  },
});

export const {
  updateCart,
  setLogin,
  setLogout,
  setShopLogin,
  updateCartShop,
  updateShopItem,
} = siteSlice.actions;

export default siteSlice.reducer;
