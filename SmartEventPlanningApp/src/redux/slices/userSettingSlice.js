import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  userSettingDrawer: false,
  changePasswordDrawer: false,
  changePassLoading: false,
  changePassMistake: false,
  changePassSuccess: false,
  changePassResponse: "",
};

export const ChangePassword = createAsyncThunk("changePass", async (data) => {
  var response = await axios.post("Users/ChangePassword", data);
  return response.data;
});

export const userSettingSlice = createSlice({
  name: "userSetting",
  initialState,
  reducers: {
    SetUserSettingDrawer: (state, action) => {
      state.userSettingDrawer = action.payload;
    },
    SetChangePasswordDrawer: (state, action) => {
      state.changePasswordDrawer = action.payload;
    },
    SetChangePassMistake: (state, action) => {
      state.changePassMistake = action.payload;
    },
    SetChangePassSuccess: (state, action) => {
      state.changePassSuccess = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ChangePassword.pending, (state) => {
        state.changePassLoading = true;
      })
      .addCase(ChangePassword.fulfilled, (state, action) => {
        state.changePassLoading = false;
        if (action.payload == "") {
          state.changePassResponse = "Şifreniz Başarıyla Değiştirildi.";
          state.changePasswordDrawer = false;
          state.changePassSuccess = true;
        } else {
          state.changePassResponse = action.payload;
          state.changePassMistake = true;
        }
      })
      .addCase(ChangePassword.rejected, (state) => {
        state.changePasswordDrawer = false;
        state.changePassLoading = false;
        state.changePassResponse =
          "Sunucu Tarafında Bir Hata Oluştu. Lütfen Daha Sonra Tekrar Deneyiniz.";
        state.changePassMistake = true;
      });
  },
});
export const {
  SetUserSettingDrawer,
  SetChangePasswordDrawer,
  SetChangePassMistake,
  SetChangePassSuccess,
} = userSettingSlice.actions;
export default userSettingSlice.reducer;
