import React, { useEffect, useState } from "react";
import "../../../../css/User/Panels/CreateEventPanel/CreateAndEditPanel.css";
import CreateEventMapPanel from "../CreateEvent/CreateEventMapPanel";
import { createEventSchema } from "../../../../schemas/CreateEventSchema";
import { updateEventSchema } from "../../../../schemas/UpdateEventSchema";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { IconButton, TextField, Autocomplete } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { cities } from "../../../../data/MyData";
import { useDispatch, useSelector } from "react-redux";
import CategoryFilterSkeleton from "../../../Skeletons/CategoryFilterSkeleton";
import {
  CreateEvent,
  SetCreateAndEditM_AlertFalse,
  SetCreateAndEditS_AlertFalse,
  SetGaveUpUpdating,
  SetIsUpdateMode,
  UpdateEvent,
} from "../../../../redux/slices/eventSlice";
import "react-datepicker/dist/react-datepicker.css";
import ToastSuccess from "../../../Elements/ToastSuccess";
import ToastMistake from "../../../Elements/ToastMistake";
import BiEtkinlik from "../../../../assets/eventImage/BiEtkinlik.png";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
dayjs.locale("tr");
import { useTranslation } from "react-i18next";
import DeleteEventDialog from "./DeleteEventDialog";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function CreateAndEditPanel() {
  const { t: tButton } = useTranslation("button");
  const { t: tInput } = useTranslation("input");
  const { t: tValidation } = useTranslation("validation");
  const { t: tCategory } = useTranslation("category");
  const { t: tAlert } = useTranslation("alert");


  const createSchema = createEventSchema(tValidation)
  const updateSchema = updateEventSchema(tValidation)

  const dispatch = useDispatch();
  const { allCategory, cetegoryFilterSkeletonLoaing } = useSelector(
    (store) => store.category
  );

  const { language } =
    useSelector((store) => store.userSetting);
  const {
    createAndEditS_Alert,
    createAndEditM_Alert,
    createAndEditResponse,
    updateEventProp,
    isUpdateMode,
  } = useSelector((store) => store.event);

  useEffect(() => {
    if (isUpdateMode) {
      setEventName(updateEventProp.name);
      setDescription(updateEventProp.description);
      setSelectedCity(updateEventProp.city);
      setSelectedCategories(
        updateEventProp.eventCategories.map((e) => e.category.categoryId)
      );
      setStartDate(dayjs(updateEventProp.startDate));
      setEndDate(dayjs(updateEventProp.endDate));
      setEventId(updateEventProp.eventId);
      setUpdatingImageId(updateEventProp.eventImageId);
      setUpdating(true);
      dispatch(SetIsUpdateMode(false));
    }
    setErrors({});
  }, [isUpdateMode]);

  const { latitude, longitude } = useSelector((store) => store.event);

  const [previewUrl, setPreviewUrl] = useState(null);

  const UserId = localStorage.getItem("UserId");
  const [image, setImage] = useState(null);
  const [eventName, setEventName] = useState("");
  const [eventId, setEventId] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [updatingImageId, setUpdatingImageId] = useState("");
  const [errors, setErrors] = useState({});
  const [imgError, setImgError] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      // Sadece resim dosyalarını kabul et
      if (!selectedFile.type.startsWith("image/")) {
        alert("Sadece resim dosyası yükleyebilirsin.");
        return;
      }

      // Dosyayı state'e ata
      setImage(selectedFile);

      // Dosyanın önizlemesi için FileReader kullan
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result); // Base64 URL'i state'e yaz
      };
      reader.readAsDataURL(selectedFile); // Dosyayı oku
    }
  };
  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const ClearAll = () => {
    setEventName("");
    setDescription("");
    setSelectedCity("");
    setSelectedCategories([]);
    setStartDate(null);
    setEndDate(null);
    setImage(null);
    setPreviewUrl(null);
    setUpdating(false);
    dispatch(SetGaveUpUpdating(1));
    setErrors({});
  };
  useEffect(() => {
    if (createAndEditS_Alert) {
      ClearAll();
    }
  }, [createAndEditS_Alert]);

  const CreateAndEditToastMistakeClose = () => {
    dispatch(SetCreateAndEditM_AlertFalse());
  };
  const CreateAndEditToastSuccessClose = () => {
    dispatch(SetCreateAndEditS_AlertFalse());
  };

  const Create = async () => {
    try {
      await createSchema.validate(
        {
          eventName,
          description,
          selectedCity,
          selectedCategories,
          startDate,
          endDate,
          image,
          latitude,
        },
        { abortEarly: false }
      );
      setErrors({});
      const data = new FormData();
      const dto = {
        Name: eventName,
        Description: description,
        StartDate: startDate.format("YYYY-MM-DDTHH:mm:ss"),
        EndDate: endDate.format("YYYY-MM-DDTHH:mm:ss"),
        City: selectedCity,
        Latitude: Number(latitude.toFixed(6)),
        Longitude: Number(longitude.toFixed(6)),
        AppUserId: UserId,
      };
      data.append("EventDto", JSON.stringify(dto));
      data.append("EventImage", image);
      data.append("EventCategories", JSON.stringify(selectedCategories));

      await dispatch(CreateEvent(data));
    } catch (error) {
      const errObj = {};
      error.inner.forEach((e) => {
        errObj[e.path] = e.message;
      });
      setErrors(errObj);
    }
  };
  const Update = async () => {
    try {
      await updateSchema.validate(
        {
          eventName,
          description,
          selectedCity,
          selectedCategories,
          startDate,
          endDate,
          latitude,
        },
        { abortEarly: false }
      );
      setErrors({});

      const data = {
        EventDto: {
          EventId: eventId,
          Name: eventName,
          Description: description,
          StartDate: dayjs(startDate).format("YYYY-MM-DDTHH:mm:ss"),
          EndDate: dayjs(endDate).format("YYYY-MM-DDTHH:mm:ss"),
          City: selectedCity,
          Latitude: Number(latitude.toFixed(6)),
          Longitude: Number(longitude.toFixed(6)),
        },
        AppUserId: UserId,
        EventCategories: selectedCategories,
      };

      console.log(data);
      await dispatch(UpdateEvent(data));
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
      <ToastSuccess
        visible={createAndEditS_Alert}
        detail={tAlert(createAndEditResponse)}
        closer={CreateAndEditToastSuccessClose}
      />
      <ToastMistake
        visible={createAndEditM_Alert}
        detail={tAlert(createAndEditResponse)}
        closer={CreateAndEditToastMistakeClose}
      />

      <div className="create-edit-panel-container flex-row-justify-space-around">
        <div className="create-edit-form-main flex-row-justify-space-around">
          <div className="flex-column">
            <div className="create-edit-form-img flex-column">
              {updating ? (
                <img
                  src={
                    !imgError && updatingImageId != ""
                      ? `http://localhost:7126/api/Users/ProfileImage/${updatingImageId}`
                      : BiEtkinlik
                  }
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                  onError={() => setImgError(true)}
                  alt="Resim"
                />
              ) : !image ? (
                <div className="flex-column">
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    sx={{ textTransform: "none" }}
                  >
                    {tButton("uploadImage")}
                    <VisuallyHiddenInput
                      type="file"
                      onChange={handleFileChange}
                      multiple
                    />
                  </Button>
                  <p style={{ color: "red" }}>{errors.image}</p>
                </div>
              ) : (
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <img
                    src={previewUrl}
                    alt="Önizleme"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                  <IconButton
                    onClick={handleRemoveImage}
                    sx={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      backgroundColor: "rgba(0,0,0,0.6)",
                      color: "white",
                      padding: "5px",
                      borderRadius: "50%",
                      zIndex: 1,
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </div>
              )}
            </div>
            <TextField
              error={Boolean(errors.description)}
              helperText={errors.description}
              label={tInput("eventDescription")}
              multiline
              rows={7}
              sx={{ width: "300px" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex-column">
            <div className="create-edit-form-inputs">
              <TextField
                label={tInput("eventName")}
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                error={Boolean(errors.eventName)}
                helperText={errors.eventName}
                sx={{ width: "250px" }}
              />
            </div>
            <div className="create-edit-form-inputs">
              <Autocomplete
                options={cities}
                getOptionLabel={(option) => option}
                value={selectedCity}
                onChange={(event, newValue) => setSelectedCity(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={tInput("city")}
                    variant="outlined"
                    size="medium"
                    sx={{ width: "250px" }}
                    error={Boolean(errors.selectedCity)}
                    helperText={errors.selectedCity}
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
            <div className="create-edit-form-inputs">
              {cetegoryFilterSkeletonLoaing ? (
                <CategoryFilterSkeleton />
              ) : (
                <Autocomplete
                  options={allCategory}
                  multiple
                  limitTags={1}
                  getOptionLabel={(option) => tCategory(option.categoryName)}
                  value={allCategory.filter((cat) =>
                    selectedCategories.includes(cat.categoryId)
                  )}
                  onChange={(event, newValue) =>
                    setSelectedCategories(
                      newValue.map((item) => item.categoryId)
                    )
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={tInput("category")}
                      variant="outlined"
                      size="medium"
                      sx={{ width: "250px" }}
                      error={Boolean(errors.selectedCategories)}
                      helperText={errors.selectedCategories}
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
            <div className="create-edit-form-inputs">
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale={language}
              >
                <Box sx={{ width: "250px" }}>
                  <DateTimePicker
                    disablePast
                    label={tInput("fromDate")}
                    value={startDate}
                    onChange={(date) => setStartDate(date)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: Boolean(errors.startDate),
                        helperText: errors.startDate,
                      },
                    }}
                    localeText={{
                      cancelButtonLabel: tButton("cancel"),
                      okButtonLabel: tButton("ok"),
                    }}
                  />
                </Box>
              </LocalizationProvider>
            </div>
            <div className="create-edit-form-inputs">
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale={language}
              >
                <Box sx={{ width: "250px" }}>
                  <DateTimePicker
                    disablePast
                    label={tInput("toDate")}
                    value={endDate}
                    onChange={(date) => setEndDate(date)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: Boolean(errors.endDate),
                        helperText: errors.endDate,
                      },
                    }}
                    localeText={{
                      cancelButtonLabel: tButton("cancel"),
                      okButtonLabel: tButton("ok"),
                    }}
                  />
                </Box>
              </LocalizationProvider>
            </div>
            <div className="create-edit-form-inputs">
              {updating ? (
                <>
                  <div>
                    <Button
                      variant="contained"
                      fullWidth
                      color="warning"
                      sx={{
                        width: "225px",
                        textTransform: "none",
                        marginBottom: "10px",
                      }}
                      onClick={Update}
                    >
                      {tButton("update")}
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      fullWidth
                      color="inherit"
                      sx={{ width: "225px", textTransform: "none" }}
                      onClick={ClearAll}
                    >
                      {tButton("cancel")}
                    </Button>
                  </div>
                </>
              ) : (
                <Button
                  variant="contained"
                  fullWidth
                  color="success"
                  sx={{ width: "225px", textTransform: "none" }}
                  onClick={Create}
                >
                  {tButton("create")}
                </Button>
              )}
            </div>
          </div>
        </div>

        <div>
          <CreateEventMapPanel isError={errors.latitude} />
        </div >
        <DeleteEventDialog />
      </div >
    </>
  );
}

export default CreateAndEditPanel;
