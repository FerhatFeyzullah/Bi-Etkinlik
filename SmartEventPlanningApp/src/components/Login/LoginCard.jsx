import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useEffect, useState } from "react";
import "../../css/Login/LoginCard.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { schema } from "../../schemas/LoginSchema";
import { LoginTheSystem, ReadToken } from "../../redux/slices/authSlice";

function LoginCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((store) => store.auth);
  const { userId, role } = token;

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (userId && role) {
      if (role === "User") {
        navigate("/kullanici/" + userId);
        localStorage.setItem("UserId", userId);
      } else if (role === "Admin") {
        navigate("/admin/" + userId);
        localStorage.setItem("UserId", userId);
      } else {
        console.warn("Bilinmeyen rol:", role);
      }
    }
  }, [userId, role, navigate, dispatch]);

  const submit = async () => {
    try {
      await schema.validate({ userName, password }, { abortEarly: false });
      setErrors({});

      const loginData = {
        UserName: userName,
        Password: password,
      };

      const loginResult = await dispatch(LoginTheSystem(loginData)).unwrap();
      if (loginResult) {
        await dispatch(ReadToken());
      }
    } catch (error) {
      const errObj = {};
      if (error.inner) {
        error.inner.forEach((e) => {
          errObj[e.path] = e.message;
        });
        setErrors(errObj);
      } else {
        setErrors({ general: error.message || "Bir hata oluştu" });
      }
    }
  };
  return (
    <div className="flex-column">
      <div className="login-input">
        <TextField
          error={Boolean(errors.userName)}
          variant="outlined"
          size="medium"
          label="Kullanıcı Adı"
          helperText={errors.userName}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          sx={{ width: "300px" }}
        />
      </div>
      <div className="login-input">
        <TextField
          error={Boolean(errors.password)}
          variant="outlined"
          size="medium"
          label="Şifre"
          helperText={errors.password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ width: "300px" }}
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
      <div>
        <Button
          variant="contained"
          size="medium"
          fullWidth
          sx={{ textTransform: "none", width: "200px" }}
          onClick={submit}
        >
          Giriş Yap
        </Button>
      </div>
    </div>
  );
}
export default LoginCard;
