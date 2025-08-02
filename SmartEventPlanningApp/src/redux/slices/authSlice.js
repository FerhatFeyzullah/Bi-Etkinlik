import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  loginLoading: false,
  loginMistakeAlert: false,
  errorMessage: "",
  registerLoading: false,
  registerSuccessAlert: false,
  registerMistakeAlert: false,
  registerResponse: "",
  registerStatus: false,
  token: {},
};

export const LoginTheSystem = createAsyncThunk("login", async (data) => {
  const response = await axios.post("Auths/LoginTheSystem", data, {});
  return response.data;
});
export const RegisterTheSystem = createAsyncThunk("register", async (data) => {
  const response = await axios.post("Auths/RegisterTheSystem", data, {});
  return response.data;
});

export const ReadToken = createAsyncThunk("readToken", async () => {
  const response = await axios.get("Auths/CheckMe", {
    withCredentials: true, // Cookie ile birlikte gönder
  });
  return response.data;
});

export const LogoutFromSystem = createAsyncThunk("logout", async (data) => {
  await axios.post("Auths/Logout", data);
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Logout: (state) => {
      state.token = {};
    },
    SetLoginMistakeAlert: (state) => {
      state.loginMistakeAlert = false;
    },
    SetRegisterMistakeAlert: (state) => {
      state.registerMistakeAlert = false;
    },
    SetRegisterSuccessAlert: (state) => {
      state.registerSuccessAlert = false;
    },
    SetRegisterStatusFalse: (state) => {
      state.registerStatus = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //LoginPost
      .addCase(LoginTheSystem.pending, (state) => {
        state.loginLoading = true;
        state.errorMessage = "";
        state.loginMistakeAlert = false;
      })
      .addCase(LoginTheSystem.fulfilled, (state, action) => {
        state.loginLoading = false;

        if (action.payload) {
          state.errorMessage = "";
          state.loginMistakeAlert = false;
        } else {
          state.errorMessage = action.payload.message;
          state.loginMistakeAlert = true;
        }
      })
      .addCase(LoginTheSystem.rejected, (state) => {
        state.loginLoading = false;
        state.errorMessage = "Sunucuya ulaşılamadı.";
        state.loginMistakeAlert = true;
      })

      //Register
      .addCase(RegisterTheSystem.pending, (state) => {
        state.registerLoading = true;
      })
      .addCase(RegisterTheSystem.fulfilled, (state, action) => {
        state.registerLoading = false;

        if (action.payload.success) {
          state.registerResponse = action.payload.message;
          state.registerSuccessAlert = true;
          state.registerStatus = true;
        } else {
          state.registerResponse = action.payload.message;
          state.registerMistakeAlert = true;
        }
      })
      .addCase(RegisterTheSystem.rejected, (state) => {
        state.registerLoading = false;
        state.registerResponse = "Sunucuya ulaşılamadı.";
        state.registerMistakeAlert = true;
      })

      //ReadToken
      .addCase(ReadToken.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(ReadToken.rejected, (state) => {
        state.token = {};
      })

      //LogoutFromSystem
      .addCase(LogoutFromSystem.fulfilled, (state) => {
        state.logoutLoading = true;
        state.token = {};
      });
  },
});

export const {
  SetLoginMistakeAlert,
  SetRegisterMistakeAlert,
  SetRegisterSuccessAlert,
  SetRegisterStatusFalse,
} = authSlice.actions;
export default authSlice.reducer;
