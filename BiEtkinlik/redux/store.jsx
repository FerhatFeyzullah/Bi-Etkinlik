import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../redux/slices/authSlice'
import categoryReducer from '../redux/slices/categorySlice'

export default configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
    },
})