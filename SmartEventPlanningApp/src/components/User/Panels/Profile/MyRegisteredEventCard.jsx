import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../../css/User/Panels/Profile/MyRegisteredEventCard.css";
import BiEtkinlik from "../../../../assets/eventImage/BiEtkinlik.png";
import Tooltip from "@mui/material/Tooltip";
import { IconButton } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GradeIcon from "@mui/icons-material/Grade";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  SetDeletedEventRegister,
  SetIsEventRegisterDeleteDialog,
  SetIsEventRateDialog,
  SetRatedEvent,
} from "../../../../redux/slices/eventRegisterSlice";
import {
  SetIsEventPreview,
  SetPreviewedEvent,
} from "../../../../redux/slices/eventSlice";
import {
  SetDiscoveryLatitude,
  SetDiscoveryLongitude,
  SetIsMapReviewed,
} from "../../../../redux/slices/mapSlice";
import { useTranslation } from "react-i18next";

function MyRegisteredEventCard({ events, tabNumber }) {
  const { t: tTooltip } = useTranslation("tooltip");
  const dispatch = useDispatch();
  const [imgError, setImgError] = useState(false);

  const UserId = localStorage.getItem("UserId");

  const DeleteEventDialog = (usId, evId) => {
    const data = {
      userId: usId,
      eventId: evId,
    };
    dispatch(SetDeletedEventRegister(data));
    dispatch(SetIsEventRegisterDeleteDialog(true));
  };

  const PreviewEvent = (a) => {
    dispatch(SetIsEventPreview(true));
    dispatch(SetPreviewedEvent(a));
  };

  const ReviewLocation = (lat, lng) => {
    dispatch(SetDiscoveryLatitude(lat));
    dispatch(SetDiscoveryLongitude(lng));
    dispatch(SetIsMapReviewed(true));
  };

  const RateEvent = (eRegisterId) => {
    dispatch(SetRatedEvent(eRegisterId));
    dispatch(SetIsEventRateDialog(true));
  };

  return (
    <div className="my-regisired-event-card-container">
      <img
        src={
          !imgError && events.event.eventImageId
            ? `https://localhost:7126/api/Users/ProfileImage/${events.event.eventImageId}`
            : BiEtkinlik
        }
        style={{
          width: "100%",
          height: "80%",
          objectFit: "cover",
          borderRadius: "12px",
        }}
        onError={() => setImgError(true)}
        alt="Resim"
      />
      <div className="my-registered-event-card-name">{events.event.name}</div>
      <div className="flex-row" style={{ gap: "30px" }}>
        {tabNumber == 0 && (
          <Tooltip title={tTooltip("deleteMyRegistration")}>
            <IconButton
              onClick={() => DeleteEventDialog(UserId, events.event.eventId)}
            >
              <RemoveCircleOutlineIcon
                sx={{ fontSize: "30px", color: "red" }}
              />
            </IconButton>
          </Tooltip>
        )}

        <Tooltip title={tTooltip("previewEvent")}>
          <IconButton onClick={() => PreviewEvent(events.event)}>
            <VisibilityIcon sx={{ fontSize: "30px" }} />
          </IconButton>
        </Tooltip>
        {tabNumber != 2 && (
          <Tooltip title={tTooltip("viewLocation")}>
            <IconButton
              onClick={() =>
                ReviewLocation(events.event.latitude, events.event.longitude)
              }
            >
              <LocationOnIcon sx={{ fontSize: "30px" }} />
            </IconButton>
          </Tooltip>
        )}
        {tabNumber === 2 &&
          (events.isScored ? (
            <Tooltip title={tTooltip("ratedEvent")}>
              <span>
                <IconButton disabled>
                  <GradeIcon sx={{ fontSize: "30px", color: "gray" }} />
                </IconButton>
              </span>
            </Tooltip>
          ) : (
            <Tooltip title={tTooltip("rateYourExperience")}>
              <IconButton onClick={() => RateEvent(events.eventRegisterId)}>
                <GradeIcon sx={{ fontSize: "30px", color: "gold" }} />
              </IconButton>
            </Tooltip>
          ))}
      </div>
    </div>
  );
}

export default MyRegisteredEventCard;
