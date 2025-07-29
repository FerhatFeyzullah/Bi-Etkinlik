import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  allCategory: [],
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
      .addCase(GetAllCategory.pending, () => {
        console.log("Get All Category Bekleniyor.");
      })
      .addCase(GetAllCategory.fulfilled, (state, action) => {
        state.allCategory = action.payload;
        console.log("Basarili (Get All Category).");
      })
      .addCase(GetAllCategory.rejected, () => {
        console.log("Sunucu Tarafında Bir Hata Oluştu (Get All Category).");
      });
  },
});

//export const {} = authSlice.actions;
export default categorySlice.reducer;
