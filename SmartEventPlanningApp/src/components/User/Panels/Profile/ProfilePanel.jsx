import React, { useEffect, useState } from "react";
import "../../../../css/User/Panels/Profile/ProfilePanel.css";
import { useDispatch, useSelector } from "react-redux";

import {
  GetMyProfile,
  SetPPRemoveMistake,
  SetPPUploadMistake,
  SetRemoveAccountMistake,
  SetRemoveAccountSuccess,
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
import { useTranslation } from "react-i18next";
import DeleteAccountDialog from "../../../Dialogs/DeleteAccountDialog";
import { LogoutFromSystem } from "../../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";


function ProfilePanel() {
  const { t: tAlert } = useTranslation("alert");
  const { i18n } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    removeAccountMistake,
    removeAccountSuccess,
    removeAccountLoading,
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
  const CloseRemoveAccountMistake = () => {
    dispatch(SetRemoveAccountMistake(false));
  };
  const CloseRemoveAccountSuccess = async () => {
    dispatch(SetRemoveAccountSuccess(false));
    SignOut();

  };

  const SignOut = async () => {
    try {
      await dispatch(LogoutFromSystem()).unwrap();
      localStorage.clear();
      dispatch({ type: "auth/logout" });
      i18n.changeLanguage("tr");
      navigate("/girisyap");

    } catch (error) {
      console.error("Çıkış başarısız:", error);
    }
  }

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
      <DeleteAccountDialog />

      {/* EventRate */}

      <ToastMistake
        visible={eventRatedMistakeAlert}
        detail={tAlert(eventRegisterResponse)}
        closer={CloseEventRatedMistakeToast}
      />
      {/* PP Upload */}

      <ToastMistake
        visible={ppUploadMistake}
        detail={tAlert(accountSliceResponse)}
        closer={CloseUploadPPMistakeToast}
      />

      {/* PP Remove */}
      <ToastMistake
        visible={ppRemoveMistake}
        detail={tAlert(accountSliceResponse)}
        closer={CloseRemovePPMistakeToast}
      />

      {/* Remove Account */}
      <ToastMistake
        visible={removeAccountMistake}
        detail={tAlert(accountSliceResponse)}
        closer={CloseRemoveAccountMistake}
      />
      <ToastSuccess
        visible={removeAccountSuccess}
        detail={tAlert(accountSliceResponse)}
        closer={CloseRemoveAccountSuccess}
      />

      {/* UpdateProfile */}
      <ToastMistake
        visible={updateProfileMistake}
        detail={tAlert(accountSliceResponse)}
        closer={CloseUpdateProfileMistake}
      />
      <ToastSuccess
        visible={updateProfileSuccess}
        detail={tAlert(accountSliceResponse)}
        closer={CloseUpdateProfileSuccess}
      />
      <Loading status={updateProfileLoading} />

      {/* Change Password */}
      <ToastMistake
        visible={changePassMistake}
        detail={tAlert(changePassResponse)}
        closer={CloseChangePasswordMistake}
      />
      <ToastSuccess
        visible={changePassSuccess}
        detail={tAlert(changePassResponse)}
        closer={CloseChangePasswordSuccess}
      />

      {/* Email Verification */}
      <ToastMistake
        visible={confirmEmailMistake}
        detail={tAlert(confrimEmailResponse)}
        closer={CloseEmailVerificationMistake}
      />
      <ToastSuccess
        visible={confirmEmailSuccess}
        detail={tAlert(confrimEmailResponse)}
        closer={CloseEmailVerificationSuccess}
      />

      {/* Change Password */}
      <Loading status={changePassLoading} />

      {/* Remove Account */}
      <Loading status={removeAccountLoading} />

      {/* Email Verification */}
      <Loading status={confirmEmailLoading} />
    </>
  );
}

export default ProfilePanel;
