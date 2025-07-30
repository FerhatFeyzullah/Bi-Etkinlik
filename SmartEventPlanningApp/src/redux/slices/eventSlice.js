import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {};

export const eventSlice = createSlice({
  name: "discovery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

//export const {} = eventSlice.actions;
export default eventSlice.reducer;
