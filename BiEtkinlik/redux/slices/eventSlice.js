import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

const initialState = {
  latitude: null,
  longitude: null,
  createAndEditS_Alert: false,
  createAndEditM_Alert: false,
  createAndEditResponse: '',
  editableEvents: [],
  editableEventFilterNumber: 0,
  editableEventSkeleton: false,
  isUpdateMode: false,
  updateEventProp: {},
  gaveUpUpdating: 0,
  isEventPreview: false,
  previewedEvent: {},
  isEventDeleteDialog: false,
  isEventDeleteComplete: false,
  deletedEvent: null,
  eventArchive: [],
  reviewEvents: [],
  reviewEventSkeleton: false,
  evaluateEventDialog: false,
  approvedEventDialog: false,
  rejectedEventDialog: false,
  evaluatedEventId: null,
  isEventEvaluated: false,
  reviewEventResponse: '',
  reviewEventMistake: false,
  reviewEventSuccess: false,
};

//#region Phase Of API Request

export const CreateEvent = createAsyncThunk('createEvent', async (data) => {
  var response = await axios.post('Events/CreateEvent', data);
  return response.data;
});

export const UpdateEvent = createAsyncThunk('updateEvent', async (data) => {
  var response = await axios.put('Events/UpdateEvent', data);
  return response.data;
});

export const RemoveEvent = createAsyncThunk('removeEvent', async (id) => {
  await axios.delete('Events/RemoveEvent/' + id);
});

export const GetEventsI_CreatedForArchive = createAsyncThunk('iCreatedArchive', async (id) => {
  var response = await axios.get('Events/GetEventsI_CreatedForArchive', {
    params: {
      AppUserId: id,
    },
  });
  return response.data;
});

export const GetEventsI_CreatedUnFiltreted = createAsyncThunk('iCreatedUnFiltreted', async (id) => {
  var response = await axios.get('Events/GetEventsI_CreatedUnFiltered', {
    params: {
      AppUserId: id,
    },
  });
  return response.data;
});

export const GetEventsStatusNull = createAsyncThunk('EventsStatusNull', async () => {
  var response = await axios.get('Events/GetEventsStatusNull');
  return response.data;
});

export const GetEventsStatusTrue = createAsyncThunk('EventsStatusTrue', async () => {
  var response = await axios.get('Events/GetEventsStatusTrue');
  return response.data;
});

export const GetEventsStatusFalse = createAsyncThunk('EventsStatusFalse', async () => {
  var response = await axios.get('Events/GetEventsStatusFalse');
  return response.data;
});

export const SetEventStatusTrue = createAsyncThunk('setStatusTrue', async (id) => {
  await axios.put('Events/SetEventPermissionTrue/' + id);
});

export const SetEventStatusFalse = createAsyncThunk('setStatusFalse', async (id) => {
  await axios.put('Events/SetEventPermissionFalse/' + id);
});

