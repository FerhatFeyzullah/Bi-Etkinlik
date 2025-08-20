import React, { useEffect, useState } from "react";
import "../../../../css/User/Panels/DiscoveryFilterPanel.css";
import { useDispatch, useSelector } from "react-redux";
import {
  SetCategories,
  SetCities,
  SetFilterMode,
  SetEndDate,
  SetStartDate,
} from "../../../../redux/slices/discoverySlice";
import Button from "@mui/material/Button";
import { Autocomplete, TextField } from "@mui/material";
import { cities } from "../../../../data/MyData";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CategoryFilterSkeleton from "../../../Skeletons/CategoryFilterSkeleton";
import { useTranslation } from "react-i18next";

function DiscoveryFilterPanel() {
  const { t: tButton } = useTranslation("button");
  const { t: tInput } = useTranslation("input");
  const { t: tText } = useTranslation("text");
  const { t: tCategory } = useTranslation("category");

  const dispatch = useDispatch();

  const { allCategory, cetegoryFilterSkeletonLoaing } = useSelector(
    (store) => store.category
  );
  const { language } =
    useSelector((store) => store.userSetting);
  const { filterMode } = useSelector((store) => store.discovery);

  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    dispatch(SetCities(selectedCities));
    dispatch(SetCategories(selectedCategories));
  }, [selectedCities, selectedCategories]);

  useEffect(() => {
    const formattedStartDate = dayjs(startDate).format("YYYY-MM-DD");
    const formattedEndDate = dayjs(endDate).format("YYYY-MM-DD");
    dispatch(SetStartDate(formattedStartDate));
    dispatch(SetEndDate(formattedEndDate));
  }, [startDate, endDate]);

  useEffect(() => {
    if (startDate != null && endDate != null) {
      dispatch(SetFilterMode(true))
    }
  })

  const OpenFilter = () => {
    dispatch(SetFilterMode(true));
  };

  const ClearAllFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedCategories([]);
    setSelectedCities([]);
    dispatch(SetCategories([]));
    dispatch(SetCities([]));
    dispatch(SetStartDate(null));
    dispatch(SetEndDate(null));
    dispatch(SetFilterMode(false));
  };

  return (
    <div className="discovery-filter-container flex-column">
      <div className="discovery-filter-lists-main flex-column-justify-start" >
        <h2>{tText("filterPanelTitle")}</h2>
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
              sx={{ width: "250px", marginTop: "30px" }}
            />
          )}
          disablePortal
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
        {cetegoryFilterSkeletonLoaing ? (
          <CategoryFilterSkeleton />
        ) : (
          <Autocomplete
            options={allCategory}
            multiple
            getOptionLabel={(option) => tCategory(option.categoryName)}
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
                sx={{ width: "250px", marginTop: "20px" }}
              />
            )}
            disablePortal
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

        <LocalizationProvider dateAdapter={AdapterDayjs}
          adapterLocale={language}>
          <DatePicker
            disablePast
            label={tInput("fromDate")}
            sx={{
              width: "250px",
              marginTop: "20px",
            }}
            value={startDate}
            onChange={(e) => setStartDate(e)}
          />
          <DatePicker
            disablePast
            label={tInput("toDate")}
            sx={{
              width: "250px",
              marginTop: "20px"
            }}
            value={endDate}
            onChange={(e) => setEndDate(e)}
          />
        </LocalizationProvider>

        <div className="flex-column">
          <div style={{ marginTop: "50px" }}>
            <Button
              variant={!filterMode ? "outlined" : "contained"}
              sx={{ textTransform: "none", width: "170px" }}
              onClick={OpenFilter}
            >
              {tButton("filterOn")}
            </Button>
          </div>
          <div style={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              sx={{ textTransform: "none", fontSize: "15px", width: "170px" }}
              onClick={ClearAllFilters}
              color="warning"
            >
              {tButton("removeAllFilters")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscoveryFilterPanel;
