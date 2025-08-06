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
} from "../../../../redux/slices/userSettingSlice";
import { Drawer, Tooltip } from "@mui/material";
import "../../../../css/User/Panels/Profile/UserSettingDrawer.css";
import Switch from "react-switch";
import { Button } from "@mui/material";
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function UserSettingDrawer() {
  const dispatch = useDispatch();
  const { userSettingDrawer, theme, viewMode, language, emailNotification } =
    useSelector((store) => store.userSetting);
  const { myProfile } = useSelector((store) => store.account);

  const UserId = localStorage.getItem("UserId");

  const Close = () => {
    dispatch(SetUserSettingDrawer(false));
  };
  const ChangePasswordDrawerOpen = () => {
    dispatch(SetUserSettingDrawer(false));
    dispatch(SetChangePasswordDrawer(true));
  };

  const HandleChangeLanguage = (event) => {
    const newLanguage = event.target.value;
    dispatch(SetLanguage(newLanguage));
    dispatch(UpdateLanguage({ AppUserId: UserId, Language: newLanguage }));
  };

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
          <h3>Kullanıcı Ayarları</h3>
          <div className="flex-column-align-justify-start">
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
              <div className="user-setting-switch-text">Liste Görünümü</div>
            </div>
            <div className="flex-row" style={{ margin: "10px 0px" }}>
              <Switch
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
              <div className="user-setting-switch-text">Karanlık Mod</div>
            </div>
            <div className="flex-row" style={{ margin: "10px 0px" }}>
              <Tooltip
                title={
                  !myProfile.myProfile.emailConfirmed
                    ? "E-posta bildirimi için önce e-posta adresinizi onaylamanız gerekir."
                    : ""
                }
                placement="bottom-start"
              >
                <span>
                  <Switch
                    disabled={!myProfile.myProfile.emailConfirmed}
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
                E-posta Bildirimleri
              </div>
            </div>
            <div className="flex-row" style={{ margin: "10px 0px" }}>
              <FormControl sx={{ width: "110px" }} size="small">
                <Select value={language} onChange={HandleChangeLanguage}>
                  <MenuItem value={"tr"}>Türkçe</MenuItem>
                  <MenuItem value={"en"}>İngilizce</MenuItem>
                </Select>
              </FormControl>
              <div className="user-setting-switch-text">Sistem Dili</div>
            </div>
            <div className="flex-row user-setting-password-button">
              <Button
                variant="outlined"
                size="large"
                startIcon={<LockOutlineIcon />}
                sx={{
                  color: "#000000ff",
                  textTransform: "none",
                  fontWeight: 600,
                }}
                onClick={ChangePasswordDrawerOpen}
              >
                Şifremi Değiştir
              </Button>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default UserSettingDrawer;
