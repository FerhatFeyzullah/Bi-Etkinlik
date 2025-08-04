import React, { useEffect, useState } from "react";
import "../../../../css/User/Panels/Profile/ProfilePanel.css";
import { useDispatch, useSelector } from "react-redux";

import {
  GetMyProfile,
  SetAccountSliceResponse,
  SetPPRemoveMistake,
  SetPPUploadMistake,
} from "../../../../redux/slices/accountSlice";
import MyProfileInfo from "./MyProfileInfo";
import MyActivities from "./MyActivities";
import DeleteEventDialog from "./DeleteEventDialog";
import EventReviewDialog from "../EventReviewDialog";
import ReviewMapDialog from "../ReviewMapDialog";
import RateEventDialog from "./RateEventDialog";
import ToastMistake from "../../../Elements/ToastMistake";
import { SetEventRatedMistakeAlert } from "../../../../redux/slices/eventRegisterSlice";

function ProfilePanel() {
  const dispatch = useDispatch();
  const { eventRatedMistakeAlert, eventRegisterResponse } = useSelector(
    (store) => store.eventRegister
  );
  const { accountSliceResponse, ppUploadMistake, ppRemoveMistake } =
    useSelector((store) => store.account);

  const CloseEventRatedMistakeToast = () => {
    dispatch(SetEventRatedMistakeAlert(false));
  };
  const CloseUploadPPMistakeToast = () => {
    dispatch(SetPPUploadMistake(false));
  };
  const CloseRemovePPMistakeToast = () => {
    dispatch(SetPPRemoveMistake(false));
  };

  const UserId = localStorage.getItem("UserId");

  useEffect(() => {
    dispatch(GetMyProfile(UserId));
  }, []);

  return (
    <>
      <div className="profile-panel-container flex-column">
        <div style={{ height: "30%", width: "100%" }}>
          <MyProfileInfo />
        </div>
        <div style={{ height: "65%", width: "100%" }}>
          <MyActivities />
        </div>
      </div>
      <DeleteEventDialog />
      <EventReviewDialog />
      <RateEventDialog />
      <ReviewMapDialog />
      <ToastMistake
        visible={eventRatedMistakeAlert}
        detail={eventRegisterResponse}
        closer={CloseEventRatedMistakeToast}
      />
      <ToastMistake
        visible={ppUploadMistake}
        detail={accountSliceResponse}
        closer={CloseUploadPPMistakeToast}
      />
      <ToastMistake
        visible={ppRemoveMistake}
        detail={accountSliceResponse}
        closer={CloseRemovePPMistakeToast}
      />
    </>
  );
}

export default ProfilePanel;
