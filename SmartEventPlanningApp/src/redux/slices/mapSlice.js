import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  discoveryLatitude: "",
  discoveryLongitude: "",
  isMapReviewed: false,
};

export const mapSlice = createSlice({
  name: "discovery",
  initialState,
  reducers: {
    SetDiscoveryLatitude: (state, action) => {
      state.discoveryLatitude = action.payload;
    },
    SetDiscoveryLongitude: (state, action) => {
      state.discoveryLongitude = action.payload;
    },
    SetIsMapReviewed: (state, action) => {
      state.isMapReviewed = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { SetDiscoveryLatitude, SetDiscoveryLongitude, SetIsMapReviewed } =
  mapSlice.actions;
export default mapSlice.reducer;
