import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {};

export const GetUserInfo = createAsyncThunk("getUserInfo", async (id) => {
  var response = await axios.get("Users/GetUserInfo", {
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
      .addCase(GetUserInfo.fulfilled, (state, action) => {
        localStorage.setItem("AppUser", JSON.stringify(action.payload));
      })
      .addCase(GetUserInfo.rejected, () => {
        console.log("GetUserInfo Basarisiz");
      });
  },
});

//export const {} = accountSlice.actions;
export default accountSlice.reducer;
