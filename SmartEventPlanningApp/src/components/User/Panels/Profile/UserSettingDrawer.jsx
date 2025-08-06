import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SetUserSettingDrawer,
  SetChangePasswordDrawer,
} from "../../../../redux/slices/userSettingSlice";
import { Drawer } from "@mui/material";
import "../../../../css/User/Panels/Profile/UserSettingDrawer.css";
import Switch from "react-switch";
import { Button } from "@mui/material";
import LockOutlineIcon from "@mui/icons-material/LockOutline";

function UserSettingDrawer() {
  const dispatch = useDispatch();
  const { userSettingDrawer } = useSelector((store) => store.userSetting);

  const [boxReview, setBoxReview] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [mailPermission, setMailPermission] = useState(true);

  const Close = () => {
    dispatch(SetUserSettingDrawer(false));
  };

  const ChangePasswordDrawerOpen = () => {
    dispatch(SetUserSettingDrawer(false));
    dispatch(SetChangePasswordDrawer(true));
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
                onChange={setBoxReview}
                checked={boxReview}
                width={100}
                height={36}
                handleDiameter={28}
                offColor="#ccc"
                onColor="#4caf50"
                uncheckedIcon={false}
                checkedIcon={false}
              />
              <div className="user-setting-switch-text">Kart Görünümü</div>
            </div>
            <div className="flex-row" style={{ margin: "10px 0px" }}>
              <Switch
                onChange={setDarkMode}
                checked={darkMode}
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
              <Switch
                onChange={setMailPermission}
                checked={mailPermission}
                width={100}
                height={36}
                handleDiameter={28}
                offColor="#ccc"
                onColor="#4caf50"
                uncheckedIcon={false}
                checkedIcon={false}
              />
              <div className="user-setting-switch-text">Mail Onayı</div>
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
