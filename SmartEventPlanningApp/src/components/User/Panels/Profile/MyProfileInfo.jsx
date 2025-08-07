import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Button, IconButton } from "@mui/material";
import "../../../../css/User/Panels/Profile/MyProfileInfo.css";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  RemovePP,
  SetUpdateProfileDrawer,
  SetIsPhotoReviewedDialog,
  SetReviewedPhoto,
  SetUpdatedProfile,
  UploadPP,
} from "../../../../redux/slices/accountSlice";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import { SetUserSettingDrawer } from "../../../../redux/slices/userSettingSlice";
import { useTranslation } from "react-i18next";

function MyProfileInfo() {
  const { t: tButton } = useTranslation("button");
  const { t: tText } = useTranslation("text");

  const dispatch = useDispatch();

  const { myProfile } = useSelector((store) => store.account);
  const [imgError, setImgError] = useState(false);
  const UserId = localStorage.getItem("UserId");

  const isPPNull = myProfile.myProfile?.profilePhotoId == null;

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!allowedTypes.includes(selectedFile.type)) {
        alert("Sadece PNG veya JPG formatında bir fotoğraf yükleyebilirsin.");
        return;
      }

      const formData = new FormData();
      formData.append("Image", selectedFile);
      formData.append("AppUserId", UserId);

      console.log(formData);
      await dispatch(UploadPP(formData));
    }
  };

  const RemoveProfilePhoto = () => {
    dispatch(RemovePP(UserId));
  };

  const ReviewPhoto = () => {
    dispatch(SetReviewedPhoto(myProfile.myProfile.profilePhotoId));
    dispatch(SetIsPhotoReviewedDialog(true));
  };

  const EditProfile = () => {
    dispatch(SetUpdatedProfile(myProfile.myProfile));
    dispatch(SetUpdateProfileDrawer(true));
  };

  const ChangeUserSetting = () => {
    dispatch(SetUserSettingDrawer(true));
  };

  return (
    <div className="flex-row-justify-space-around">
      <div className="flex-column">
        <div style={{ position: "relative", display: "inline-block" }}>
          <IconButton>
            <Avatar
              sx={{
                width: 150,
                height: 150,
                cursor: "pointer",
                backgroundColor: "grey",
              }}
              src={
                !imgError && myProfile.myProfile?.profilePhotoId
                  ? `https://localhost:7126/api/Users/ProfileImage/${myProfile.myProfile.profilePhotoId}`
                  : undefined
              }
              onClick={ReviewPhoto}
              onError={() => setImgError(true)}
            >
              {!myProfile.myProfile?.profilePhotoId &&
                myProfile.myProfile?.firstName?.[0].toUpperCase()}
            </Avatar>
          </IconButton>

          <div style={{ position: "absolute", bottom: "5px", right: "5px" }}>
            <input
              type="file"
              accept="image/png, image/jpeg"
              style={{ display: "none" }}
              id="upload-photo"
              onChange={handleFileChange}
            />
            <label htmlFor="upload-photo">
              <IconButton
                size="small"
                component="span"
                style={{
                  backgroundColor: "rgba(219, 218, 218, 0.62)",
                }}
              >
                {isPPNull ? (
                  <AddIcon fontSize="small" />
                ) : (
                  <EditIcon fontSize="small" />
                )}
              </IconButton>
            </label>
          </div>

          {!isPPNull && (
            <div style={{ position: "absolute", top: "5px", right: "5px" }}>
              <IconButton
                size="small"
                component="span"
                style={{
                  backgroundColor: "rgba(219, 218, 218, 0.62)",
                }}
                onClick={RemoveProfilePhoto}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </div>
          )}
        </div>

        <div style={{ paddingTop: "10px" }}>
          {tText("communityScore")} {myProfile.myProfile?.score}
        </div>
      </div>
      <div className="flex-row" style={{ marginBottom: "50px" }}>
        <div className="flex-column-justify-start profile-panel-name-surname">
          <div style={{ width: "200px" }}>
            {myProfile.myProfile?.firstName} {myProfile.myProfile?.lastName}
          </div>
          <div style={{ marginTop: "10px", width: "200px" }}>
            {myProfile.myProfile?.userName}
          </div>
        </div>
        <div className="profile-panel-button">
          <Button
            variant="contained"
            color="inherit"
            sx={{ marginRight: "20px", textTransform: "none" }}
            onClick={EditProfile}
          >
            {tButton("editProfile")}
          </Button>
          <Button
            variant="contained"
            color="inherit"
            sx={{ marginRight: "20px", textTransform: "none" }}
          >
            {tButton("archive")}
          </Button>
        </div>
        <div>
          <IconButton onClick={ChangeUserSetting}>
            <SettingsIcon fontSize="large" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default MyProfileInfo;
