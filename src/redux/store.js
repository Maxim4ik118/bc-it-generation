import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./postsSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,// postReducer
  },
});