import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RegisterCard from "../components/Register/RegisterCard";
import ToastMistake from "../components/Elements/ToastMistake";
import ToastSuccess from "../components/Elements/ToastSuccess";
import Loading from "../components/Elements/Loading";
import { Button } from "@mui/material";
import "../css/Register/Register.css";
import {
  SetRegisterMistakeAlert,
  SetRegisterSuccessAlert,
} from "../redux/slices/authSlice";

function Register() {
  const navigate = useNavigate();
  const {
    registerLoading,
    registerResponse,
    registerMistakeAlert,
    registerSuccessAlert,
  } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const registerToastMistakeClose = () => {
    dispatch(SetRegisterMistakeAlert());
  };
  const registerToastSuccessClose = () => {
    dispatch(SetRegisterSuccessAlert());
  };

  return (
    <div className="register-container">
      <div>
        <div className="register-app-header">Etkinlik</div>
        <div className="register-description">
          Zamanını Değerlendir, Bi Etkinlik Seç.
        </div>

        <div className="register-card-container">
          <RegisterCard />
        </div>

        <div className="register-button">
          Zaten hesabın var mı ?
          <Button
            sx={{ textTransform: "none" }}
            onClick={() => navigate("/girisyap")}
          >
            Giriş Yap
          </Button>
        </div>
      </div>
      <div>
        <Loading status={registerLoading} />

        <ToastMistake
          visible={registerMistakeAlert}
          detail={registerResponse}
          closer={registerToastMistakeClose}
        />
        <ToastSuccess
          visible={registerSuccessAlert}
          detail={registerResponse}
          closer={registerToastSuccessClose}
        />
      </div>
    </div>
  );
}

export default Register;
