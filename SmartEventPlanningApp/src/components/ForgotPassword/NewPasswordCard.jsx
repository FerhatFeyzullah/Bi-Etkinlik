import React, { useState } from "react";
import "../../css/ForgotPassword/NewPassword.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { schema } from "../../schemas/FP_NewPasswordSchema";
import ToastMistake from "../Elements/ToastMistake";

import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  ChangeForgotPassword,
  DecrementCardCount,
  DecrementStepCount,
  SetFP_Mistake,
} from "../../redux/slices/forgotPasswordSlice";

function NewPasswordCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [show, setShow] = useState(false);
  const [confShow, setConfShow] = useState(false);

  const [errors, setErrors] = useState({});
  const { fpErrorMessage, fpMistake, recoveryEmail } = useSelector(
    (store) => store.forgotPassword
  );

  const TurnBack = () => {
    dispatch(DecrementCardCount());
    dispatch(DecrementStepCount());
  };
  const Closer = () => {
    dispatch(SetFP_Mistake(false));
  };

  const Post = async () => {
    try {
      await schema.validate({ password, confirmPass }, { abortEarly: false });
      setErrors({});

      const data = {
        Email: recoveryEmail,
        NewPassword: password,
        ConfirmNewPassword: confirmPass,
      };

      dispatch(ChangeForgotPassword(data));
    } catch (error) {
      const errObj = {};
      error.inner.forEach((e) => {
        errObj[e.path] = e.message;
      });
      setErrors(errObj);
    }
  };
  return (
    <div>
      <div className="np-main-container flex-column">
        <div className="fp-password-head">
          <div className="fp-password-title flex-column">
            Yeni Şifre Belirleme
          </div>
        </div>

        <div>
          <p className="fp-password-description">
            Lütfen hesabınız için yeni bir şifre belirleyin. Şifreniz güçlü ve
            sadece size özel olmalıdır.
          </p>
        </div>

        <div className="fp-input-text">
          <TextField
            error={Boolean(errors.password)}
            variant="outlined"
            size="medium"
            label="Şifre"
            helperText={errors.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            type={show ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShow(!show)} edge="end">
                    {show ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="fp-input-text">
          <TextField
            error={Boolean(errors.confirmPass)}
            variant="outlined"
            size="medium"
            label="Şifre Tekrarı"
            helperText={errors.confirmPass}
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            fullWidth
            type={confShow ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setConfShow(!confShow)} edge="end">
                    {confShow ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="fp-input-text">
          <Button
            variant="contained"
            fullWidth
            onClick={Post}
            size="large"
            color="success"
          >
            Kaydet
          </Button>
        </div>
      </div>

      <ToastMistake
        visible={fpMistake}
        detail={fpErrorMessage}
        closer={Closer}
      />
    </div>
  );
}

export default NewPasswordCard;
