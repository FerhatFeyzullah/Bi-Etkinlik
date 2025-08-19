import React, { useEffect } from "react";
import LoginCard from "../components/Login/LoginCard";
import "../css/Login/Login.css";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ToastMistake from "../components/Elements/ToastMistake";
<<<<<<< HEAD
import Loading from "../components/Elements/Loading";
import { useNavigate } from "react-router-dom";
import { SetLoginMistakeAlert } from "../redux/slices/authSlice";

function Login() {
  const navigate = useNavigate();
  const { loginLoading, errorMessage, loginMistakeAlert } = useSelector(
    (store) => store.auth
  );
=======
import ToastSuccess from "../components/Elements/ToastSuccess";
import Loading from "../components/Elements/Loading";
import { useNavigate } from "react-router-dom";
import { SetLoginMistakeAlert, SetRegisterSuccessAlert } from "../redux/slices/authSlice";

function Login() {
  const navigate = useNavigate();
  const { loginLoading, errorMessage, loginMistakeAlert, registerResponse,
    registerSuccessAlert, } = useSelector(
      (store) => store.auth
    );
>>>>>>> 0f5e1de (The error messages in the yup diagram have been translated. An automatic registration and registration deletion service has been prepared according to the change in the status of the event, and some deficiencies in the project have been completed.)

  const dispatch = useDispatch();

  const LoginToastMistakeClose = () => {
    dispatch(SetLoginMistakeAlert());
  };
<<<<<<< HEAD
=======
  const registerToastSuccessClose = () => {
    dispatch(SetRegisterSuccessAlert());
  };
>>>>>>> 0f5e1de (The error messages in the yup diagram have been translated. An automatic registration and registration deletion service has been prepared according to the change in the status of the event, and some deficiencies in the project have been completed.)

  return (
    <div className="login-container">
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
<<<<<<< HEAD
=======

        <ToastSuccess
          visible={registerSuccessAlert}
          detail={registerResponse}
          closer={registerToastSuccessClose}
        />
>>>>>>> 0f5e1de (The error messages in the yup diagram have been translated. An automatic registration and registration deletion service has been prepared according to the change in the status of the event, and some deficiencies in the project have been completed.)
      </div>
    </div>
  );
}

export default Login;
