import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./products/productsSlice";
import { userReducer } from "./user/userSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
  },
});