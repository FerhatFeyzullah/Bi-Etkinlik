import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SetIsEventPreview,
  SetPreviewedEvent,
} from "../../../redux/slices/eventSlice";
import "../../../css/User/DiscoveryEventCard.css";
import { Avatar, Button, IconButton } from "@mui/material";
import BiEtkinlik from "../../../assets/eventImage/BiEtkinlik.png";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { useTranslation } from "react-i18next";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EventReviewDialog() {
  const { t: tButton } = useTranslation("button");
  const { t: tTooltip } = useTranslation("tooltip");
  const { t: tText } = useTranslation("text");
  const { t: tCategory } = useTranslation("category");


  const dispatch = useDispatch();
  const [imgError, setImgError] = useState(false);

  const { isEventPreview, previewedEvent } = useSelector(
    (store) => store.event
  );

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

  const CloseDialog = () => {
    dispatch(SetIsEventPreview(false));
    dispatch(SetPreviewedEvent({}));
  };

  const images = import.meta.glob("../../../assets/categoryImages/gif/*.gif", { eager: true });

  const getCategoryIcon = (name) => {
    // Dosya adını küçük harf + tire ile normalize et
    const fileName = name.toLowerCase().replace(/\s+/g, "-") + ".gif";
    const path = `../../../assets/categoryImages/gif/${fileName}`;
    return images[path]?.default || images["../../../assets/categoryImages/gif/default.gif"].default;
  };

  return (
    <div>
      <Dialog
        open={isEventPreview}
        slots={{
          transition: Transition,
        }}
        PaperProps={{
          sx: {
            borderRadius: "20px", // istediğin değeri verebilirsin
          },
        }}
        keepMounted
        onClose={CloseDialog}
      >
        <DialogContent sx={{ width: "600px" }} className="flex-row">
          <>
            <div className="review-e-c-main-without-card">
              <div className="flex-row-justify-space-between">
                <div className="flex-row">
                  <div>
                    <IconButton disabled>
                      <Avatar
                        sx={{ width: 60, height: 60 }}
                        src={
                          !imgError && previewedEvent.appUser?.profilePhotoId
                            ? `http://localhost:7126/api/Users/ProfileImage/${previewedEvent.appUser.profilePhotoId}`
                            : undefined
                        }
                        onError={() => setImgError(true)}
                      >
                        {!previewedEvent.appUser?.profilePhotoId &&
                          previewedEvent.appUser?.firstName?.[0].toUpperCase()}
                      </Avatar>
                    </IconButton>
                  </div>
                  <div>
                    {previewedEvent.appUser?.firstName}{" "}
                    {previewedEvent.appUser?.lastName} {"("}
                  </div>
                  <Tooltip title={tTooltip("communityScore")} placement="right">
                    <div>
                      {previewedEvent.appUser?.score}
                      {")"}
                    </div>
                  </Tooltip>
                </div>


                <div className="flex-column-justify-end" style={{ marginRight: "10px" }}>
                  {previewedEvent.eventCategories?.map((c) => (
                    <div key={c.category.categoryId} >
                      <img src={getCategoryIcon(c.category.categoryName)} alt={c.category.categoryName} width={85} height={85} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-row">
                <div className="discovery-e-c-image">
                  <img
                    src={
                      !imgError && previewedEvent.eventImageId
                        ? `http://localhost:7126/api/Users/ProfileImage/${previewedEvent.eventImageId}`
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
              <div className="discovery-e-c-description-container">
                <Accordion
                  sx={{
                    width: "100%",
                    boxShadow: "none",
                    backgroundColor: "white",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel-content-${previewedEvent.id}`}
                    id={`panel-header-${previewedEvent.id}`}
                    sx={{ padding: 0 }}
                  >
                    <div className="flex-row-justify-start">
                      <div className="discovery-e-c-name">
                        {previewedEvent.name} -{" "}
                      </div>
                      {previewedEvent.eventCategories?.map((c) => (
                        <div
                          className="discovery-e-c-category"
                          key={c.category.categoryId}
                        >
                          {tCategory(c.category.categoryName)}
                        </div>
                      ))}
                    </div>
                  </AccordionSummary>
                  <AccordionDetails sx={{ padding: "8px 0" }}>
                    <div>
                      {previewedEvent.description}
                      <div style={{ marginTop: "5px" }}>
                        {tText("city")}: {previewedEvent.city}
                      </div>
                      <div style={{ marginTop: "5px" }}>
                        {tText("startDate")}:{" "}
                        {formatDateTime(previewedEvent.startDate)}
                      </div>
                      <div style={{ marginTop: "5px" }}>
                        {tText("endDate")}:{" "}
                        {formatDateTime(previewedEvent.endDate)}
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          </>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" sx={{ textTransform: "none", margin: "10px 10px" }} onClick={CloseDialog}>
            {tButton("turnOffPreview")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EventReviewDialog;
