import React from "react";
import LoginCard from "../components/Login/LoginCard";
import "../css/Login/Login.css";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ToastMistake from "../components/Elements/ToastMistake";
import Loading from "../components/Elements/Loading";
import { useNavigate } from "react-router-dom";
import { SetLoginMistakeAlert } from "../redux/slices/authSlice";

function Login() {
  const navigate = useNavigate();
  const { loginLoading, errorMessage, loginMistakeAlert } = useSelector(
    (store) => store.auth
  );

  const dispatch = useDispatch();

  const LoginToastMistakeClose = () => {
    dispatch(SetLoginMistakeAlert());
  };

  return (
    <div className="login-container">
      <div>
        <div className="app-header">Etkinlik</div>

        <div className="login-card-container">
          <LoginCard />
        </div>

        <div className="login-button">
          <Button sx={{ textTransform: "none" }}>Şifreni mi unuttun ?</Button>
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
      </div>
    </div>
  );
}

export default Login;
