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
  reducers: {
    MarkRecommendedEventAsRegistered: (state, action) => {
      const eventId = action.payload;
      const event = state.recommendedEvents.events.find(
        (e) => e.eventId === eventId
      );
      if (event) {
        event.registered = true;
      }
    },
  },
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

export const { MarkRecommendedEventAsRegistered } = recommendedSlice.actions;
export default recommendedSlice.reducer;
