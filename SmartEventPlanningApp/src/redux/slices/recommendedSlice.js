import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  recommendedEvents: [],
  recommendedSkeletonLoading: false,
};

export const GetEventsRecommendedToMe = createAsyncThunk(
  "recommendedToMe",
  async (id) => {
    var response = await axios.get("Events/GetEventsRecommendedToMe", {
      params: {
        AppUserId: id,
      },
    });
    return response.data;
  }
);

export const recommendedSlice = createSlice({
  name: "recommended",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetEventsRecommendedToMe.pending, (state) => {
        state.recommendedSkeletonLoading = true;
      })
      .addCase(GetEventsRecommendedToMe.fulfilled, (state, action) => {
        state.recommendedEvents = action.payload;
        state.recommendedSkeletonLoading = false;
      })
      .addCase(GetEventsRecommendedToMe.rejected, (state) => {
        state.recommendedSkeletonLoading = false;
      });
  },
});

//export const {} = recommendedSlice.actions;
export default recommendedSlice.reducer;
