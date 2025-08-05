import React, { useState } from "react";
import "../../css/ForgotPassword/EmailCard.css";
import { schema } from "../../schemas/FP_EmailSchema";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import ToastMistake from "../Elements/ToastMistake";
import {
  SendResetCode,
  SetFP_Mistake,
  SetRecoveryEmail,
} from "../../redux/slices/forgotPasswordSlice";

function EmailCard() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const { fpErrorMessage, fpMistake } = useSelector(
    (store) => store.forgotPassword
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Closer = () => {
    dispatch(SetFP_Mistake(false));
  };

  const Post = async () => {
    try {
      await schema.validate({ email }, { abortEarly: false });
      setErrors({});

      const data = {
        Email: email,
      };

      dispatch(SetRecoveryEmail(email));
      dispatch(SendResetCode(data));
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
      <div className="fp-email-card-main-container flex-column">
        <div className="fp-email-head">
          <div className="flex-row fp-back-button">
            <Tooltip title="Geri">
              <IconButton>
                <FaArrowLeft onClick={() => navigate("/girisyap")} />
              </IconButton>
            </Tooltip>
          </div>
          <div className="fp-email-title flex-column">Email Girişi</div>
        </div>

        <div>
          <p className="fp-email-description">
            Sisteme kayıt olurken kullandığınız e-posta adresini giriniz. Girmiş
            olduğunuz adres sistemde kayıtlıysa, ilgili adrese tek kullanımlık
            bir doğrulama kodu gönderilecektir.
          </p>
        </div>
        <div className="fp-input-text">
          <TextField
            error={Boolean(errors.email)}
            helperText={errors.email}
            variant="outlined"
            size="medium"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
        </div>
        <div className="fp-input-text">
          <Button variant="contained" fullWidth onClick={Post}>
            Gönder
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

export default EmailCard;
