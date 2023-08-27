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
      state.cartShop = action.payload.cartShop;
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
    addnewItem: (state, action) => {
      const newItem = action.payload.item;
      state.items.push(newItem);
    },
    deleteShopItem: (state, action) => {
      state.items = state.items.filter((item) => {
        return item._id !== action.payload.itemId;
      });
    },
    setShopName: (state, action) => {
      state.shop.name = action.payload.name;
    },
    setShopAddress: (state, action) => {
      state.shop.address = action.payload.address;
    },
    setShopDelivery: (state, action) => {
      const { cnc, ndd, delivery } = action.payload;
      if (cnc || ndd || delivery) {
        state.shop.cnc = cnc;
        state.shop.ndd = ndd;
        state.shop.delivery = delivery;
      }
    },
    setShopCategories: (state, action) => {
      state.shop.categories = action.payload.categories;
    },
    removeShopCategory: (state, action) => {
      state.shop.categories = state.shop.categories.filter((cat) => {
        return cat !== action.payload.category;
      });
    },
    setShopEmail: (state, action) => {
      state.shop.email = action.payload.email;
    },
    setShopPhone: (state, action) => {
      state.shop.phone = action.payload.phone;
    },
    setUserName: (state, action) => {
      state.user.firstName = action.payload.firstName;
      state.user.lastName = action.payload.lastName;
    },
    setUserPhone: (state, action) => {
      state.user.phone = action.payload.phone;
    },
    setUserAddress: (state, action) => {
      console.log(action.payload.address);
      state.user.address = action.payload.address;
    },
    setUserEmail: (state, action) => {
      state.user.email = action.payload.email;
    },
    emptyCart: (state, action) => {
      state.cart = {};
      state.cartShop = "";
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
  addnewItem,
  deleteShopItem,
  setShopName,
  setShopAddress,
  setShopDelivery,
  setShopCategories,
  removeShopCategory,
  setShopEmail,
  setShopPhone,
  setUserAddress,
  setUserEmail,
  setUserName,
  setUserPhone,
  emptyCart,
} = siteSlice.actions;

export default siteSlice.reducer;
