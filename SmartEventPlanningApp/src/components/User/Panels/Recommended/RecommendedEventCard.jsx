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
} from "../../../../redux/slices/mapSlice";

function RecommendedEventCard() {
  const dispatch = useDispatch();
  const { boxReviewIsChecked } = useSelector((store) => store.discovery);
  const { recommendedEvents } = useSelector((store) => store.recommended);
  const { discoveryLatitude, discoveryLongitude } = useSelector(
    (store) => store.map
  );
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
    console.log(lat, lng);
  };

  useEffect(() => {
    console.log(recommendedEvents);
  }, [recommendedEvents]);

  return (
    <>
      {recommendedEvents.events?.map((e) => (
        <div
          className={
            !boxReviewIsChecked
              ? "recommended-e-c-main-with-card"
              : "recommended-e-c-main-without-card"
          }
          key={e.eventId}
        >
          <div className="recommended-e-c-user-info">
            <div>
              <IconButton>
                <Avatar
                  sx={{ width: 60, height: 60 }}
                  src={
                    !imgError && e.appUser?.profilePhotoId
                      ? `https://localhost:7126/api/Users/ProfileImage/${e.appUser.profilePhotoId}`
                      : undefined
                  }
                  onError={() => setImgError(true)}
                >
                  {!e.appUser?.profilePhotoId &&
                    e.appUser.firstName?.[0].toUpperCase()}
                </Avatar>
              </IconButton>
            </div>
            <div>
              {e.appUser.firstName} {e.appUser.lastName} {"("}
            </div>
            <Tooltip title="Topluluk Puanı" placement="right">
              <div>
                {e.appUser.score}
                {")"}
              </div>
            </Tooltip>
          </div>
          <div className="flex-row">
            <div className="recommended-e-c-image">
              <img
                src={
                  !imgError && e.eventImageId
                    ? `https://localhost:7126/api/Users/ProfileImage/${e.eventImageId}`
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
              <Button
                variant="outlined"
                color="success"
                sx={{ textTransform: "none" }}
                disabled={e.registered}
              >
                {!e.registered ? "Kaydol" : "Kayıt Yapıldı"}
              </Button>
            </div>
            <div className="recommended-e-c-register">
              <Button
                variant={
                  e.latitude == discoveryLatitude &&
                  e.longitude == discoveryLongitude
                    ? "contained"
                    : "outlined"
                }
                sx={{ textTransform: "none" }}
                onClick={() => ReviewTheLocation(e.latitude, e.longitude)}
              >
                Konumu Gör
              </Button>
            </div>
          </div>
          <div className="recommended-e-c-description-container">
            <Accordion
              sx={{
                width: "100%",
                boxShadow: "none",
                backgroundColor: !boxReviewIsChecked ? "whitesmoke" : "white",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-content-${e.id}`}
                id={`panel-header-${e.id}`}
                sx={{ padding: 0 }}
              >
                <div className="flex-row-justify-start">
                  <div className="recommended-e-c-name">{e.name} - </div>
                  {e.eventCategories.map((c) => (
                    <div
                      className="recommended-e-c-category"
                      key={c.category.categoryId}
                    >
                      {c.category.categoryName}
                    </div>
                  ))}
                </div>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: "8px 0" }}>
                <div>
                  {e.description}
                  <div style={{ marginTop: "5px" }}>Şehir: {e.city}</div>
                  <div style={{ marginTop: "5px" }}>
                    Başlangıç: {formatDateTime(e.startDate)}
                  </div>
                  <div style={{ marginTop: "5px" }}>
                    Bitiş: {formatDateTime(e.endDate)}
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      ))}
      <hr />
    </>
  );
}

export default RecommendedEventCard;
