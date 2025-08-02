import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, Button, IconButton } from "@mui/material";
import "../../../../css/User/Panels/Profile/MyProfileInfo.css";
import SettingsIcon from "@mui/icons-material/Settings";

function MyProfileInfo() {
  const { myProfile } = useSelector((store) => store.account);
  const [imgError, setImgError] = useState(false);
  return (
    <div className="flex-row-justify-space-around">
      <div className="flex-column">
        <div>
          <IconButton>
            <Avatar
              sx={{ width: 120, height: 120 }}
              src={
                !imgError && myProfile.myProfile?.profilePhotoId
                  ? `https://localhost:7126/api/Users/ProfileImage/${myProfile.myProfile.profilePhotoId}`
                  : undefined
              }
              onError={() => setImgError(true)}
            >
              {!myProfile.myProfile?.profilePhotoId &&
                myProfile.myProfile?.firstName?.[0].toUpperCase()}
            </Avatar>
          </IconButton>
        </div>
        <div style={{ paddingTop: "10px" }}>
          Topluluk Puanı: {myProfile.myProfile?.score}
        </div>
      </div>
      <div className="flex-row" style={{ marginBottom: "50px" }}>
        <div className="flex-column-justify-start profile-panel-name-surname">
          <div style={{ width: "200px" }}>
            {myProfile.myProfile?.firstName} {myProfile.myProfile?.lastName}
          </div>
          <div style={{ marginTop: "10px" }}>
            {myProfile.myProfile?.userName}
          </div>
        </div>
        <div className="profile-panel-button">
          <Button
            variant="contained"
            color="inherit"
            sx={{ marginRight: "20px", textTransform: "none" }}
          >
            Profili Düzenle
          </Button>
          <Button
            variant="contained"
            color="inherit"
            sx={{ marginRight: "20px", textTransform: "none" }}
          >
            Arşiv
          </Button>
        </div>
        <div>
          <IconButton>
            <SettingsIcon fontSize="large" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default MyProfileInfo;
