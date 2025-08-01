import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  latitude: null,
  longitude: null,
  createAndEditS_Alert: false,
  createAndEditM_Alert: false,
  createAndEditResponse: "",
  editableEvents: [],
  editableEventFilterNumber: 0,
  editableEventSkeleton: false,
  isUpdateMode: false,
  updateEventProp: {},
  gaveUpUpdating: 0,
};

export const CreateEvent = createAsyncThunk("createEvent", async (data) => {
  var response = await axios.post("Events/CreateEvent", data);
  return response.data;
});

export const UpdateEvent = createAsyncThunk("updateEvent", async (data) => {
  var response = await axios.put("Events/UpdateEvent", data);
  return response.data;
});

export const RemoveEvent = createAsyncThunk("removeEvent", async (id) => {
  await axios.delete("Events/RemoveEvent/" + id);
});

export const GetEventsI_CreatedUnFiltreted = createAsyncThunk(
  "iCreatedUnFiltreted",
  async (id) => {
    var response = await axios.get("Events/GetEventsI_CreatedUnFiltered", {
      params: {
        AppUserId: id,
      },
    });
    return response.data;
  }
);

export const GetEventsI_CreatedAwaiting = createAsyncThunk(
  "iCreatedAwaiting",
  async (id) => {
    var response = await axios.get("Events/GetEventsI_CreatedAwaiting", {
      params: {
        AppUserId: id,
      },
    });
    return response.data;
  }
);

export const GetEventsI_CreatedStatusTrue = createAsyncThunk(
  "iCreatedStatusTrue",
  async (id) => {
    var response = await axios.get("Events/GetEventsI_CreatedStatusTrue", {
      params: {
        AppUserId: id,
      },
    });
    return response.data;
  }
);

export const GetEventsI_CreatedStatusFalse = createAsyncThunk(
  "iCreatedStatusFalse",
  async (id) => {
    var response = await axios.get("Events/GetEventsI_CreatedStatusFalse", {
      params: {
        AppUserId: id,
      },
    });
    return response.data;
  }
);

export const eventSlice = createSlice({
  name: "event",
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
  },
  extraReducers: (builder) => {
    builder

      //Create Event
      .addCase(CreateEvent.fulfilled, (state, action) => {
        if (action.payload) {
          state.createAndEditS_Alert = true;
          state.createAndEditResponse =
            "Etkinlik Başarıyla Oluşturuldu. Etkinliklerim Panelinden Onay Durumunu Takip Edebilirsiniz.";
        } else {
          state.createAndEditM_Alert = true;
          state.createAndEditResponse =
            "Etkinlik Oluşturulamadı. Lütfen Daha Sonra Tekrar Deneyiniz.";
        }
      })
      .addCase(CreateEvent.rejected, (state) => {
        state.createAndEditM_Alert = true;
        state.createAndEditResponse =
          "Sunucu Tarafında Bir Hata Oluştu. Lütfen Daha Sonra Tekrar Deneyiniz.";
      })

      //Update Event

      .addCase(UpdateEvent.fulfilled, (state, action) => {
        state.createAndEditS_Alert = true;
        state.editableEvents = action.payload;
        state.createAndEditResponse = "Etkinlik Başarıyla Güncellendi.";
      })
      .addCase(UpdateEvent.rejected, (state) => {
        state.createAndEditM_Alert = true;
        state.createAndEditResponse =
          "Sunucu Tarafında Bir Hata Oluştu. Lütfen Daha Sonra Tekrar Deneyiniz.";
      })

      //RemoveEvent

      .addCase(RemoveEvent.fulfilled, (state) => {
        state.createAndEditS_Alert = true;
        state.createAndEditResponse = "Etkinlik Başarıyla Silindi.";
      })
      .addCase(RemoveEvent.rejected, (state) => {
        state.createAndEditM_Alert = true;
        state.createAndEditResponse =
          "Sunucu Tarafında Bir Hata Oluştu. Lütfen Daha Sonra Tekrar Deneyiniz.";
      })

      //Events I Created Unfiltreted
      .addCase(GetEventsI_CreatedUnFiltreted.pending, (state) => {
        state.editableEventSkeleton = true;
      })
      .addCase(GetEventsI_CreatedUnFiltreted.fulfilled, (state, action) => {
        state.editableEvents = action.payload;
        console.log(state.editableEvents);
        state.editableEventSkeleton = false;
      })
      .addCase(GetEventsI_CreatedUnFiltreted.rejected, (state) => {
        state.editableEventSkeleton = false;
        console.log("hoooop");
      })

      //Events I Created Awaiting

      .addCase(GetEventsI_CreatedAwaiting.pending, (state) => {
        state.editableEventSkeleton = true;
      })
      .addCase(GetEventsI_CreatedAwaiting.fulfilled, (state, action) => {
        state.editableEvents = action.payload;
        state.editableEventSkeleton = false;
      })
      .addCase(GetEventsI_CreatedAwaiting.rejected, (state) => {
        state.editableEventSkeleton = false;
      })

      //Events I Created Awaiting

      .addCase(GetEventsI_CreatedStatusTrue.pending, (state) => {
        state.editableEventSkeleton = true;
      })
      .addCase(GetEventsI_CreatedStatusTrue.fulfilled, (state, action) => {
        state.editableEvents = action.payload;
        state.editableEventSkeleton = false;
      })
      .addCase(GetEventsI_CreatedStatusTrue.rejected, (state) => {
        state.editableEventSkeleton = false;
      })

      //Events I Created Awaiting

      .addCase(GetEventsI_CreatedStatusFalse.pending, (state) => {
        state.editableEventSkeleton = true;
      })
      .addCase(GetEventsI_CreatedStatusFalse.fulfilled, (state, action) => {
        state.editableEvents = action.payload;
        state.editableEventSkeleton = false;
      })
      .addCase(GetEventsI_CreatedStatusFalse.rejected, (state) => {
        state.editableEventSkeleton = false;
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
} = eventSlice.actions;
export default eventSlice.reducer;
