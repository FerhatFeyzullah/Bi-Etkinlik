import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RegisterCard from "../components/Register/RegisterCard";
import ToastMistake from "../components/Elements/ToastMistake";
import Loading from "../components/Elements/Loading";
import { Button } from "@mui/material";
import "../css/Register/Register.css";

function Register() {
  const navigate = useNavigate();
  const { loginLoading, errorMessage, loginMistakeAlert } = useSelector(
    (store) => store.auth
  );

  return (
    <div className="register-container">
      <div>
        <div className="register-app-header">Bi Etkinlik</div>

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
        <Loading status={loginLoading} />

        <ToastMistake visible={loginMistakeAlert} detail={errorMessage} />
      </div>
    </div>
  );
}

export default Register;
