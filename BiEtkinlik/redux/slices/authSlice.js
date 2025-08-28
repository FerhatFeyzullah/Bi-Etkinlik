import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../api/axios'
import AsyncStorage from '@react-native-async-storage/async-storage';


const initialState = {
    loginToastMistake: false,
    loginResponse: "",
}

export const LoginTheSystem = createAsyncThunk('login', async (data) => {
    var response = await axios.post("Auths/LoginTheSystemFromMobile", data);
    return response.data;
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        SetLoginToastMistake: (state, action) => {
            state.loginToastMistake = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(LoginTheSystem.pending, (state) => {

            })
            .addCase(LoginTheSystem.fulfilled, (state, action) => {
                if (action.payload.success) {
                    AsyncStorage.setItem("token", action.payload.message);
                    state.loginResponse = "";
                    state.loginToastMistake = false;

                }
                else {
                    state.loginToastMistake = true;
                    if (action.payload.message == "Error-1") {
                        state.loginResponse = "auth.loginFulfilledErrorOne";
                    }
                    else if (action.payload.message == "Error-2") {
                        state.loginResponse = "auth.loginFulfilledErrorTwo";
                    }
                }

            })
            .addCase(LoginTheSystem.rejected, (state) => {
                state.loginResponse = "rejected";
                state.loginToastMistake = true;
            })
    }
})

export const { SetLoginToastMistake } = authSlice.actions
export default authSlice.reducer