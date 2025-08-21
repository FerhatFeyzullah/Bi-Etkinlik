import React, { useEffect } from "react";
import LoginCard from "../components/Login/LoginCard";
import "../css/Login/Login.css";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ToastMistake from "../components/Elements/ToastMistake";
import ToastSuccess from "../components/Elements/ToastSuccess";
import Loading from "../components/Elements/Loading";
import { useNavigate } from "react-router-dom";
import { SetLoginMistakeAlert, SetRegisterSuccessAlert } from "../redux/slices/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loginLoading, errorMessage, loginMistakeAlert, registerResponse,
    registerSuccessAlert, } = useSelector(
      (store) => store.auth
    );

  const LoginToastMistakeClose = () => {
    dispatch(SetLoginMistakeAlert());
  };
  const registerToastSuccessClose = () => {
    dispatch(SetRegisterSuccessAlert());
  };

  return (
    <div className="login-container login-background">
      <div>
        <div className="app-header">Bi Etkinlik</div>

        <div className="login-card-container">
          <LoginCard />
        </div>

        <div className="login-button">
          <Button
            sx={{ textTransform: "none" }}
            onClick={() => navigate("/sifremiunuttum")}
          >
            Şifreni mi unuttun ?
          </Button>
        </div>
        <div className="login-button">
          Hesabın yok mu ?
          <Button
            sx={{ textTransform: "none" }}
            onClick={() => navigate("/kaydol")}
          >
            Kaydol
          </Button>
        </div>
      </div>
      <div>
        <Loading status={loginLoading} />

        <ToastMistake
          visible={loginMistakeAlert}
          detail={errorMessage}
          closer={LoginToastMistakeClose}
        />

        <ToastSuccess
          visible={registerSuccessAlert}
          detail={registerResponse}
          closer={registerToastSuccessClose}
        />
      </div >
    </div >
  );
}

export default Login;
