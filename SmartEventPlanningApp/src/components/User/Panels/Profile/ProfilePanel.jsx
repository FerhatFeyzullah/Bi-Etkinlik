import React, { useEffect, useState } from "react";
import "../../../../css/User/Panels/Profile/ProfilePanel.css";
import { useDispatch, useSelector } from "react-redux";

import {
  GetMyProfile,
  SetPPRemoveMistake,
  SetPPUploadMistake,
  SetUpdateProfileMistake,
  SetUpdateProfileSuccess,
} from "../../../../redux/slices/accountSlice";
import MyProfileInfo from "./MyProfileInfo";
import MyActivities from "./MyActivities";
import DeleteEventRegisterDialog from "./DeleteEventRegisterDialog";
import EventReviewDialog from "../EventReviewDialog";
import ReviewMapDialog from "../ReviewMapDialog";
import RateEventDialog from "./RateEventDialog";
import ToastMistake from "../../../Elements/ToastMistake";
import ToastSuccess from "../../../Elements/ToastSuccess";
import { SetEventRatedMistakeAlert } from "../../../../redux/slices/eventRegisterSlice";
import PhotoReviewDialog from "../PhotoReviewDialog";
import UpdateProfileDrawer from "./UpdateProfileDrawer";
import Loading from "../../../Elements/Loading";
import UserSettingDrawer from "./UserSettingDrawer";
import ChangePasswordDrawer from "./ChangePasswordDrawer";
import {
  SetChangePassMistake,
  SetChangePassSuccess,
  SetConfrimEmailMistake,
  SetConfrimEmailSuccess,
} from "../../../../redux/slices/userSettingSlice";
import EmailVerificationDialog from "./EmailVerificationDialog";

function ProfilePanel() {
  const dispatch = useDispatch();
  const { eventRatedMistakeAlert, eventRegisterResponse } = useSelector(
    (store) => store.eventRegister
  );
  const {
    changePassResponse,
    changePassSuccess,
    changePassMistake,
    changePassLoading,
    confirmEmailDialog,
    confirmEmailLoading,
    confirmEmailMistake,
    confirmEmailSuccess,
    confrimEmailResponse,
  } = useSelector((store) => store.userSetting);

  const {
    accountSliceResponse,
    ppUploadMistake,
    ppRemoveMistake,
    updateProfileMistake,
    updateProfileSuccess,
    updateProfileLoading,
  } = useSelector((store) => store.account);

  const CloseEventRatedMistakeToast = () => {
    dispatch(SetEventRatedMistakeAlert(false));
  };
  const CloseUploadPPMistakeToast = () => {
    dispatch(SetPPUploadMistake(false));
  };
  const CloseRemovePPMistakeToast = () => {
    dispatch(SetPPRemoveMistake(false));
  };
  const CloseUpdateProfileMistake = () => {
    dispatch(SetUpdateProfileMistake(false));
  };
  const CloseUpdateProfileSuccess = () => {
    dispatch(SetUpdateProfileSuccess(false));
  };
  const CloseChangePasswordMistake = () => {
    dispatch(SetChangePassMistake(false));
  };
  const CloseChangePasswordSuccess = () => {
    dispatch(SetChangePassSuccess(false));
  };
  const CloseEmailVerificationMistake = () => {
    dispatch(SetConfrimEmailMistake(false));
  };
  const CloseEmailVerificationSuccess = () => {
    dispatch(SetConfrimEmailSuccess(false));
  };

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

      <DeleteEventRegisterDialog />
      <EventReviewDialog />
      <RateEventDialog />
      <ReviewMapDialog />
      <PhotoReviewDialog />
      <UpdateProfileDrawer />
      <UserSettingDrawer />
      <ChangePasswordDrawer />
      {
        confirmEmailDialog &&
        <EmailVerificationDialog />

      }

      {/* EventRate */}

      <ToastMistake
        visible={eventRatedMistakeAlert}
        detail={eventRegisterResponse}
        closer={CloseEventRatedMistakeToast}
      />
      {/* PP Upload */}

      <ToastMistake
        visible={ppUploadMistake}
        detail={accountSliceResponse}
        closer={CloseUploadPPMistakeToast}
      />

      {/* PP Remove */}
      <ToastMistake
        visible={ppRemoveMistake}
        detail={accountSliceResponse}
        closer={CloseRemovePPMistakeToast}
      />

      {/* UpdateProfile */}
      <ToastMistake
        visible={updateProfileMistake}
        detail={accountSliceResponse}
        closer={CloseUpdateProfileMistake}
      />
      <ToastSuccess
        visible={updateProfileSuccess}
        detail={accountSliceResponse}
        closer={CloseUpdateProfileSuccess}
      />
      <Loading status={updateProfileLoading} />

      {/* Change Password */}
      <ToastMistake
        visible={changePassMistake}
        detail={changePassResponse}
        closer={CloseChangePasswordMistake}
      />
      <ToastSuccess
        visible={changePassSuccess}
        detail={changePassResponse}
        closer={CloseChangePasswordSuccess}
      />

      {/* Email Verification */}
      <ToastMistake
        visible={confirmEmailMistake}
        detail={confrimEmailResponse}
        closer={CloseEmailVerificationMistake}
      />
      <ToastSuccess
        visible={confirmEmailSuccess}
        detail={confrimEmailResponse}
        closer={CloseEmailVerificationSuccess}
      />

      {/* Change Password */}
      <Loading status={changePassLoading} />
      {/* Email Verification */}
      <Loading status={confirmEmailLoading} />
    </>
  );
}

export default ProfilePanel;
