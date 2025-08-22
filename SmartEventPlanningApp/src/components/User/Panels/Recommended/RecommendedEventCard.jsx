import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../../css/User/Panels/Recommended/RecommendedEventCard.css";
import { Avatar, Button, IconButton } from "@mui/material";
import BiEtkinlik from "../../../../assets/eventImage/BiEtkinlik.png";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Tooltip from "@mui/material/Tooltip";
import {
  SetDiscoveryLatitude,
  SetDiscoveryLongitude,
  SetIsMapReviewed,
} from "../../../../redux/slices/mapSlice";
import { RegisterEvent } from "../../../../redux/slices/eventRegisterSlice";
import { MarkRecommendedEventAsRegistered } from "../../../../redux/slices/recommendedSlice";
import { useTranslation } from "react-i18next";

function RecommendedEventCard({ event }) {
  const { t: tButton } = useTranslation("button");
  const { t: tTooltip } = useTranslation("tooltip");
  const { t: tText } = useTranslation("text");
  const { t: tCategory } = useTranslation("category");


  const dispatch = useDispatch();
  const { viewMode } = useSelector((store) => store.userSetting);
  const { discoveryLatitude, discoveryLongitude } = useSelector(
    (store) => store.map
  );

  const UserId = localStorage.getItem("UserId");
  const [imgError, setImgError] = useState(false);

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const ReviewTheLocation = (lat, lng) => {
    dispatch(SetDiscoveryLatitude(lat));
    dispatch(SetDiscoveryLongitude(lng));
    dispatch(SetIsMapReviewed(true));
  };

  const RecommendedRegister = async () => {
    const data = {
      AppUserId: Number(UserId),
      EventId: event.eventId,
    };
    var result = await dispatch(RegisterEvent(data)).unwrap();
    if (result) {
      dispatch(MarkRecommendedEventAsRegistered(event.eventId));
    }
  };

  const images = import.meta.glob("../../../../assets/categoryImages/gif/*.gif", { eager: true });

  const getCategoryIcon = (name) => {
    // Dosya adını küçük harf + tire ile normalize et
    const fileName = name.toLowerCase().replace(/\s+/g, "-") + ".gif";
    const path = `../../../../assets/categoryImages/gif/${fileName}`;
    return images[path]?.default || images["../../../../assets/categoryImages/gif/default.gif"].default;
  };

  return (
    <>
      <div
        className={
          viewMode === "classic"
            ? "recommended-e-c-main-with-card"
            : "recommended-e-c-main-without-card"
        }
      >
        <div className="flex-row-justify-space-between">
          <div className="flex-row">
            <div>
              <IconButton>
                <Avatar
                  sx={{ width: 65, height: 65 }}
                  src={
                    !imgError && event.appUser?.profilePhotoId
                      ? `https://localhost:7126/api/Users/ProfileImage/${event.appUser.profilePhotoId}`
                      : undefined
                  }
                  onError={() => setImgError(true)}
                >
                  {!event.appUser?.profilePhotoId &&
                    event.appUser.firstName?.[0].toUpperCase()}
                </Avatar>
              </IconButton>
            </div>
            <div>
              {event.appUser.firstName} {event.appUser.lastName} {"("}
            </div>
            <Tooltip title={tTooltip("communityScore")} placement="right">
              <div>
                {event.appUser.score}
                {")"}
              </div>
            </Tooltip>
          </div>

          <div className="flex-column-justify-end" style={{ marginRight: "10px" }}>
            {event.eventCategories.map((c) => (
              <div key={c.category.categoryId} >
                <img src={getCategoryIcon(c.category.categoryName)} alt={c.category.categoryName} width={85} height={85} />
              </div>
            ))}

          </div>
        </div>
        <div className="flex-row">
          <div className="recommended-e-c-image">
            <img
              src={
                !imgError && event.eventImageId
                  ? `https://localhost:7126/api/Users/ProfileImage/${event.eventImageId}`
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
          </div>
        </div>
        <div className="flex-row-justify-start">
          <div className="recommended-e-c-register">
            {!event.registered ? (
              <Button
                variant="outlined"
                color="success"
                sx={{ textTransform: "none" }}
                onClick={RecommendedRegister}
              >
                {tButton("registerEvent")}
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="success"
                sx={{ textTransform: "none" }}
                disabled
              >
                {tButton("registered")}
              </Button>
            )}
          </div>
          <div className="recommended-e-c-register">
            <Button
              variant={
                event.latitude == discoveryLatitude &&
                  event.longitude == discoveryLongitude
                  ? "contained"
                  : "outlined"
              }
              sx={{ textTransform: "none" }}
              onClick={() => ReviewTheLocation(event.latitude, event.longitude)}
            >
              {tButton("viewLocation")}
            </Button>
          </div>
        </div>
        <div className="recommended-e-c-description-container">
          <Accordion
            sx={{
              width: "100%",
              boxShadow: "none",
              backgroundColor: viewMode === "classic" ? "whitesmoke" : "white",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-content-${event.id}`}
              id={`panel-header-${event.id}`}
              sx={{ padding: 0 }}
            >
              <div className="flex-row-justify-start">
                <div className="recommended-e-c-name">{event.name} - </div>
                {event.eventCategories.map((c) => (
                  <div
                    className="recommended-e-c-category"
                    key={c.category.categoryId}
                  >
                    {tCategory(c.category.categoryName)}
                  </div>
                ))}
              </div>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: "8px 0" }}>
              <div>
                {event.description}
                <div style={{ marginTop: "5px" }}>
                  {tText("city")}: {event.city}
                </div>
                <div style={{ marginTop: "5px" }}>
                  {tText("startDate")}: {formatDateTime(event.startDate)}
                </div>
                <div style={{ marginTop: "5px" }}>
                  {tText("endDate")}: {formatDateTime(event.endDate)}
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <hr />
    </>
  );
}

export default RecommendedEventCard;
