import React, { useState } from "react";
import "../../css/ForgotPassword/VerifyCodeCard.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { schema } from "../../schemas/FP_VerifyCodeSchema";
import { FaArrowLeft } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import CountdownTimer from "../../hooks/CountDownTimer";
import ToastMistake from "../../components/Elements/ToastMistake";
import {
  DecrementCardCount,
  DecrementStepCount,
  SendResetCodeAgain,
  SetFP_Mistake,
  VerifyCode,
} from "../../redux/slices/forgotPasswordSlice";

function VerifyCodeCard() {
  const { recoveryEmail, fpErrorMessage, fpMistake } = useSelector(
    (store) => store.forgotPassword
  );

  const [code, setCode] = useState("");
  const [errors, setErrors] = useState({});
  const [isExpired, setIsExpired] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Post = async () => {
    try {
      await schema.validate({ code }, { abortEarly: false });
      setErrors({});
      const data = {
        Email: recoveryEmail,
        VerifyCode: code,
      };
      dispatch(VerifyCode(data));
    } catch (error) {
      const errObj = {};
      error.inner.forEach((e) => {
        errObj[e.path] = e.message;
      });
      setErrors(errObj);
    }
  };

  const TurnBack = () => {
    dispatch(DecrementCardCount());
    dispatch(DecrementStepCount());
  };

  const SendAgain = (email) => {
    const data = {
      Email: email,
    };
    dispatch(SendResetCodeAgain(data));
    setResetKey((prev) => prev + 1);
    setIsExpired(false);
  };

  const Closer = () => {
    dispatch(SetFP_Mistake(false));
  };
  return (
    <div>
      <div className="fp-verify-c-main-container flex-column">
        <div className="fp-code-head">
          <div className="flex-row fp-back-button">
            <Tooltip title="Geri">
              <IconButton>
                <FaArrowLeft onClick={TurnBack} />
              </IconButton>
            </Tooltip>
          </div>
          <div className="fp-code-title flex-column">Doğrulama Kodu</div>
        </div>

        <div>
          <p className="fp-code-description">
            Lütfen size gönderilen 6 haneli doğrulama kodunu giriniz. Bu kod
            yalnızca kısa bir süre için geçerlidir. Süre dolmadan işlemi
            tamamlayınız.
          </p>
        </div>

        <div className="fp-input-text">
          <TextField
            error={Boolean(errors.code)}
            helperText={errors.code}
            variant="outlined"
            size="medium"
            label="Doğrulama Kodu"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            fullWidth
            type="number"
          />
        </div>
        <div
          className="fp-timer flex-row"
          style={{
            backgroundColor: !isExpired
              ? "rgb(144, 197, 58)"
              : "rgb(197, 58, 58)",
          }}
        >
          <CountdownTimer
            durationInSeconds={120}
            onFinish={() => setIsExpired(true)}
            key={resetKey}
          />
        </div>
        <div className="fp-input-text">
          <Button
            variant="contained"
            fullWidth
            disabled={isExpired}
            onClick={Post}
          >
            Gönder
          </Button>
        </div>
        <div className="fp-input-link">
          <Button
            onClick={() => SendAgain(recoveryEmail)}
            variant="contained"
            color="inherit"
            size="small"
            disabled={!isExpired}
          >
            Tekrar Kod Al
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

export default VerifyCodeCard;
