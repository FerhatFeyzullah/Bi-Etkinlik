import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChangePassword,
  SetChangePasswordDrawer,
} from "../../../../redux/slices/userSettingSlice";
import { Drawer } from "@mui/material";
import { Button, InputAdornment, IconButton } from "@mui/material";
import { changePasswordSchema } from "../../../../schemas/ChangePasswordSchema";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useTranslation } from "react-i18next";

function ChangePasswordDrawer() {
  const { t: tButton } = useTranslation("button");
  const { t: tText } = useTranslation("text");
  const { t: tInput } = useTranslation("input");
  const { t: tValidation } = useTranslation("validation");

  const schema = changePasswordSchema(tValidation);

  const dispatch = useDispatch();
  const { changePasswordDrawer, changePassSuccess } = useSelector(
    (store) => store.userSetting
  );

  useEffect(() => {
    if (changePassSuccess) {
      FormClear();
    }
  }, [changePassSuccess]);

  const UserId = localStorage.getItem("UserId");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConfPass, setShowConfPass] = useState(false);

  const Close = () => {
    dispatch(SetChangePasswordDrawer(false));
    FormClear();
  };

  const FormClear = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPass("");
    setErrors({});
  };

  const Change = async () => {
    try {
      await schema.validate(
        {
          oldPassword,
          newPassword,
          confirmPass,
        },
        { abortEarly: false }
      );
      setErrors({});

      const data = {
        AppUserId: UserId,
        OldPassword: oldPassword,
        NewPassword: newPassword,
        ConfirmPassword: confirmPass,
      };

      console.log(data);
      await dispatch(ChangePassword(data));
    } catch (error) {
      const errObj = {};
      error.inner.forEach((e) => {
        errObj[e.path] = e.message;
      });
      setErrors(errObj);
    }
  };
  return (
    <>
      <Drawer
        open={changePasswordDrawer}
        onClose={Close}
        anchor="right"
        PaperProps={{
          sx: {
            top: "150px", // ✅ istediğin kadar aşağı al
            height: "auto", // ✅ yükseklik belirle
            borderRadius: "20px",
            marginRight: "10px",
            width: "400px",
            backgroundColor: "whitesmoke",
          },
        }}
      >
        <div className="flex-column-justify-start">
          <h3>{tText("passwordChange")}</h3>

          <TextField
            label={tInput("oldPassword")}
            error={Boolean(errors.oldPassword)}
            helperText={errors.oldPassword}
            sx={{ margin: "10px 0px", width: "225px" }}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />

          <TextField
            label={tInput("newPassword")}
            error={Boolean(errors.newPassword)}
            helperText={errors.newPassword}
            sx={{ margin: "10px 0px", width: "225px" }}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type={showPass ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPass(!showPass)} edge="end">
                    {showPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label={tInput("newPasswordRepeat")}
            error={Boolean(errors.confirmPass)}
            helperText={errors.confirmPass}
            sx={{ margin: "10px 0px", width: "225px" }}
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            type={showConfPass ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfPass(!showConfPass)}
                    edge="end"
                  >
                    {showConfPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="outlined"
            size="large"
            sx={{ textTransform: "none", width: "150px", margin: "20px 0px" }}
            onClick={Change}
          >
            {tButton("change")}
          </Button>
        </div>
      </Drawer>
    </>
  );
}

export default ChangePasswordDrawer;
