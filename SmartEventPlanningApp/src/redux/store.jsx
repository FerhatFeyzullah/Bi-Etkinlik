import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";
import discoveryReducer from "./slices/discoverySlice";
import accountReducer from "./slices/accountSlice";
import mapReducer from "./slices/mapSlice";
import recommendedReducer from "./slices/recommendedSlice";
import eventReducer from "./slices/eventSlice";
import eventRegisterReducer from "./slices/eventRegisterSlice";
import forgotPasswordReducer from "./slices/forgotPasswordSlice";
import userSettingReducer from "./slices/userSettingSlice";

const appReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  discovery: discoveryReducer,
  account: accountReducer,
  map: mapReducer,
  recommended: recommendedReducer,
  event: eventReducer,
  eventRegister: eventRegisterReducer,
  forgotPassword: forgotPasswordReducer,
  userSetting: userSettingReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined;
  }

  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
