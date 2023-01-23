import { configureStore } from "@reduxjs/toolkit";
import { contactsReducer } from "./contactSlice";
import { postsReducer } from "./postsSlice";
import { userReducer } from "./userSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,// postReducer
    auth: userReducer,
    phonebook: contactsReducer
  },
});