import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  allCategory: [],
  cetegoryFilterSkeletonLoaing: false,
};

export const GetAllCategory = createAsyncThunk("allCategory", async () => {
  const response = await axios.get("Categories/GetAllCategory");
  return response.data;
});

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllCategory.pending, (state) => {
        state.cetegoryFilterSkeletonLoaing = true;
      })
      .addCase(GetAllCategory.fulfilled, (state, action) => {
        state.allCategory = action.payload;
        state.cetegoryFilterSkeletonLoaing = false;
      })
      .addCase(GetAllCategory.rejected, (state) => {
        state.cetegoryFilterSkeletonLoaing = false;
      });
  },
});

//export const {} = authSlice.actions;
export default categorySlice.reducer;
