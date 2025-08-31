import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../redux/slices/authSlice'
import categoryReducer from '../redux/slices/categorySlice'
import discoveryReducer from '../redux/slices/discoverySlice'
import recommendedReducer from '../redux/slices/recommendedSlice'

export default configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        discovery: discoveryReducer,
        recommended: recommendedReducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // 🚀 performans artar
        }),
})