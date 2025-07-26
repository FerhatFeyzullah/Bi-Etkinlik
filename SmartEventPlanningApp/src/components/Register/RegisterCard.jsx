import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
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
import { useDispatch } from "react-redux";
import "../../css/Register/RegisterCard.css";
import { cities, categories } from "../../data/MyData";
//import { Autocomplete } from "@mui/lab";

function RegisterCard() {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [gender, setGender] = useState(null);
  const [areas, setAreas] = useState([]);
  const [errors, setErrors] = useState({});

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
      console.log(data);
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
      <div className="register-app-header">Bi Etkinlik</div>
      <div className="register-input">
        <TextField
          error={Boolean(errors.firstName)}
          variant="filled"
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
          variant="filled"
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
          variant="filled"
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
          variant="filled"
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
          variant="filled"
          size="small"
          label="Şifre"
          helperText={errors.password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ width: "300px" }}
        />
      </div>
      <div className="register-input">
        <TextField
          error={Boolean(errors.confirmPassword)}
          variant="filled"
          size="small"
          label="Şifre Tekrarı"
          helperText={errors.confirmPassword}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ width: "300px" }}
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
              variant="filled"
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                    variant: "filled",
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
      <br />
      <div className="register-category-title">İlgi Alanları</div>
      {errors.areas && (
        <div className="register-category-error-text">{errors.areas}</div>
      )}

      <div className="register-areas-container">
        {categories.map((event) => {
          const isSelected = areas.includes(event.id);

          return (
            <div
              className="register-category-card"
              key={event.id}
              onClick={() => toggleEvent(event.id)}
              style={{
                border: isSelected ? "3px solid #419b17ff" : "1px solid #ccc",
                backgroundColor: "#f9f9f9",
                transition: "all 0.2s ease-in-out",
              }}
            >
              {event.name}
            </div>
          );
        })}
      </div>
      <div>
        <Button
          variant="contained"
          fullWidth
          sx={{ width: "300px" }}
          onClick={submit}
        >
          Kaydol
        </Button>
      </div>
    </div>
  );
}

export default RegisterCard;
