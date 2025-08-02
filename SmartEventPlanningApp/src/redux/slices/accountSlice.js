import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  myProfile: {},
};

export const GetUserInfo = createAsyncThunk("getUserInfo", async (id) => {
  var response = await axios.get("Users/GetUserInfo", {
    params: {
      AppUserId: id,
    },
  });
  return response.data;
});
export const GetMyProfile = createAsyncThunk("getMyProfile", async (id) => {
  var response = await axios.get("Users/GetMyProfile", {
    params: {
      AppUserId: id,
    },
  });
  return response.data;
});

export const accountSlice = createSlice({
  name: "discovery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //GetUserInfo
      .addCase(GetUserInfo.fulfilled, (state, action) => {
        localStorage.setItem("AppUser", JSON.stringify(action.payload));
      })
      .addCase(GetUserInfo.rejected, () => {
        console.log("GetUserInfo Basarisiz");
      })

      //GetMyProfile

      .addCase(GetMyProfile.fulfilled, (state, action) => {
        state.myProfile = action.payload;
      })
      .addCase(GetMyProfile.rejected, () => {
        console.log("GetMyProfile Basarisiz");
      });
  },
});

//export const {} = accountSlice.actions;
export default accountSlice.reducer;
