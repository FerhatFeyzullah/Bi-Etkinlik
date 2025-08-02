import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SetIsEventPreview,
  SetPreviewedEvent,
} from "../../../../redux/slices/eventSlice";
import "../../../../css/User/DiscoveryEventCard.css";
import { Avatar, Button, IconButton } from "@mui/material";
import BiEtkinlik from "../../../../assets/eventImage/BiEtkinlik.png";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EventReviewDialog() {
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

  return (
    <div>
      <Dialog
        open={isEventPreview}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={CloseDialog}
      >
        <DialogTitle sx={{ textAlign: "center" }}>{"Etkinliğim"}</DialogTitle>
        <DialogContent sx={{ width: "600px" }} className="flex-row">
          <>
            <div className="review-e-c-main-without-card">
              <div className="discovery-e-c-user-info">
                <div>
                  <IconButton disabled>
                    <Avatar
                      sx={{ width: 60, height: 60 }}
                      src={
                        !imgError && previewedEvent.appUser?.profilePhotoId
                          ? `https://localhost:7126/api/Users/ProfileImage/${previewedEvent.appUser.profilePhotoId}`
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
                <Tooltip title="Topluluk Puanı" placement="right">
                  <div>
                    {previewedEvent.appUser?.score}
                    {")"}
                  </div>
                </Tooltip>
              </div>
              <div className="flex-row">
                <div className="discovery-e-c-image">
                  <img
                    src={
                      !imgError && previewedEvent.eventImageId
                        ? `https://localhost:7126/api/Users/ProfileImage/${previewedEvent.eventImageId}`
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
                          {c.category.categoryName}
                        </div>
                      ))}
                    </div>
                  </AccordionSummary>
                  <AccordionDetails sx={{ padding: "8px 0" }}>
                    <div>
                      {previewedEvent.description}
                      <div style={{ marginTop: "5px" }}>
                        Şehir: {previewedEvent.city}
                      </div>
                      <div style={{ marginTop: "5px" }}>
                        Başlangıç: {formatDateTime(previewedEvent.startDate)}
                      </div>
                      <div style={{ marginTop: "5px" }}>
                        Bitiş: {formatDateTime(previewedEvent.endDate)}
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          </>
        </DialogContent>
        <DialogActions>
          <Button sx={{ textTransform: "none" }} onClick={CloseDialog}>
            Önizlemeyi Kapat
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EventReviewDialog;