//#endregion

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    SetLatitude: (state, action) => {
      state.latitude = action.payload;
    },
    SetLongitude: (state, action) => {
      state.longitude = action.payload;
    },
    SetCreateAndEditS_AlertFalse: (state) => {
      state.createAndEditS_Alert = false;
    },
    SetCreateAndEditM_AlertFalse: (state) => {
      state.createAndEditM_Alert = false;
    },
    SetEditableEventFilterNumber: (state, action) => {
      state.editableEventFilterNumber = action.payload;
    },
    SetIsUpdateMode: (state, action) => {
      state.isUpdateMode = action.payload;
    },
    SetUpdateEventProp: (state, action) => {
      state.updateEventProp = action.payload;
    },
    SetGaveUpUpdating: (state, action) => {
      state.gaveUpUpdating = action.payload;
    },
    SetIsEventPreview: (state, action) => {
      state.isEventPreview = action.payload;
    },
    SetPreviewedEvent: (state, action) => {
      state.previewedEvent = action.payload;
    },
    SetEventDeleteDialog: (state, action) => {
      state.isEventDeleteDialog = action.payload;
    },
    SetIsEventDeleteComplete: (state, action) => {
      state.isEventDeleteComplete = action.payload;
    },
    SetDeletedEvent: (state, action) => {
      state.deletedEvent = action.payload;
    },
    SetReviewEventMistake: (state, action) => {
      state.reviewEventMistake = action.payload;
    },
    SetReviewEventSuccess: (state, action) => {
      state.reviewEventSuccess = action.payload;
    },
    SetEvaluateEventDialog: (state, action) => {
      state.evaluateEventDialog = action.payload;
    },
    SetApprovedEventDialog: (state, action) => {
      state.approvedEventDialog = action.payload;
    },
    SetRejectedEventDialog: (state, action) => {
      state.rejectedEventDialog = action.payload;
    },
    SetEvaluatedEventId: (state, action) => {
      state.evaluatedEventId = action.payload;
    },
    SetIsEventEvaluated: (state, action) => {
      state.isEventEvaluated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      //Create Event
      .addCase(CreateEvent.fulfilled, (state, action) => {
        if (action.payload) {
          state.createAndEditS_Alert = true;
          state.createAndEditResponse = 'event.createEventFulfilledSuccess';
        } else {
          state.createAndEditM_Alert = true;
          state.createAndEditResponse = 'event.createEventFulfilledError';
        }
      })
      .addCase(CreateEvent.rejected, (state) => {
        state.createAndEditM_Alert = true;
        state.createAndEditResponse = 'rejected';
      })

      //Update Event

      .addCase(UpdateEvent.fulfilled, (state, action) => {
        state.createAndEditS_Alert = true;
        state.editableEvents = action.payload;
        state.createAndEditResponse = 'event.updateEventFulfilledSuccess';
      })
      .addCase(UpdateEvent.rejected, (state) => {
        state.createAndEditM_Alert = true;
        state.createAndEditResponse = 'rejected';
      })

      //RemoveEvent

      .addCase(RemoveEvent.fulfilled, (state) => {
        state.createAndEditS_Alert = true;
        state.isEventDeleteComplete = true;
        state.createAndEditResponse = 'event.removeEventFulfilledSuccess';
      })
      .addCase(RemoveEvent.rejected, (state) => {
        state.createAndEditM_Alert = true;
        state.createAndEditResponse = 'rejected';
      })

      //Events I Created Unfiltreted
      .addCase(GetEventsI_CreatedForArchive.fulfilled, (state, action) => {
        state.eventArchive = action.payload;
      })
      .addCase(GetEventsI_CreatedForArchive.rejected, (state) => {
        console.log('archive events failed');
      })

      //Events I Created Unfiltreted
      .addCase(GetEventsI_CreatedUnFiltreted.pending, (state) => {
        state.editableEventSkeleton = true;
      })
      .addCase(GetEventsI_CreatedUnFiltreted.fulfilled, (state, action) => {
        state.editableEvents = action.payload;
        state.editableEventSkeleton = false;
      })
      .addCase(GetEventsI_CreatedUnFiltreted.rejected, (state) => {
        state.editableEventSkeleton = false;
      })

      //Events Status Null

      .addCase(GetEventsStatusNull.pending, (state) => {
        state.reviewEventSkeleton = true;
      })
      .addCase(GetEventsStatusNull.fulfilled, (state, action) => {
        state.reviewEvents = action.payload;
        state.reviewEventSkeleton = false;
      })
      .addCase(GetEventsStatusNull.rejected, (state) => {
        console.log('review Events Failed');
        state.reviewEventSkeleton = false;
      })

      //Events Status True

      .addCase(GetEventsStatusTrue.pending, (state) => {
        state.reviewEventSkeleton = true;
      })
      .addCase(GetEventsStatusTrue.fulfilled, (state, action) => {
        state.reviewEvents = action.payload;
        state.reviewEventSkeleton = false;
      })
      .addCase(GetEventsStatusTrue.rejected, (state) => {
        console.log('review Events Failed');
        state.reviewEventSkeleton = false;
      })

      //Events Status False

      .addCase(GetEventsStatusFalse.pending, (state) => {
        state.reviewEventSkeleton = true;
      })
      .addCase(GetEventsStatusFalse.fulfilled, (state, action) => {
        state.reviewEvents = action.payload;
        state.reviewEventSkeleton = false;
      })
      .addCase(GetEventsStatusFalse.rejected, (state) => {
        console.log('review Events Failed');
        state.reviewEventSkeleton = false;
      })

      //Set Status True
      .addCase(SetEventStatusTrue.fulfilled, (state) => {
        state.isEventEvaluated = true;
        state.reviewEventSuccess = true;
        state.reviewEventResponse = 'event.setEventStatusTrueFulfilledSuccess';
      })
      .addCase(SetEventStatusTrue.rejected, (state) => {
        state.reviewEventMistake = true;
        state.reviewEventResponse = 'rejected';
      })

      //Set Status False
      .addCase(SetEventStatusFalse.fulfilled, (state) => {
        state.isEventEvaluated = true;
        state.reviewEventSuccess = true;
        state.reviewEventResponse = 'event.setEventStatusFalseFulfilledSuccess';
      })
      .addCase(SetEventStatusFalse.rejected, (state) => {
        state.reviewEventMistake = true;
        state.reviewEventResponse = 'rejected';
      });
  },
});

export const {
  SetLatitude,
  SetLongitude,
  SetCreateAndEditS_AlertFalse,
  SetCreateAndEditM_AlertFalse,
  SetEditableEventFilterNumber,
  SetIsUpdateMode,
  SetUpdateEventProp,
  SetGaveUpUpdating,
  SetIsEventPreview,
  SetPreviewedEvent,
  SetEventDeleteDialog,
  SetDeletedEvent,
  SetReviewEventMistake,
  SetReviewEventSuccess,
  SetEvaluateEventDialog,
  SetApprovedEventDialog,
  SetRejectedEventDialog,
  SetEvaluatedEventId,
  SetIsEventEvaluated,
  SetIsEventDeleteComplete,
} = eventSlice.actions;
export default eventSlice.reducer;
