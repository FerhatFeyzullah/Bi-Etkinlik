import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SetUserSettingDrawer,
  SetChangePasswordDrawer,
  SetTheme,
  UpdateTheme,
  UpdateViewMode,
  UpdateLanguage,
  SetViewMode,
  SetLanguage,
  SetEmailNotification,
  UpdateEmailNotification,
  SendResetCode,
} from "../../../../redux/slices/userSettingSlice";
import { Drawer, Tooltip } from "@mui/material";
import "../../../../css/User/Panels/Profile/UserSettingDrawer.css";
import Switch from "react-switch";
import { Button } from "@mui/material";
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import EmailIcon from '@mui/icons-material/Email';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTranslation } from "react-i18next";
import { SetRemoveAccountDialog, SetTheRemovedAccount } from "../../../../redux/slices/accountSlice";


function UserSettingDrawer() {
  const { t: tButton } = useTranslation("button");
  const { t: tText } = useTranslation("text");
  const { t: tTooltip } = useTranslation("tooltip");

  const { i18n } = useTranslation();

  const dispatch = useDispatch();
  const { userSettingDrawer, theme, viewMode, language, emailNotification } =
    useSelector((store) => store.userSetting);
  const { myProfile } = useSelector((store) => store.account);
  const emailConfirmed = myProfile?.myProfile?.emailConfirmed;
  const email = myProfile?.myProfile?.email;


  const UserId = localStorage.getItem("UserId");

  const Close = () => {
    dispatch(SetUserSettingDrawer(false));
  };
  const ChangePasswordDrawer = () => {
    dispatch(SetUserSettingDrawer(false));
    dispatch(SetChangePasswordDrawer(true));
  };

  const EmailVerificationDialog = () => {
    var data = {
      Email: email
    }
    dispatch(SendResetCode(data));
  }

  const HandleChangeLanguage = (event) => {
    const newLanguage = event.target.value;
    dispatch(SetLanguage(newLanguage));
    i18n.changeLanguage(newLanguage);
    dispatch(UpdateLanguage({ AppUserId: UserId, Language: newLanguage }));
  };

  const RemoveAccountDialog = () => {
    dispatch(SetRemoveAccountDialog(true));
    dispatch(SetTheRemovedAccount(UserId));
  }

  return (
    <>
      <Drawer
        open={userSettingDrawer}
        onClose={Close}
        anchor="right"
        PaperProps={{
          sx: {
            position: "absolute", // ✅ artık fixed değil
            top: "150px", // ✅ istediğin kadar aşağı al
            height: "auto", // ✅ yükseklik belirle
            borderRadius: "10px",
            marginRight: "10px",
            width: "400px",
            backgroundColor: "whitesmoke",
          },
        }}
      >
        <div className="flex-column-justify-start">
          <h3>{tText("userSettings")}</h3>
          <div className="flex-column-align-justify-start">
            {/* ViewMode */}
            <div className="flex-row" style={{ margin: "10px 0px" }}>
              <Switch
                checked={viewMode === "list"}
                onChange={(checked) => {
                  const newViewMode = checked ? "list" : "card";

                  dispatch(SetViewMode(newViewMode)); // UI hemen güncellensin
                  dispatch(
                    UpdateViewMode({ AppUserId: UserId, ViewMode: newViewMode })
                  ); // backend'e yolla
                }}
                width={100}
                height={36}
                handleDiameter={28}
                offColor="#ccc"
                onColor="#4caf50"
                uncheckedIcon={false}
                checkedIcon={false}
              />
              <div className="user-setting-switch-text">
                {tButton("listView")}
              </div>
            </div>
            {/* Theme */}
            <Tooltip title={tTooltip("darkModeSwitch")}>
              <div className="flex-row" style={{ margin: "10px 0px" }}>
                <Switch
                  disabled
                  checked={theme === "dark"}
                  onChange={(checked) => {
                    const newTheme = checked ? "dark" : "light";
                    dispatch(SetTheme(newTheme)); // UI hemen güncellensin
                    dispatch(UpdateTheme({ AppUserId: UserId, Theme: newTheme })); // backend'e yolla
                  }}
                  width={100}
                  height={36}
                  handleDiameter={28}
                  offColor="#ccc"
                  onColor="#4caf50"
                  uncheckedIcon={false}
                  checkedIcon={false}
                />
                <div className="user-setting-switch-text">
                  {tButton("darkMode")}
                </div>
              </div>
            </Tooltip>
            {/* EmailNotification */}
            <div className="flex-row" style={{ margin: "10px 0px" }}>
              <Tooltip
                title={
                  !emailConfirmed
                    ? "E-posta bildirimi için önce e-posta adresinizi onaylamanız gerekir."
                    : ""
                }
                placement="bottom-start"
              >
                <span>
                  <Switch
                    disabled={!emailConfirmed}
                    checked={emailNotification}
                    onChange={(checked) => {
                      const newEmailNotification = checked ? true : false;
                      console.log(newEmailNotification);

                      dispatch(SetEmailNotification(newEmailNotification)); // UI hemen güncellensin
                      dispatch(
                        UpdateEmailNotification({
                          AppUserId: UserId,
                          EmailNotification: newEmailNotification,
                        })
                      ); // backend'e yolla
                    }}
                    width={100}
                    height={36}
                    handleDiameter={28}
                    offColor="#ccc"
                    onColor="#4caf50"
                    uncheckedIcon={false}
                    checkedIcon={false}
                  />
                </span>
              </Tooltip>

              <div className="user-setting-switch-text">
                {tButton("emailNotification")}
              </div>
            </div>
            {/* Language */}
            <div className="flex-row" style={{ margin: "10px 0px" }}>
              <FormControl sx={{ width: "110px" }} size="small">
                <Select value={language} onChange={HandleChangeLanguage}>
                  <MenuItem value={"tr"}>{tText("turkish")}</MenuItem>
                  <MenuItem value={"en"}>{tText("english")}</MenuItem>
                  <MenuItem value={"de"}>{tText("deutsch")}</MenuItem>
                  <MenuItem value={"fr"}>{tText("french")}</MenuItem>
                  <MenuItem value={"es"}>{tText("spanish")}</MenuItem>
                  <MenuItem value={"ru"}>{tText("russian")}</MenuItem>
                  <MenuItem value={"ar"}>{tText("arabic")}</MenuItem>
                  <MenuItem value={"zh"}>{tText("chinese")}</MenuItem>
                  <MenuItem value={"nl"}>{tText("dutch")}</MenuItem>
                  <MenuItem value={"ur"}>{tText("urdu")}</MenuItem>
                </Select>
              </FormControl>
              <div className="user-setting-switch-text">
                {tButton("systemLanguage")}
              </div>
            </div>
            {/* ChangePassword */}
            <div className="flex-row user-setting-button">
              <Button
                variant="outlined"
                size="large"
                startIcon={<LockOutlineIcon />}
                sx={{
                  color: "#000000ff",
                  textTransform: "none",
                  fontWeight: 600,
                }}
                fullWidth
                onClick={ChangePasswordDrawer}
              >
                {tButton("changeMyPassword")}
              </Button>
            </div>
            {/* EmailConfirm */}
            <div className="flex-row user-setting-button">
              <Button
                disabled={emailConfirmed}
                variant="outlined"
                size="large"
                startIcon={<EmailIcon />}
                sx={{
                  color: "#000000ff",
                  textTransform: "none",
                  fontWeight: 600,
                }}
                fullWidth
                onClick={EmailVerificationDialog}
              >
                {
                  emailConfirmed ?
                    tButton("emailConfirmed")
                    :
                    tButton("confirmMyEmail")}
              </Button>
            </div>
            {/* Remove Account */}
            <div className="flex-row user-setting-button">
              <Button
                variant="outlined"
                color="error"
                size="large"
                startIcon={<DeleteIcon />}
                sx={{
                  color: "#000000ff",
                  textTransform: "none",
                  fontWeight: 600,

                }}
                fullWidth

                onClick={RemoveAccountDialog}
              >
                Hesabımı Sil
              </Button>
            </div>

          </div>
        </div>
      </Drawer>
    </>
  );
}

export default UserSettingDrawer;
