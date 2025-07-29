import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import qs from "qs";

const initialState = {
  discoveryEvents: [],
  recommendedEvents: [],
  skeletonLoading: false,
  boxReviewIsChecked: false,
  dateFilterMode: false,
  startDate: null,
  endDate: null,
  cities: [],
  categories: [],
};

export const GetE_UnFiltered = createAsyncThunk("getAllEvent", async (id) => {
  var response = await axios.get("Events/GetE_UnFiltered", {
    params: {
      AppUserId: id,
    },
  });
  return response.data;
});

export const GetE_F_Category = createAsyncThunk(
  "getFCategory",
  async (data) => {
    var response = await axios.get("Events/GetE_F_Category", {
      params: {
        AppUserId: data.id,
        Categories: data.categories,
      },
    });
    return response.data;
  }
);

export const GetE_F_City = createAsyncThunk("getFCity", async (data) => {
  var response = await axios.get("Events/GetE_F_City", {
    params: {
      AppUserId: data.id,
      Cities: data.cities,
    },
  });
  return response.data;
});

export const GetE_F_CityCategory = createAsyncThunk(
  "getFCityCategory",
  async (data) => {
    var response = await axios.get("Events/GetE_F_CityCategory", {
      params: {
        AppUserId: data.id,
        Cities: data.cities,
        Categories: data.categories,
      },
    });
    return response.data;
  }
);

export const GetE_F_Date = createAsyncThunk("getFDate", async (data) => {
  var response = await axios.get("Events/GetE_F_Date", {
    params: {
      AppUserId: data.id,
      Start: data.start,
      End: data.end,
    },
  });
  return response.data;
});

export const GetE_F_DateCategory = createAsyncThunk(
  "getFDateCategory",
  async (data) => {
    var response = await axios.get("Events/GetE_F_DateCategory", {
      params: {
        AppUserId: data.id,
        Start: data.start,
        End: data.end,
        Categories: data.categories,
      },
    });
    return response.data;
  }
);

export const GetE_F_DateCity = createAsyncThunk(
  "getFDateCity",
  async (data) => {
    var response = await axios.get("Events/GetE_F_DateCity", {
      params: {
        AppUserId: data.id,
        Start: data.start,
        End: data.end,
        Cities: data.cities,
      },
    });
    return response.data;
  }
);

export const GetE_F_DateCityCategory = createAsyncThunk(
  "getFDateCityCategory",
  async (data) => {
    var response = await axios.get("Events/GetE_F_DateCityCategory", {
      params: {
        AppUserId: data.id,
        Start: data.start,
        End: data.end,
        Cities: data.cities,
        Categories: data.categories,
      },
    });
    return response.data;
  }
);

export const discoverySlice = createSlice({
  name: "discovery",
  initialState,
  reducers: {
    ChangeBoxReviewIsChecked: (state, action) => {
      state.boxReviewIsChecked = action.payload;
    },
    SetStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    SetEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    SetCities: (state, action) => {
      state.cities = action.payload;
    },
    SetCategories: (state, action) => {
      state.categories = action.payload;
    },
    SetDateFilterMode: (state, action) => {
      state.dateFilterMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      //UnFiltered

      .addCase(GetE_UnFiltered.pending, (state) => {
        state.skeletonLoading = true;
      })
      .addCase(GetE_UnFiltered.fulfilled, (state, action) => {
        state.skeletonLoading = false;
        state.discoveryEvents = action.payload;
      })
      .addCase(GetE_UnFiltered.rejected, (state) => {
        state.skeletonLoading = false;
        console.log("UnFiltreted Basarisiz");
      })

      //F_Category
      .addCase(GetE_F_Category.pending, (state) => {
        state.skeletonLoading = true;
      })
      .addCase(GetE_F_Category.fulfilled, (state, action) => {
        state.skeletonLoading = false;
        state.discoveryEvents = action.payload;
        console.log(state.discoveryEvents);
        console.log("CATEGORY PAYLOAD", action.payload);
      })
      .addCase(GetE_F_Category.rejected, (state) => {
        state.skeletonLoading = false;
        console.log("GetE_F_Category Basarisiz");
      })

      //F_City
      .addCase(GetE_F_City.pending, (state) => {
        state.skeletonLoading = true;
      })
      .addCase(GetE_F_City.fulfilled, (state, action) => {
        state.skeletonLoading = false;
        state.discoveryEvents = action.payload;
      })
      .addCase(GetE_F_City.rejected, (state) => {
        state.skeletonLoading = false;
        console.log("GetE_F_City Basarisiz");
      })

      //F_CityCategory
      .addCase(GetE_F_CityCategory.pending, (state) => {
        state.skeletonLoading = true;
      })
      .addCase(GetE_F_CityCategory.fulfilled, (state, action) => {
        state.skeletonLoading = false;
        state.discoveryEvents = action.payload;
      })
      .addCase(GetE_F_CityCategory.rejected, (state) => {
        state.skeletonLoading = false;
        console.log("GetE_F_CityCategory Basarisiz");
      })

      //F_Date
      .addCase(GetE_F_Date.pending, (state) => {
        state.skeletonLoading = true;
      })
      .addCase(GetE_F_Date.fulfilled, (state, action) => {
        state.skeletonLoading = false;
        state.discoveryEvents = action.payload;
        console.log(state.discoveryEvents);
      })
      .addCase(GetE_F_Date.rejected, (state) => {
        state.skeletonLoading = false;
        console.log("GetE_F_Date Basarisiz");
      })

      //F_DateCategory
      .addCase(GetE_F_DateCategory.pending, (state) => {
        state.skeletonLoading = true;
      })
      .addCase(GetE_F_DateCategory.fulfilled, (state, action) => {
        state.skeletonLoading = false;
        state.discoveryEvents = action.payload;
      })
      .addCase(GetE_F_DateCategory.rejected, (state) => {
        state.skeletonLoading = false;
        console.log("GetE_F_DateCategory Basarisiz");
      })

      //F_DateCity
      .addCase(GetE_F_DateCity.pending, (state) => {
        state.skeletonLoading = true;
      })
      .addCase(GetE_F_DateCity.fulfilled, (state, action) => {
        state.skeletonLoading = false;
        state.discoveryEvents = action.payload;
      })
      .addCase(GetE_F_DateCity.rejected, (state) => {
        state.skeletonLoading = false;
        console.log("GetE_F_DateCity Basarisiz");
      })

      //F_DateCityCategory
      .addCase(GetE_F_DateCityCategory.pending, (state) => {
        state.skeletonLoading = true;
      })
      .addCase(GetE_F_DateCityCategory.fulfilled, (state, action) => {
        state.skeletonLoading = false;
        state.discoveryEvents = action.payload;
      })
      .addCase(GetE_F_DateCityCategory.rejected, (state) => {
        state.skeletonLoading = false;
        console.log("GetE_F_DateCityCategory Basarisiz");
      });
  },
});

export const {
  ChangeBoxReviewIsChecked,
  SetStartDate,
  SetEndDate,
  SetCities,
  SetCategories,
  SetDateFilterMode,
} = discoverySlice.actions;
export default discoverySlice.reducer;
