import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  cardCount: 1,
  stepCount: 0,
  recoveryEmail: "",
  fpErrorMessage: "",
  fpMistake: false,
  fploading: false,
};

export const SendResetCode = createAsyncThunk("resetCode", async (data) => {
  var response = await axios.post("Users/SendResetCode", data);
  return response.data;
});
export const SendResetCodeAgain = createAsyncThunk(
  "sendAgain",
  async (data) => {
    await axios.post("Users/SendResetCode", data);
  }
);
export const VerifyCode = createAsyncThunk("verifyCode", async (data) => {
  var response = await axios.post("Users/VerifyResetCode", data);
  return response.data;
});
export const ChangeForgotPassword = createAsyncThunk(
  "newpassword",
  async (data) => {
    await axios.post("Users/ChangeForgotPassword", data);
  }
);

export const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    IncrementCardCount: (state) => {
      state.cardCount += 1;
    },
    DecrementCardCount: (state) => {
      state.cardCount -= 1;
    },
    IncrementStepCount: (state) => {
      state.stepCount += 1;
    },
    DecrementStepCount: (state) => {
      state.stepCount -= 1;
    },
    SetRecoveryEmail: (state, action) => {
      state.recoveryEmail = action.payload;
    },
    SetFP_Mistake: (state, action) => {
      state.fpMistake = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //SendResetCode
      .addCase(SendResetCode.pending, (state) => {
        state.fploading = true;
      })
      .addCase(SendResetCode.fulfilled, (state, action) => {
        state.fploading = false;

        if (action.payload !== "") {
          state.fpMistake = true;
          state.fpErrorMessage = "forgotPassword.sendResetCode";
        } else {
          state.fpErrorMessage = "";
          state.cardCount += 1;
          state.stepCount += 1;
        }
      })
      .addCase(SendResetCode.rejected, (state) => {
        state.fploading = false;
        state.fpErrorMessage = "rejected";
        state.fpMistake = true;
      })

      //VerifyCode
      .addCase(VerifyCode.pending, (state) => {
        state.fploading = true;
      })
      .addCase(VerifyCode.fulfilled, (state, action) => {
        state.fploading = false;

        if (action.payload == false) {
          state.fpMistake = true;
          state.fpErrorMessage = "forgotPassword.verifyCodeFulfilledError";
        } else {
          state.fpErrorMessage = "";
          state.cardCount += 1;
          state.stepCount += 1;
        }
      })
      .addCase(VerifyCode.rejected, (state) => {
        state.fploading = false;
        state.fpErrorMessage = "rejected";
        state.fpMistake = true;
      })

      //ChangeForgotPassword
      .addCase(ChangeForgotPassword.pending, (state) => {
        state.fploading = true;
      })
      .addCase(ChangeForgotPassword.fulfilled, (state) => {
        state.fploading = false;

        state.cardCount += 1;
        state.stepCount += 1;
      })
      .addCase(ChangeForgotPassword.rejected, (state) => {
        state.fploading = false;
        state.fpErrorMessage = "rejected";
        state.fpMistake = true;
      });
  },
});

export const {
  IncrementCardCount,
  DecrementCardCount,
  IncrementStepCount,
  DecrementStepCount,
  SetRecoveryEmail,
  SetFP_Mistake,
} = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
