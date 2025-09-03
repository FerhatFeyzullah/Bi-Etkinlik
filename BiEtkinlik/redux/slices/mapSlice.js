import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

const initialState = {
  reviewLatitude: '',
  reviewLongitude: '',
  isMapReviewed: false,
};

export const mapSlice = createSlice({
  name: 'discovery',
  initialState,
  reducers: {
    SetReviewLatitude: (state, action) => {
      state.reviewLatitude = action.payload;
    },
    SetReviewLongitude: (state, action) => {
      state.reviewLongitude = action.payload;
    },
    SetIsMapReviewed: (state, action) => {
      state.isMapReviewed = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { SetReviewLatitude, SetReviewLongitude, SetIsMapReviewed } = mapSlice.actions;
export default mapSlice.reducer;
