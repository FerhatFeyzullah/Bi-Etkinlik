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
  SetIsEventPreview,
  SetIsUpdateMode,
  SetPreviewedEvent,
  SetUpdateEventProp,
} from "../../../../redux/slices/eventSlice";

function EditableEventCard() {
  const dispatch = useDispatch();
  const [imgError, setImgError] = useState(false);
  const { editableEvents } = useSelector((store) => store.event);

  const UpdateModeOpen = (a) => {
    dispatch(SetIsUpdateMode(true));
    dispatch(SetUpdateEventProp(a));
  };

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
                <Tooltip title="Etkinliği Önizle">
                  <IconButton
                    sx={{ margin: "0 20px" }}
                    onClick={() => PreviewEvent(e)}
                  >
                    <VisibilityIcon fontSize="medium" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Dikkat: Etkinlik silindikten sonra geri alınamaz!">
                  <IconButton
                    sx={{ marginRight: "20px" }}
                    onClick={() => dispatch(RemoveEvent(e.eventId))}
                  >
                    <DeleteIcon fontSize="medium" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Bu etkinliği güncellediğinizde sistem tarafından tekrar incelenecektir.">
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
                        ? "Etkinlik inceleme aşamasında. Kısa süre içinde onaylanacak ya da reddedilecek."
                        : e.status
                        ? "Etkinlik onaylandı. Artık diğer kullanıcılar tarafından görüntülenebilir ve katılım alabilir."
                        : "Etkinlik reddedildi. İçerik politikalarına uymadığı için yayınlanmadı."
                    }
                  >
                    <div>
                      {e.status == null
                        ? "Bekliyor"
                        : e.status
                        ? "Onaylandı"
                        : "Reddedildi"}
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
