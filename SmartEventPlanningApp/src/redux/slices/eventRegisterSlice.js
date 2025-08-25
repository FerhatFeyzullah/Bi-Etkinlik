import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  myRegisteredEvents: [],
  myRegisteredEventsSkeleton: false,
  eventRegisterResponse: "",
  eventRegisterMistakeAlert: false,
  eventRegistirationDeleted: false,
  isEventRegisterDeleteDialog: false,
  deletedRegisterEvent: {},
  isEventScoreRatedDialog: false,
  ratedEvent: null,
  eventRatedMistakeAlert: false,
  eventRegisterDialog: false,
  registeredEvent: null,
};

export const RegisterEvent = createAsyncThunk("registerEvent", async (data) => {
  var response = await axios.post("EventRegisters/RegisterEvent", data);
  return response.data;
});

export const RateEvent = createAsyncThunk("rateTheEvent", async (data) => {
  var response = await axios.put("EventRegisters/RateTheEvent", data);
  return response.data;
});

export const DeleteEventRegister = createAsyncThunk(
  "deleteMyRegistiretion",
  async (data) => {
    await axios.delete(
      `EventRegisters/DeleteEventRegister/${data.userId}/${data.eventId}`
    );
  }
);

export const GetMyPastEvents = createAsyncThunk("myPastEvents", async (id) => {
  var response = await axios.get("EventRegisters/GetMyPastEvents", {
    params: {
      AppUserId: id,
    },
  });
  return response.data;
});

export const GetMyCurrentEvents = createAsyncThunk(
  "myCurrentEvents",
  async (id) => {
    var response = await axios.get("EventRegisters/GetMyCurrentEvents", {
      params: {
        AppUserId: id,
      },
    });
    return response.data;
  }
);

export const GetMyFutureEvents = createAsyncThunk(
  "myFutureEvents",
  async (id) => {
    var response = await axios.get("EventRegisters/GetMyFutureEvents", {
      params: {
        AppUserId: id,
      },
    });
    return response.data;
  }
);

export const eventRegisterSlice = createSlice({
  name: "eventRegister",
  initialState,
  reducers: {
    SetEventRegisterMistakeAlert: (state, action) => {
      state.eventRegisterMistakeAlert = action.payload;
    },
    SetEventRegisterationDeleted: (state, action) => {
      state.eventRegistirationDeleted = action.payload;
    },
    SetIsEventRegisterDeleteDialog: (state, action) => {
      state.isEventRegisterDeleteDialog = action.payload;
    },
    SetDeletedEventRegister: (state, action) => {
      state.deletedRegisterEvent = action.payload;
    },
    SetIsEventRateDialog: (state, action) => {
      state.isEventScoreRatedDialog = action.payload;
    },
    SetRatedEvent: (state, action) => {
      state.ratedEvent = action.payload;
    },
    SetEventRatedMistakeAlert: (state, action) => {
      state.eventRatedMistakeAlert = action.payload;
    },
    SetEventRegisterDialog: (state, action) => {
      state.eventRegisterDialog = action.payload;
    },
    SetRegisteredEvent: (state, action) => {
      state.registeredEvent = action.payload;
    },

    MarkEventIsRated: (state, action) => {
      const eRegisterId = action.payload;
      const registiration = state.myRegisteredEvents.find(
        (e) => e.eventRegisterId == eRegisterId
      );

      if (registiration) {
        registiration.isScored = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder

      //RegisterEvent
      .addCase(RegisterEvent.fulfilled, (state, action) => {
        if (!action.payload) {
          state.eventRegisterResponse =
            "eventRegister.registerEventFulfilledError";
          state.eventRegisterMistakeAlert = true;
        }
      })
      .addCase(RegisterEvent.rejected, (state) => {
        state.eventRegisterResponse =
          "rejected";
        state.eventRegisterMistakeAlert = true;
      })

      //RateEvent
      .addCase(RateEvent.fulfilled, (state, action) => {
        if (!action.payload) {
          state.eventRegisterResponse =
            "eventRegister.rateEventFulfilledError";
          state.eventRatedMistakeAlert = true;
        }
      })
      .addCase(RateEvent.rejected, (state) => {
        state.eventRegisterResponse =
          "rejected";
        state.eventRatedMistakeAlert = true;
      })

      //DeleteRegistiration
      .addCase(DeleteEventRegister.fulfilled, (state) => {
        state.eventRegistirationDeleted = true;
      })
      .addCase(DeleteEventRegister.rejected, (state) => {
        state.eventRegistirationDeleted = false;
        state.eventRegisterMistakeAlert = true;
      })

      //MyPastEvents
      .addCase(GetMyPastEvents.pending, (state) => {
        state.myRegisteredEventsSkeleton = true;
      })
      .addCase(GetMyPastEvents.fulfilled, (state, action) => {
        state.myRegisteredEvents = action.payload;
        state.myRegisteredEventsSkeleton = false;
      })
      .addCase(GetMyPastEvents.rejected, (state) => {
        state.myRegisteredEventsSkeleton = false;
      })

      //MyCurrentEvents
      .addCase(GetMyCurrentEvents.pending, (state) => {
        state.myRegisteredEventsSkeleton = true;
      })
      .addCase(GetMyCurrentEvents.fulfilled, (state, action) => {
        state.myRegisteredEvents = action.payload;
        state.myRegisteredEventsSkeleton = false;
      })
      .addCase(GetMyCurrentEvents.rejected, (state) => {
        state.myRegisteredEventsSkeleton = false;
      })

      //MyFutureEvents
      .addCase(GetMyFutureEvents.pending, (state) => {
        state.myRegisteredEventsSkeleton = true;
      })
      .addCase(GetMyFutureEvents.fulfilled, (state, action) => {
        state.myRegisteredEvents = action.payload;
        state.myRegisteredEventsSkeleton = false;
      })
      .addCase(GetMyFutureEvents.rejected, (state) => {
        state.myRegisteredEventsSkeleton = false;
      });
  },
});

export const {
  SetEventRegisterMistakeAlert,
  SetIsEventRegisterDeleteDialog,
  SetDeletedEventRegister,
  SetEventRegisterationDeleted,
  SetIsEventRateDialog,
  SetRatedEvent,
  MarkEventIsRated,
  SetEventRatedMistakeAlert,
  SetEventRegisterDialog,
  SetRegisteredEvent,
} = eventRegisterSlice.actions;
export default eventRegisterSlice.reducer;
