import React, { useEffect, useState } from "react";
import { Button, InputAdornment, IconButton } from "@mui/material";
import { Autocomplete, TextField } from "@mui/material";
import { schema } from "../../schemas/RegisterSchema";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import "../../css/Register/RegisterCard.css";
import { cities } from "../../data/MyData";
import { GetAllCategory } from "../../redux/slices/categorySlice";
import {
  RegisterTheSystem,
  SetRegisterStatusFalse,
} from "../../redux/slices/authSlice";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
<<<<<<< HEAD

function RegisterCard() {
  const dispatch = useDispatch();
=======
import { useNavigate } from "react-router-dom";

function RegisterCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
>>>>>>> 0f5e1de (The error messages in the yup diagram have been translated. An automatic registration and registration deletion service has been prepared according to the change in the status of the event, and some deficiencies in the project have been completed.)
  const { allCategory } = useSelector((store) => store.category);
  const { registerStatus } = useSelector((store) => store.auth);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [gender, setGender] = useState("");
  const [areas, setAreas] = useState([]);
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConfPass, setShowConfPass] = useState(false);

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const formattedBirthDate = dayjs(birthDate).format("YYYY-MM-DD");

  const toggleEvent = (eventId) => {
    setAreas((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };
  const FormClear = () => {
    setFirstName("");
    setLastName("");
    setUserName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setCity("");
    setBirthDate(null);
    setGender("");
    setAreas([]);
  };

  useEffect(() => {
    dispatch(GetAllCategory());
  }, []);
  useEffect(() => {
    if (registerStatus) {
      FormClear();
      dispatch(SetRegisterStatusFalse());
<<<<<<< HEAD
=======
      navigate("/girisyap");
>>>>>>> 0f5e1de (The error messages in the yup diagram have been translated. An automatic registration and registration deletion service has been prepared according to the change in the status of the event, and some deficiencies in the project have been completed.)
    }
  }, [registerStatus]);

  const submit = async () => {
    try {
      await schema.validate(
        {
          firstName,
          lastName,
          userName,
          email,
          password,
          confirmPassword,
          city,
          birthDate,
          gender,
          areas,
        },
        { abortEarly: false }
      );
      setErrors({});
      const data = {
        RegisterDto: {
          FirstName: firstName,
          LastName: lastName,
          UserName: userName,
          Email: email,
          Password: password,
          ConfirmPassword: confirmPassword,
          City: city,
          BirthDate: formattedBirthDate,
          Gender: gender,
        },
        AreasOfInterest: areas,
      };

      dispatch(RegisterTheSystem(data));
    } catch (error) {
      const errObj = {};
      error.inner.forEach((e) => {
        errObj[e.path] = e.message;
      });
      setErrors(errObj);
    }
  };

  return (
    <div className="flex-column">
      <div className="register-inputs-container">
        <div className="register-input">
          <TextField
            error={Boolean(errors.firstName)}
            variant="outlined"
            size="small"
            label="İsim"
            helperText={errors.firstName}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            sx={{ width: "300px" }}
          />
        </div>
        <div className="register-input">
          <TextField
            error={Boolean(errors.lastName)}
            variant="outlined"
            size="small"
            label="Soyisim"
            helperText={errors.lastName}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            sx={{ width: "300px" }}
          />
        </div>
        <div className="register-input">
          <TextField
            error={Boolean(errors.userName)}
            variant="outlined"
            size="small"
            label="Kullanıcı Adı"
            helperText={errors.userName}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            sx={{ width: "300px" }}
          />
        </div>
        <div className="register-input">
          <TextField
            error={Boolean(errors.email)}
            variant="outlined"
            size="small"
            label="E-posta"
            helperText={errors.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ width: "300px" }}
          />
        </div>
        <div className="register-input">
          <TextField
            error={Boolean(errors.password)}
            variant="outlined"
            size="small"
            label="Şifre"
            helperText={errors.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ width: "300px" }}
            type={showPass ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPass(!showPass)} edge="end">
                    {showPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="register-input">
          <TextField
            error={Boolean(errors.confirmPassword)}
            variant="outlined"
            size="small"
            label="Şifre Tekrarı"
            helperText={errors.confirmPassword}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ width: "300px" }}
            type={showConfPass ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfPass(!showConfPass)}
                    edge="end"
                  >
                    {showConfPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="register-input">
          <Autocomplete
            options={cities}
            getOptionLabel={(option) => option}
            value={city}
            onChange={(event, newValue) => setCity(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Şehir"
                variant="outlined"
                size="small"
                sx={{ width: "300px" }}
                error={Boolean(errors.city)}
                helperText={errors.city}
              />
            )}
            disablePortal
            fullWidth
          />
        </div>
        <div className="register-date-gender" style={{ marginBottom: "7px" }}>
          <div style={{ marginBottom: "7px" }}>
<<<<<<< HEAD
            <LocalizationProvider dateAdapter={AdapterDayjs}>
=======
            <LocalizationProvider dateAdapter={AdapterDayjs}
              adapterLocale="tr"
            >
>>>>>>> 0f5e1de (The error messages in the yup diagram have been translated. An automatic registration and registration deletion service has been prepared according to the change in the status of the event, and some deficiencies in the project have been completed.)
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Doğum Tarihi"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e)}
                  sx={{ width: "300px" }}
                  slotProps={{
                    textField: {
                      error: !!errors.birthDate,
                      helperText: errors.birthDate || "",
                      variant: "outlined",
                      fullWidth: true,
                      size: "small",
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div>
            <FormControl error={!!errors.gender}>
              <FormLabel>Cinsiyet</FormLabel>
              <RadioGroup value={gender} onChange={(e) => handleChange(e)} row>
                <FormControlLabel
                  value={"Erkek"}
                  control={<Radio />}
                  label="Erkek"
                />
                <FormControlLabel
                  value={"Kadın"}
                  control={<Radio />}
                  label="Kadın"
                />
              </RadioGroup>
              {errors.gender && (
                <p style={{ color: "rgba(153, 20, 20, 1)", fontSize: "14px" }}>
                  {errors.gender}
                </p>
              )}
            </FormControl>
          </div>
        </div>
      </div>

      <br />
      <div className="register-category-title">İlgi Alanları</div>
      {errors.areas && (
        <div className="register-category-error-text">{errors.areas}</div>
      )}

      <div className="register-areas-container">
        {allCategory &&
          allCategory.map((c) => {
            const isSelected = areas.includes(c.categoryId);

            return (
              <div
                className="register-category-card"
                key={c.categoryId}
                onClick={() => toggleEvent(c.categoryId)}
                style={{
                  border: isSelected ? "3px solid #55af2bff" : "1px solid #ccc",
                  boxShadow: isSelected
                    ? "0px 0px 10px 3px rgba(70, 189, 59, 1)"
                    : "0px 0px 10px 3px rgba(100, 146, 187, 1)",
                  backgroundColor: "white",
                  transition: "all 0.2s ease-in-out",
                }}
              >
                {c.categoryName}
              </div>
            );
          })}
      </div>
      <div>
        <Button
          variant="contained"
          fullWidth
          sx={{ width: "300px", marginTop: "20px" }}
          onClick={submit}
        >
          Kaydol
        </Button>
      </div>
    </div>
  );
}

export default RegisterCard;
