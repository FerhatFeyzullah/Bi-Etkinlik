import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  eventGroups: [],
  chattingEvent: null,
  oldMessages: [],
  eventGroupsErrorAlert: false,
  oldMessagesErrorAlert: false,
  messageErrorResponse: "",
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

export const IsEventFinished = createAsyncThunk("isEventFinish", async (id) => {
  var response = await axios.get("Events/IsEventFinished", {
    params: {
      EventId: id
    }
  })
  return response.data;
});

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    SetChattingEvent: (state, action) => {
      state.chattingEvent = action.payload;
    },
    SetEventGroupsErrorAlert: (state, action) => {
      state.eventGroupsErrorAlert = action.payload;
    },
    SetOldMessagesErrorAlert: (state, action) => {
      state.oldMessagesErrorAlert = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetAllEventsI_Joined.fulfilled, (state, action) => {
        state.eventGroups = action.payload;
      })
      .addCase(GetAllEventsI_Joined.rejected, (state) => {
        state.messageErrorResponse = "rejected";
        state.eventGroupsErrorAlert = true;
        console.error("GetAllEventsI_Joined Basarisiz");
      })

      //Old Messages
      .addCase(GetOldMessages.fulfilled, (state, action) => {
        state.oldMessages = action.payload?.allMessages ?? [];
      })
      .addCase(GetOldMessages.rejected, (state) => {
        state.messageErrorResponse = "rejected";
        state.oldMessagesErrorAlert = true;
        console.error("old messages api basarisiz");
      });
  },
});

export const {
  SetChattingEvent,
  SetEventGroupsErrorAlert,
  SetOldMessagesErrorAlert,
} = messageSlice.actions;
export default messageSlice.reducer;
