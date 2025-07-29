import React, { useEffect } from "react";
import "../../../../css/User/Panels/DiscoveryPanel.css";
import { useDispatch, useSelector } from "react-redux";
import {
  GetE_F_Category,
  GetE_F_City,
  GetE_F_CityCategory,
  GetE_F_Date,
  GetE_F_DateCategory,
  GetE_F_DateCity,
  GetE_F_DateCityCategory,
  GetE_UnFiltered,
} from "../../../../redux/slices/discoverySlice";
import DiscoveryEventCard from "../../DiscoveryEventCard";

function DiscoveryPanel() {
  const dispatch = useDispatch();
  const { dateFilterMode, startDate, endDate, cities, categories } =
    useSelector((store) => store.discovery);

  const AppUser = JSON.parse(localStorage.getItem("AppUser"));
  const UserId = localStorage.getItem("UserId");

  const Category = (id, cat) => {
    const data = {
      id: id,
      categories: cat,
    };
    dispatch(GetE_F_Category(data));
  };
  const City = (id, cit) => {
    const data = {
      id: id,
      cities: cit,
    };
    dispatch(GetE_F_City(data));
  };
  const Date = (id, s, e) => {
    const data = {
      id: id,
      start: s,
      end: e,
    };
    dispatch(GetE_F_Date(data));
  };
  const CityCategory = (id, cit, cat) => {
    const data = {
      id: id,
      cities: cit,
      categories: cat,
    };
    dispatch(GetE_F_CityCategory(data));
  };
  const DateCategory = (id, s, e, cat) => {
    const data = {
      id: id,
      start: s,
      end: e,
      categories: cat,
    };
    dispatch(GetE_F_DateCategory(data));
  };
  const DateCity = (id, s, e, cit) => {
    const data = {
      id: id,
      start: s,
      end: e,
      cities: cit,
    };
    dispatch(GetE_F_DateCity(data));
  };
  const DateCityCategory = (id, s, e, cit, cat) => {
    const data = {
      id: id,
      start: s,
      end: e,
      cities: cit,
      categories: cat,
    };
    dispatch(GetE_F_DateCityCategory(data));
  };
  const UnFiltreted = (id) => {
    dispatch(GetE_UnFiltered(id));
  };

  useEffect(() => {
    const id = UserId;
    const hasDate = dateFilterMode;
    const hasCity = cities.length > 0;
    const hasCategory = categories.length > 0;

    if (hasDate && hasCity && hasCategory) {
      DateCityCategory(id, startDate, endDate, cities, categories);
    } else if (hasDate && hasCity) {
      DateCity(id, startDate, endDate, cities);
    } else if (hasDate && hasCategory) {
      DateCategory(id, startDate, endDate, categories);
    } else if (hasCity && hasCategory) {
      CityCategory(id, cities, categories);
    } else if (hasDate) {
      Date(id, startDate, endDate);
    } else if (hasCity) {
      City(id, cities);
    } else if (hasCategory) {
      Category(id, categories);
    } else {
      UnFiltreted(id);
    }
  }, [AppUser.id, dateFilterMode, startDate, endDate, cities, categories]);

  return (
    <div className="discovery-container">
      <DiscoveryEventCard />
    </div>
  );
}

export default DiscoveryPanel;
