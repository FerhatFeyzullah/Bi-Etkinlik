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
import DiscoveryEventCard from "./DiscoveryEventCard";
import ReviewEventCardSkeleton from "../../../Skeletons/ReviewEventCardSkeleton";
import ToastMistake from "../../../Elements/ToastMistake";
import { SetEventRegisterMistakeAlert } from "../../../../redux/slices/eventRegisterSlice";
import ReviewMapDialog from "../ReviewMapDialog";
import { useTranslation } from "react-i18next";
import RegisterEventDialog from '../../../Dialogs/RegisterEventDialog'


function DiscoveryPanel() {
  const { t: tAlert } = useTranslation("alert");

  const dispatch = useDispatch();
  const {
    filterMode,
    startDate,
    endDate,
    cities,
    categories,
    discoverySkeletonLoading,
    discoveryEvents,
  } = useSelector((store) => store.discovery);

  const { eventRegisterMistakeAlert, eventRegisterResponse } = useSelector(
    (store) => store.eventRegister
  );

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
    const hasDate = startDate != null && endDate != null;
    const hasCity = cities.length > 0;
    const hasCategory = categories.length > 0;

    if (filterMode) {

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
      }
    }
  }, [UserId, filterMode, startDate, endDate, cities, categories]);

  useEffect(() => {
    if (!filterMode) {
      UnFiltreted(UserId);
    }
  }, [UserId, filterMode])

  const CloseEventRegisterMistakeToast = () => {
    dispatch(SetEventRegisterMistakeAlert(false));
  };

  return (
    <>
      <div className="discovery-container flex-column-justify-start">
        {discoverySkeletonLoading ? (
          <ReviewEventCardSkeleton />
        ) : (
          discoveryEvents &&
          discoveryEvents?.events?.map((e) => (
            <DiscoveryEventCard event={e} key={e.eventId} />
          ))
        )}
      </div>
      <ReviewMapDialog />
      <RegisterEventDialog />

      <ToastMistake
        visible={eventRegisterMistakeAlert}
        detail={tAlert(eventRegisterResponse)}
        closer={CloseEventRegisterMistakeToast}
      />
    </>
  );
}

export default DiscoveryPanel;
