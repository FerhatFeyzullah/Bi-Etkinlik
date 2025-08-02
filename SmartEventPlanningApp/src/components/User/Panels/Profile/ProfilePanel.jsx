import React, { useEffect, useState } from "react";
import "../../../../css/User/Panels/Profile/ProfilePanel.css";
import { useDispatch, useSelector } from "react-redux";

import { GetMyProfile } from "../../../../redux/slices/accountSlice";
import MyProfileInfo from "./MyProfileInfo";
import MyActivities from "./MyActivities";

function ProfilePanel() {
  const dispatch = useDispatch();

  const UserId = localStorage.getItem("UserId");

  useEffect(() => {
    dispatch(GetMyProfile(UserId));
  }, []);

  return (
    <div className="profile-panel-container flex-column">
      <div style={{ height: "30%", width: "100%" }}>
        <MyProfileInfo />
      </div>
      <div style={{ height: "65%", width: "100%" }}>
        <MyActivities />
      </div>
    </div>
  );
}

export default ProfilePanel;
