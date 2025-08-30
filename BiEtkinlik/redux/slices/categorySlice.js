import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
    allCategory: [],
    cetegoryFilterSkeletonLoaing: false,
    categoryLoaing: false,
    loadedCount: null,
};

export const GetAllCategory = createAsyncThunk("allCategory", async () => {
    const response = await axios.get("Categories/GetAllCategory");
    return response.data;
});

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        IncrementLoadedCount: (state) => {
            state.loadedCount += 1;
        },
        SetLoadedCount: (state) => {
            state.loadedCount = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetAllCategory.pending, (state) => {
                state.cetegoryFilterSkeletonLoaing = true;
                state.categoryLoaing = true;
            })
            .addCase(GetAllCategory.fulfilled, (state, action) => {
                state.allCategory = action.payload;
                state.cetegoryFilterSkeletonLoaing = false;
                state.categoryLoaing = false;

            })
            .addCase(GetAllCategory.rejected, (state) => {
                state.cetegoryFilterSkeletonLoaing = false;
                console.log("getAllCategory failed")
                state.categoryLoaing = false;
            });
    },
});

export const { IncrementLoadedCount, SetLoadedCount } = categorySlice.actions;
export default categorySlice.reducer;
