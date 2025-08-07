import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import i18n from "../../i18n";

const savedSettings = JSON.parse(localStorage.getItem("UserSetting")) || {};

const initialState = {
  userSettingDrawer: false,
  changePasswordDrawer: false,
  changePassLoading: false,
  changePassMistake: false,
  changePassSuccess: false,
  changePassResponse: "",

  theme: savedSettings.theme || "light",
  viewMode: savedSettings.viewMode || "card",
  emailNotification: savedSettings.emailNotification || false,
  language: savedSettings.language || "tr",
};

export const ChangePassword = createAsyncThunk("changePass", async (data) => {
  var response = await axios.post("Users/ChangePassword", data);
  return response.data;
});

export const GetUserSetting = createAsyncThunk("getUserSetting", async (id) => {
  var response = await axios.get("UserSettings/GetUserSetting", {
    params: {
      AppUserId: id,
    },
  });
  return response.data;
});
export const UpdateTheme = createAsyncThunk("updateTheme", async (data) => {
  var response = await axios.put("UserSettings/UpdateThemeSetting", data);
  return response.data;
});
export const UpdateViewMode = createAsyncThunk(
  "updateViewMode",
  async (data) => {
    var response = await axios.put("UserSettings/UpdateViewModeSetting", data);
    return response.data;
  }
);
export const UpdateLanguage = createAsyncThunk(
  "updateLanguage",
  async (data) => {
    var response = await axios.put("UserSettings/UpdateLanguageSetting", data);
    return response.data;
  }
);
export const UpdateEmailNotification = createAsyncThunk(
  "updateEmailNotification",
  async (data) => {
    var response = await axios.put(
      "UserSettings/UpdateEmailNotificationSetting",
      data
    );
    return response.data;
  }
);

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
    SetTheme: (state, action) => {
      state.theme = action.payload;
    },
    SetViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    SetLanguage: (state, action) => {
      state.language = action.payload;
    },
    SetEmailNotification: (state, action) => {
      state.emailNotification = action.payload;
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
      })

      //GetUserSetting
      .addCase(GetUserSetting.fulfilled, (state, action) => {
        const userSetting = action.payload.userSetting;
        localStorage.setItem("UserSetting", JSON.stringify(userSetting));
        state.theme = userSetting.theme;
        state.language = userSetting.language;
        i18n.changeLanguage(userSetting.language);
        state.viewMode = userSetting.viewMode;
        state.emailConfirmation = userSetting.emailConfirmation;
      })
      .addCase(GetUserSetting.rejected, () => {
        console.log("GetUserSetting Basarisiz");
      })

      //UpdateTheme
      .addCase(UpdateTheme.fulfilled, (state, action) => {
        const userSetting = action.payload.userSetting;
        localStorage.setItem("UserSetting", JSON.stringify(userSetting));
        state.theme = userSetting.theme;
      })
      .addCase(UpdateTheme.rejected, () => {
        console.log("UpdateTheme Basarisiz");
      })

      //UpdateViewMode
      .addCase(UpdateViewMode.fulfilled, (state, action) => {
        const userSetting = action.payload.userSetting;
        localStorage.setItem("UserSetting", JSON.stringify(userSetting));
        state.viewMode = userSetting.viewMode;
      })
      .addCase(UpdateViewMode.rejected, () => {
        console.log("UpdateViewMode Basarisiz");
      })

      //UpdateEmailConfirmation
      .addCase(UpdateEmailNotification.fulfilled, (state, action) => {
        const userSetting = action.payload.userSetting;
        localStorage.setItem("UserSetting", JSON.stringify(userSetting));
        state.emailNotification = userSetting.emailNotification;
      })
      .addCase(UpdateEmailNotification.rejected, () => {
        console.log("UpdateEmailNotification Basarisiz");
      })

      //UpdateLanguage
      .addCase(UpdateLanguage.fulfilled, (state, action) => {
        const userSetting = action.payload.userSetting;
        localStorage.setItem("UserSetting", JSON.stringify(userSetting));
        state.language = userSetting.language;
      })
      .addCase(UpdateLanguage.rejected, () => {
        console.log("UpdateLanguage Basarisiz");
      });
  },
});
export const {
  SetUserSettingDrawer,
  SetChangePasswordDrawer,
  SetChangePassMistake,
  SetChangePassSuccess,
  SetTheme,
  SetViewMode,
  SetLanguage,
  SetEmailNotification,
} = userSettingSlice.actions;
export default userSettingSlice.reducer;
