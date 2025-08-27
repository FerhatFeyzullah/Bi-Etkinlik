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

export const ReadToken = createAsyncThunk("readToken", async () => {
  const response = await axios.get("Auths/CheckMe", {
    withCredentials: true, // Cookie ile birlikte gönder
  });
  return response.data;
});

export const RegisterTheSystem = createAsyncThunk("register", async (data) => {
  const response = await axios.post("Auths/RegisterTheSystem", data, {});
  return response.data;
});



export const LogoutFromSystem = createAsyncThunk("logout", async (data) => {
  await axios.post("Auths/LogoutFromSystem", data);
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
        if (action.payload.success) {
          state.errorMessage = "";
          state.loginMistakeAlert = false;
        } else {
          state.loginMistakeAlert = true;
          if (action.payload.message == "Error-1") {
            state.errorMessage = "auth.loginFulfilledErrorOne";
          }
          else if (action.payload.message == "Error-2") {
            state.errorMessage = "auth.loginFulfilledErrorTwo";
          }
        }
      })
      .addCase(LoginTheSystem.rejected, (state) => {
        state.loginLoading = false;
        state.errorMessage = "rejected";
        state.loginMistakeAlert = true;
      })

      //Register
      .addCase(RegisterTheSystem.pending, (state) => {
        state.registerLoading = true;
      })
      .addCase(RegisterTheSystem.fulfilled, (state, action) => {
        state.registerLoading = false;

        if (action.payload.success) {
          state.registerResponse = "auth.registerFulfilledSuccess";
          state.registerSuccessAlert = true;
          state.registerStatus = true;
        } else {
          state.registerMistakeAlert = true;
          if (action.payload.message == "Error-1") {
            state.registerResponse = "auth.registerFulfilledErrorOne";
          }
          else if (action.payload.message == "Error-2") {
            state.registerResponse = "auth.registerFulfilledErrorTwo";
          }
          else if (action.payload.message == "Error-3") {
            state.registerResponse = "auth.registerFulfilledErrorThree";
          }
          else if (action.payload.message == "Error-4") {
            state.registerResponse = "auth.registerFulfilledErrorFour";
          }
        }
      })
      .addCase(RegisterTheSystem.rejected, (state) => {
        state.registerLoading = false;
        state.registerResponse = "rejected";
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
