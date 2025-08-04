import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  myProfile: {},
  accountSliceResponse: "",
  ppUploadMistake: false,
  ppRemoveMistake: false,
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

export const UploadPP = createAsyncThunk("uploadPP", async (data) => {
  var response = await axios.put("Users/UploadProfilePhoto", data);
  return response.data;
});
export const RemovePP = createAsyncThunk("removePP", async (id) => {
  var response = await axios.put("Users/RemoveProfilePhoto/" + id);
  return response.data;
});

export const accountSlice = createSlice({
  name: "discovery",
  initialState,
  reducers: {
    SetPPUploadMistake: (state, action) => {
      state.ppUploadMistake = action.payload;
    },
    SetPPRemoveMistake: (state, action) => {
      state.ppRemoveMistake = action.payload;
    },
    SetAccountSliceResponse: (state) => {
      state.accountSliceResponse = "";
    },
  },
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
      })

      //UploadPP
      .addCase(UploadPP.fulfilled, (state, action) => {
        state.myProfile = action.payload;
      })
      .addCase(UploadPP.rejected, (state) => {
        state.accountSliceResponse =
          "Profil fotoğrafı yüklenirken beklenmeyen bir hata oluştu.";
        state.ppUploadMistake = true;
      })

      //RemovePP
      .addCase(RemovePP.fulfilled, (state, action) => {
        state.myProfile = action.payload;
      })
      .addCase(RemovePP.rejected, (state) => {
        state.accountSliceResponse =
          "Profil fotoğrafı silinirken beklenmeyen bir hata oluştu.";
        state.ppRemoveMistake = true;
      });
  },
});

export const {
  SetPPUploadMistake,
  SetPPRemoveMistake,
  SetAccountSliceResponse,
} = accountSlice.actions;
export default accountSlice.reducer;
