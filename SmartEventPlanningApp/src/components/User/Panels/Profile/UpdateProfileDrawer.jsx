import React, { useEffect, useState } from "react";
import { Button, Drawer, TextField, Autocomplete } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "../../../../css/User/Panels/Profile/UpdateProfileDrawer.css";
import {
  SetUpdatedProfile,
  SetUpdateProfileDrawer,
  UpdateProfile,
} from "../../../../redux/slices/accountSlice";
import { cities } from "../../../../data/MyData";
import { updateProfileSchema } from "../../../../schemas/UpdateProfileSchema";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import CategoryFilterSkeleton from "../../../Skeletons/CategoryFilterSkeleton";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useTranslation } from "react-i18next";

dayjs.locale("tr");

function UpdateProfileDrawer() {
  const { t: tButton } = useTranslation("button");
  const { t: tText } = useTranslation("text");
  const { t: tInput } = useTranslation("input");
  const { t: tValidation } = useTranslation("validation");

  const schema = updateProfileSchema(tValidation);

  const dispatch = useDispatch();
  const { updateProfileDrawer, updatedProfile } = useSelector(
    (store) => store.account
  );

  const { language } =
    useSelector((store) => store.userSetting);

  const { allCategory, cetegoryFilterSkeletonLoaing } = useSelector(
    (store) => store.category
  );

  const UserId = localStorage.getItem("UserId");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [birthDate, setBirthDate] = useState(dayjs(null));
  const [gender, setGender] = useState("");
  const [areas, setAreas] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (updateProfileDrawer) {
      setFirstName(updatedProfile.firstName);
      setLastName(updatedProfile.lastName);
      setCity(updatedProfile.city);
      setBirthDate(dayjs(updatedProfile.birthDate));
      setGender(updatedProfile.gender);
      setAreas(
        updatedProfile.appUserCategories?.map((e) => e.category.categoryId)
      );
      setErrors({});
    }
  }, [updateProfileDrawer]);

  const Close = () => {
    dispatch(SetUpdateProfileDrawer(false));
    dispatch(SetUpdatedProfile({}));
  };

  const genderChange = (event) => {
    setGender(event.target.value);
  };

  const Update = async () => {
    try {
      await schema.validate(
        {
          firstName,
          lastName,
          city,
          birthDate,
          gender,
          areas,
        },
        { abortEarly: false }
      );
      setErrors({});

      const data = {
        UserInfo: {
          AppUserId: UserId,
          FirstName: firstName,
          LastName: lastName,
          City: city,
          BirthDate: birthDate.format("YYYY-MM-DD"),
          gender: gender,
        },
        NewAreas: areas,
      };

      console.log(data);
      await dispatch(UpdateProfile(data));
    } catch (error) {
      const errObj = {};
      error.inner.forEach((e) => {
        errObj[e.path] = e.message;
      });
      setErrors(errObj);
    }
  };
  return (
    <>
      <Drawer
        open={updateProfileDrawer}
        onClose={Close}
        anchor="right"
        PaperProps={{
          sx: {
            position: "absolute", // ✅ artık fixed değil
            top: "80px", // ✅ istediğin kadar aşağı al
            height: "auto", // ✅ yükseklik belirle
            borderRadius: "10px",
            marginRight: "10px",
            width: "400px",
            backgroundColor: "whitesmoke",
          },
        }}
      >
        <div className="update-profile-drawer-container flex-column-justify-start">
          <h3>{tText("profileInfo")}</h3>
          <div className="update-profile-drawer-inputs">
            <TextField
              label={tInput("name")}
              sx={{ width: "250px" }}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName}
            />
          </div>
          <div className="update-profile-drawer-inputs">
            <TextField
              label={tInput("surname")}
              sx={{ width: "250px" }}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
            />
          </div>
          <div className="update-profile-drawer-inputs">
            <Autocomplete
              options={cities}
              getOptionLabel={(option) => option}
              value={city}
              onChange={(event, newValue) => setCity(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={tInput("city")}
                  variant="outlined"
                  size="medium"
                  sx={{ width: "250px" }}
                  error={Boolean(errors.city)}
                  helperText={errors.city}
                />
              )}
              disablePortal
              fullWidth
              slotProps={{
                paper: {
                  sx: {
                    maxHeight: 300,
                    overflow: "hidden",
                    "& ul": {
                      maxHeight: 300,
                      overflowY: "auto",
                    },
                  },
                },
              }}
            />
          </div>
          <div className="update-profile-drawer-inputs">
            {cetegoryFilterSkeletonLoaing ? (
              <CategoryFilterSkeleton />
            ) : (
              <Autocomplete
                options={allCategory}
                multiple
                limitTags={1}
                getOptionLabel={(option) => option.categoryName}
                value={allCategory.filter((cat) =>
                  areas.includes(cat.categoryId)
                )}
                onChange={(event, newValue) =>
                  setAreas(newValue.map((item) => item.categoryId))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={tInput("category")}
                    variant="outlined"
                    size="medium"
                    sx={{ width: "250px" }}
                    error={Boolean(errors.areas)}
                    helperText={errors.areas}
                  />
                )}
                disablePortal
                fullWidth
                sx={{
                  "& .MuiAutocomplete-inputRoot": {
                    maxHeight: "60px", // 👈 Yükseklik sabitlendi
                    overflow: "hidden", // 👈 Taşanı gizle
                  },
                  "& .MuiAutocomplete-tag": {
                    maxWidth: "100%",
                    margin: "2px",
                  },
                }}
                slotProps={{
                  paper: {
                    sx: {
                      maxHeight: 220,
                      overflow: "hidden",
                      "& ul": {
                        maxHeight: 220,
                        overflowY: "auto",
                      },
                    },
                  },
                }}
              />
            )}
          </div>
          <div className="update-profile-drawer-inputs">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={language}>

              <Box sx={{ width: "250px" }}>
                <DatePicker
                  label={tInput("birthDate")}
                  value={birthDate}
                  onChange={(date) => setBirthDate(date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: Boolean(errors?.birthDate),
                      helperText: errors?.birthDate,
                    },
                  }}
                />
              </Box>
            </LocalizationProvider>
          </div>
          <div className="update-profile-drawer-inputs">
            <FormControl error={!!errors.gender}>
              <FormLabel>{tInput("gender")}</FormLabel>
              <RadioGroup value={gender} onChange={(e) => genderChange(e)} row>
                <FormControlLabel
                  value={"Erkek"}
                  control={<Radio />}
                  label={tInput("male")}
                />
                <FormControlLabel
                  value={"Kadın"}
                  control={<Radio />}
                  label={tInput("female")}
                />
              </RadioGroup>
              {errors.gender && (
                <p style={{ color: "rgba(153, 20, 20, 1)", fontSize: "14px" }}>
                  {errors.gender}
                </p>
              )}
            </FormControl>
          </div>
          <div className="update-profile-drawer-inputs">
            <Button variant="contained" color="success" onClick={Update}>
              {tButton("update")}
            </Button>
          </div>
        </div >
      </Drawer >
    </>
  );
}

export default UpdateProfileDrawer;
