import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "@mui/material";
import {
  SetIsPhotoReviewedDialog,
  SetReviewedPhoto,
} from "../../../redux/slices/accountSlice";

function PhotoReviewDialog() {
  const dispatch = useDispatch();
  const { isPhotoReviewedDialog, reviewedPhoto } = useSelector(
    (store) => store.account
  );

  const Close = () => {
    dispatch(SetIsPhotoReviewedDialog(false));
    dispatch(SetReviewedPhoto(""));
  };

  return (
    <>
      <Dialog open={isPhotoReviewedDialog} onClose={() => dispatch(Close())}>
        <img
          src={`https://localhost:7126/api/Users/ProfileImage/${reviewedPhoto}`}
          alt="Profile"
          style={{ width: "100%", height: "auto" }}
        />
      </Dialog>
    </>
  );
}

export default PhotoReviewDialog;
