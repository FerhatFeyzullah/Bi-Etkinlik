import React, { useEffect, useState } from "react";
import "../../../../css/User/Panels/DiscoveryFilterPanel.css";
import { useDispatch, useSelector } from "react-redux";
import Switch from "@mui/material/Switch";
import {
  ChangeBoxReviewIsChecked,
  SetCategories,
  SetCities,
  SetDateFilterMode,
  SetEndDate,
  SetStartDate,
} from "../../../../redux/slices/discoverySlice";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Autocomplete, TextField } from "@mui/material";
import { cities } from "../../../../data/MyData";
import { GetAllCategory } from "../../../../redux/slices/categorySlice";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CategoryFilterSkeleton from "../../../Skeletons/CategoryFilterSkeleton";

function DiscoveryFilterPanel() {
  const dispatch = useDispatch();

  const [boxReviewChecked, setBoxReviewChecked] = useState(true);
  const { allCategory, cetegoryFilterSkeletonLoaing } = useSelector(
    (store) => store.category
  );
  const { dateFilterMode } = useSelector((store) => store.discovery);

  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const SetDate = () => {
    if (!startDate || !endDate) return;
    const formattedStartDate = dayjs(startDate).format("YYYY-MM-DD");
    const formattedEndDate = dayjs(endDate).format("YYYY-MM-DD");
    dispatch(SetStartDate(formattedStartDate));
    dispatch(SetEndDate(formattedEndDate));
    dispatch(SetDateFilterMode(true));
  };

  useEffect(() => {
    dispatch(SetCities(selectedCities));
    dispatch(SetCategories(selectedCategories));
  }, [selectedCities, selectedCategories]);

  useEffect(() => {
    if (dateFilterMode) {
      const formattedStartDate = dayjs(startDate).format("YYYY-MM-DD");
      const formattedEndDate = dayjs(endDate).format("YYYY-MM-DD");
      dispatch(SetStartDate(formattedStartDate));
      dispatch(SetEndDate(formattedEndDate));
    }
  }, [startDate, endDate]);

  const ClearAllFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedCategories([]);
    setSelectedCities([]);
    dispatch(SetCategories([]));
    dispatch(SetCities([]));
    dispatch(SetStartDate(null));
    dispatch(SetEndDate(null));
    dispatch(SetDateFilterMode(false));
  };
  const ClearDateFilter = () => {
    setStartDate(null);
    setEndDate(null);
    dispatch(SetStartDate(null));
    dispatch(SetEndDate(null));
    dispatch(SetDateFilterMode(false));
  };

  const handleChange = (event) => {
    setBoxReviewChecked(event.target.checked);
    dispatch(ChangeBoxReviewIsChecked(boxReviewChecked));
  };

  return (
    <div className="discovery-filter-container">
      <div className="discovery-filter-checkbox">
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={boxReviewChecked}
                onChange={handleChange}
                sx={{ marginLeft: "20px" }}
              />
            }
            label="Kart Görünümü"
          />
        </FormGroup>
      </div>
      <div className="flex-row-justify-space-around discovery-filter-lists-main">
        <div className="discovery-filter-lists">
          <Autocomplete
            options={cities}
            multiple
            getOptionLabel={(option) => option}
            value={selectedCities}
            onChange={(event, newValue) => setSelectedCities(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Şehir"
                variant="outlined"
                size="medium"
                sx={{ width: "100%", marginTop: "5px" }}
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
        <div className="discovery-filter-lists">
          {cetegoryFilterSkeletonLoaing ? (
            <CategoryFilterSkeleton />
          ) : (
            <Autocomplete
              options={allCategory}
              multiple
              getOptionLabel={(option) => option.categoryName}
              value={allCategory.filter((cat) =>
                selectedCategories.includes(cat.categoryId)
              )}
              onChange={(event, newValue) =>
                setSelectedCategories(newValue.map((item) => item.categoryId))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Kategori"
                  variant="outlined"
                  size="medium"
                  sx={{ width: "100%", marginTop: "5px" }}
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
          )}
        </div>
        <div className="discovery-filter-lists">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <div className="flex-column" style={{ width: "100%" }}>
                <DatePicker
                  label="Şu tarihten"
                  sx={{
                    width: "100%",
                    marginBottom: "10px",
                  }}
                  value={startDate}
                  onChange={(e) => setStartDate(e)}
                />
                <DatePicker
                  label="Şu tarihe"
                  sx={{ width: "100%" }}
                  value={endDate}
                  onChange={(e) => setEndDate(e)}
                />
              </div>
            </DemoContainer>
          </LocalizationProvider>
          <div className="flex-column">
            <div style={{ marginTop: "20px" }}>
              <Button
                variant={!dateFilterMode ? "outlined" : "contained"}
                onClick={SetDate}
                sx={{ textTransform: "none", width: "150px" }}
              >
                Filtre Açık
              </Button>
            </div>
            <div style={{ margin: "10px" }}>
              <Button
                variant={dateFilterMode ? "outlined" : "contained"}
                onClick={ClearDateFilter}
                sx={{ textTransform: "none", width: "150px" }}
              >
                Filtre Kapalı
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-row discovery-filter-buttons">
        <div>
          <Button
            variant="contained"
            sx={{ textTransform: "none", fontSize: "15px" }}
            onClick={ClearAllFilters}
            color="warning"
          >
            Tüm Filtreyi Kaldır
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DiscoveryFilterPanel;
