import React from "react";
import "../../css/ForgotPassword/SuccessCard.css";
import png from "../../assets/eventImage/done.png";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function SuccessCard() {
  const navigate = useNavigate();

  return (
    <>
      <div className="success-card-main-container flex-column">
        <img src={png} className="success-card-img" />
        <div className="success-card-text">Şifreniz Başarıyla Değiştirildi</div>
        <div>
          <Button
            variant="outlined"
            sx={{ textTransform: "none" }}
            size="large"
            onClick={() => navigate("/girisyap")}
          >
            GİRİŞ YAP
          </Button>
        </div>
      </div>
    </>
  );
}

export default SuccessCard;
