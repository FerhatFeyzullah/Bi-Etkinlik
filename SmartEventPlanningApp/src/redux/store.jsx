import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";
import discoveryReducer from "./slices/discoverySlice";
import accountReducer from "./slices/accountSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    discovery: discoveryReducer,
    account: accountReducer,
  },
});
