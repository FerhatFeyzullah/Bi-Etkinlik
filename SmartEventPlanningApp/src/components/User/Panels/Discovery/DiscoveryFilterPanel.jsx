import React, { useEffect, useState } from "react";
import "../../../../css/User/Panels/DiscoveryFilterPanel.css";
import { useDispatch, useSelector } from "react-redux";
import Switch from "@mui/material/Switch";
import {
  SetCategories,
  SetCities,
  SetDateFilterMode,
  SetEndDate,
  SetStartDate,
} from "../../../../redux/slices/discoverySlice";
import Button from "@mui/material/Button";
import { Autocomplete, TextField } from "@mui/material";
import { cities } from "../../../../data/MyData";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CategoryFilterSkeleton from "../../../Skeletons/CategoryFilterSkeleton";
import { useTranslation } from "react-i18next";

function DiscoveryFilterPanel() {
  const { t: tButton } = useTranslation("button");
  const { t: tInput } = useTranslation("input");
  const dispatch = useDispatch();

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

  return (
    <div className="discovery-filter-container">
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
                label={tInput("city")}
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
                  label={tInput("category")}
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
                  label={tInput("fromDate")}
                  sx={{
                    width: "100%",
                    marginBottom: "10px",
                  }}
                  value={startDate}
                  onChange={(e) => setStartDate(e)}
                />
                <DatePicker
                  label={tInput("toDate")}
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
                {tButton("filterOn")}
              </Button>
            </div>
            <div style={{ margin: "10px" }}>
              <Button
                variant={dateFilterMode ? "outlined" : "contained"}
                onClick={ClearDateFilter}
                sx={{ textTransform: "none", width: "150px" }}
              >
                {tButton("filterOff")}
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
            {tButton("removeAllFilters")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DiscoveryFilterPanel;
