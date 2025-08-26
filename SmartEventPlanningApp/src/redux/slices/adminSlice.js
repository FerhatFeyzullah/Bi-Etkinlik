import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
    users: []
};

export const GetAllUsers = createAsyncThunk('getAllUSers', async (id) => {
    var response = await axios.get('Users/GetAllUsers', {
        params: {
            AdminId: id,
        }
    })
    return response.data;
})

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(GetAllUsers.fulfilled, (state, action) => {
                state.users = action.payload.users;
            })
            .addCase(GetAllUsers.rejected, (state) => {
                console.log("getAllUsers Failed");
            })
    },
});

export const { } = adminSlice.actions;
export default adminSlice.reducer;