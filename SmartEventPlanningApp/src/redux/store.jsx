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
import messageReducer from "./slices/messageSlice";
import adminReducer from "./slices/adminSlice";

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
  message: messageReducer,
  admin: adminReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined;
  }

  const nextState = appReducer(state, action);

  // Çıkış tüm slice'ları sıfırlar; ancak oturum kontrolü zaten yapılmıştı.
  // authChecked'i true tutmazsak App sonsuz yüklenme ekranında kalır
  // (mount useEffect'i tekrar çalışmadığından ReadToken yeniden tetiklenmez).
  if (action.type === "auth/logout") {
    nextState.auth.authChecked = true;
  }

  return nextState;
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
