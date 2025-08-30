import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../api/axios'
import AsyncStorage from '@react-native-async-storage/async-storage';


const initialState = {
    loginLoading: false,
    loginMistakeAlert: false,
    loginResponse: "",
    registerLoading: false,
    registerSuccessAlert: false,
    registerMistakeAlert: false,
    registerResponse: "",
}

export const LoginTheSystem = createAsyncThunk('login', async (data) => {
    var response = await axios.post("Auths/LoginTheSystemFromMobile", data);
    return response.data;
});

export const RegisterTheSystem = createAsyncThunk("register", async (data) => {
    const response = await axios.post("Auths/RegisterTheSystem", data, {});
    return response.data;
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        SetLoginMistakeAlert: (state, action) => {
            state.loginMistakeAlert = action.payload;
        },
        SetRegisterMistakeAlert: (state) => {
            state.registerMistakeAlert = false;
        },
        SetRegisterSuccessAlert: (state) => {
            state.registerSuccessAlert = false;
        },
    },
    extraReducers: (builder) => {
        builder

            //Login
            .addCase(LoginTheSystem.pending, (state) => {
                state.loginLoading = true;
            })
            .addCase(LoginTheSystem.fulfilled, (state, action) => {
                state.loginLoading = false;
                if (action.payload.success) {
                    AsyncStorage.setItem("token", action.payload.message);
                    state.loginResponse = "";
                    state.loginMistakeAlert = false;

                }
                else {
                    state.loginMistakeAlert = true;
                    if (action.payload.message == "Error-1") {
                        state.loginResponse = "auth.loginFulfilledErrorOne";
                    }
                    else if (action.payload.message == "Error-2") {
                        state.loginResponse = "auth.loginFulfilledErrorTwo";
                    }
                }
            })
            .addCase(LoginTheSystem.rejected, (state) => {
                state.loginLoading = false;
                state.loginResponse = "rejected";
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
    }
})

export const { SetLoginMistakeAlert, SetRegisterMistakeAlert, SetRegisterSuccessAlert } = authSlice.actions
export default authSlice.reducer