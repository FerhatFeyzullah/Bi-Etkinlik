import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  discoveryEvents: [],
  recommendedEvents: [],
};

export const GetE_UnFiltered = createAsyncThunk("getAllEvent", async (id) => {
  var response = await axios.get("Events/GetE_UnFiltered", {
    params: {
      AppUserId: id,
    },
  });
  return response.data;
});

export const discoverySlice = createSlice({
  name: "discovery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetE_UnFiltered.fulfilled, (state, action) => {
        state.discoveryEvents = action.payload;
      })
      .addCase(GetE_UnFiltered.rejected, () => {
        console.log("UnFiltreted Basarisiz");
      });
  },
});

//export const {} = discoverySlice.actions;
export default discoverySlice.reducer;
