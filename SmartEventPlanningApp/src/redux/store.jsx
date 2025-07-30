import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";
import discoveryReducer from "./slices/discoverySlice";
import accountReducer from "./slices/accountSlice";
import mapReducer from "./slices/mapSlice";
import recommendedReducer from "./slices/recommendedSlice";
import eventReducer from "./slices/eventSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    discovery: discoveryReducer,
    account: accountReducer,
    map: mapReducer,
    recommended: recommendedReducer,
    event: eventReducer,
  },
});
