import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice';
import categoryReducer from '../redux/slices/categorySlice';
import discoveryReducer from '../redux/slices/discoverySlice';
import recommendedReducer from '../redux/slices/recommendedSlice';
import eventRegisterReducer from '../redux/slices/eventRegisterSlice';
import mapReducer from '../redux/slices/mapSlice';
import eventReducer from '../redux/slices/eventSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    discovery: discoveryReducer,
    recommended: recommendedReducer,
    eventRegister: eventRegisterReducer,
    map: mapReducer,
    event: eventReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 🚀 performans artar
    }),
});
