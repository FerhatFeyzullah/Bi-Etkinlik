import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  eventGroups: [],
  chattingEvent: null,
  oldMessages: [],
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

export const GetOldMessages = createAsyncThunk("getAllMessage", async (id) => {
  var response = await axios.get("Messages/GetOldMessages", {
    params: {
      EventId: id,
    },
  });
  return response.data;
});

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
      })

      //Old Messages
      .addCase(GetOldMessages.fulfilled, (state, action) => {
        state.oldMessages = action.payload.allMessages;
        console.log("old messages api basarili");
      })
      .addCase(GetOldMessages.rejected, (state, action) => {
        console.log("old messages api basarisiz");
      });
  },
});

export const { SetChattingEvent } = messageSlice.actions;
export default messageSlice.reducer;
