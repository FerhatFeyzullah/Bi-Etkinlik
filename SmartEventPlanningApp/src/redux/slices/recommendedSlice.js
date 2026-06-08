import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  recommendedEvents: { events: [] },
  recommendedSkeletonLoading: false,
  recommendedErrorAlert: false,
  recommendedErrorResponse: "",
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
      const event = state.recommendedEvents?.events?.find(
        (e) => e.eventId === eventId
      );
      if (event) {
        event.registered = true;
      }
    },
    SetRecommendedErrorAlert: (state, action) => {
      state.recommendedErrorAlert = action.payload;
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
        state.recommendedErrorResponse = "rejected";
        state.recommendedErrorAlert = true;
        console.error("GetEventsRecommendedToMe Basarisiz");
      });
  },
});

export const { MarkRecommendedEventAsRegistered, SetRecommendedErrorAlert } =
  recommendedSlice.actions;
export default recommendedSlice.reducer;
