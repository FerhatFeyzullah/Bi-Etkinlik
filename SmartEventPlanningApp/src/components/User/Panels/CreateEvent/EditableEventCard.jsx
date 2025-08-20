import React, { useEffect, useState } from "react";
import "../../../../css/User/Panels/CreateEventPanel/EditableEventCard.css";
import BiEtkinlik from "../../../../assets/eventImage/BiEtkinlik.png";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import {
  RemoveEvent,
  SetDeletedEvent,
  SetEventDeleteDialog,
  SetIsEventPreview,
  SetIsUpdateMode,
  SetPreviewedEvent,
  SetUpdateEventProp,
} from "../../../../redux/slices/eventSlice";
import { useTranslation } from "react-i18next";

function EditableEventCard() {
  const { t: tTooltip } = useTranslation("tooltip");
  const { t: tText } = useTranslation("text");

  const dispatch = useDispatch();
  const [imgError, setImgError] = useState(false);
  const { editableEvents } = useSelector((store) => store.event);

  const UpdateModeOpen = (a) => {
    dispatch(SetIsUpdateMode(true));
    dispatch(SetUpdateEventProp(a));
  };

  const DeleteEvent = (id) => {
    dispatch(SetDeletedEvent(id));
    dispatch(SetEventDeleteDialog(true));
  }

  const PreviewEvent = (a) => {
    dispatch(SetIsEventPreview(true));
    dispatch(SetPreviewedEvent(a));
  };

  return (
    <>
      {editableEvents &&
        editableEvents.events?.map((e) => (
          <div className="editable-event-card" key={e.eventId}>
            <div style={{ height: "100%" }}>
              <img
                src={
                  !imgError && e.eventImageId
                    ? `https://localhost:7126/api/Users/ProfileImage/${e.eventImageId}`
                    : BiEtkinlik
                }
                style={{
                  width: "350px",
                  height: "80%",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
                onError={() => setImgError(true)}
                alt="Resim"
              />
              <div className="editable-event-card-name">{e.name}</div>
              <div className="flex-row-justify-start">
                <Tooltip title={tTooltip("previewEvent")}>
                  <IconButton
                    sx={{ margin: "0 20px" }}
                    onClick={() => PreviewEvent(e)}
                  >
                    <VisibilityIcon fontSize="medium" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={tTooltip("deleteEvent")}>
                  <IconButton
                    sx={{ marginRight: "20px" }}
                    onClick={() => DeleteEvent(e.eventId)}
                  >
                    <DeleteIcon fontSize="medium" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={tTooltip("updateEvent")}>
                  <IconButton
                    sx={{ marginRight: "30px" }}
                    onClick={() => UpdateModeOpen(e)}
                  >
                    <EditIcon fontSize="medium" />
                  </IconButton>
                </Tooltip>
                <div
                  className={
                    e.status == null
                      ? "editable-event-status-null"
                      : e.status === true
                        ? "editable-event-status-true"
                        : "editable-event-status-false"
                  }
                >
                  <Tooltip
                    title={
                      e.status == null
                        ? tTooltip("eventStatusNull")
                        : e.status
                          ? tTooltip("eventStatusTrue")
                          : tTooltip("eventStatusFalse")
                    }
                  >
                    <div>
                      {e.status == null
                        ? tText("waiting")
                        : e.status
                          ? tText("approved")
                          : tText("rejected")}
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default EditableEventCard;
