import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  myProfile: {},
  isPhotoReviewedDialog: false,
  reviewedPhoto: "",
  accountSliceResponse: "",
  ppUploadMistake: false,
  ppRemoveMistake: false,
  updateProfileDrawer: false,
  updatedProfile: {},
  updateProfileLoading: false,
  updateProfileMistake: false,
  updateProfileSuccess: false,
};

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

export const UpdateProfile = createAsyncThunk("updateProfile", async (data) => {
  var response = await axios.put("Users/UpdateProfile", data);
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
    SetIsPhotoReviewedDialog: (state, action) => {
      state.isPhotoReviewedDialog = action.payload;
    },
    SetReviewedPhoto: (state, action) => {
      state.reviewedPhoto = action.payload;
    },
    SetUpdateProfileDrawer: (state, action) => {
      state.updateProfileDrawer = action.payload;
    },
    SetUpdatedProfile: (state, action) => {
      state.updatedProfile = action.payload;
    },
    SetUpdateProfileMistake: (state, action) => {
      state.updateProfileMistake = action.payload;
    },
    SetUpdateProfileSuccess: (state, action) => {
      state.updateProfileSuccess = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

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
      })

      //UpdateProfile
      .addCase(UpdateProfile.pending, (state) => {
        state.updateProfileLoading = true;
      })
      .addCase(UpdateProfile.fulfilled, (state, action) => {
        state.myProfile = action.payload;
        state.updateProfileDrawer = false;
        state.updateProfileLoading = false;
        state.updateProfileSuccess = true;
        state.accountSliceResponse =
          "Profil bilgileri başarıyla güncellendi.";
      })
      .addCase(UpdateProfile.rejected, (state) => {
        state.updateProfileLoading = false;
        state.updateProfileDrawer = false;
        state.accountSliceResponse =
          "Profil bilgileri güncellenirken beklenmeyen bir hata oluştu.";
        state.updateProfileMistake = true;
      });
  },
});

export const {
  SetPPUploadMistake,
  SetPPRemoveMistake,
  SetAccountSliceResponse,
  SetIsPhotoReviewedDialog,
  SetReviewedPhoto,
  SetUpdateProfileDrawer,
  SetUpdatedProfile,
  SetUpdateProfileMistake,
  SetUpdateProfileSuccess,
} = accountSlice.actions;
export default accountSlice.reducer;
