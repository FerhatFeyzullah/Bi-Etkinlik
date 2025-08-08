import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  eventGroups: [],
  chattingEvent: null,
};

export const GetAllEventsI_Joined = createAsyncThunk(
  "getAllEventsJoined",
  async (id) => {
    var response = await axios.get("EventRegisters/GetAllEventsI_Joined", {
      params: {
        AppUserId: id,
      },
    });
    return response.data;
  }
);

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    SetChattingEvent: (state, action) => {
      state.chattingEvent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetAllEventsI_Joined.fulfilled, (state, action) => {
        state.eventGroups = action.payload;
      })
      .addCase(GetAllEventsI_Joined.rejected, () => {
        console.log("GetAllEventsI_Joined Basarisiz");
      });
  },
});

export const { SetChattingEvent } = messageSlice.actions;
export default messageSlice.reducer;
