import React, { useEffect, useRef } from "react";
import "../../../../css/User/Panels/CreateEventPanel/EditableEventsPanel.css";
import EditableEventCard from "./EditableEventCard";
import { useDispatch, useSelector } from "react-redux";
import { GetEventsI_CreatedUnFiltreted } from "../../../../redux/slices/eventSlice";
import EventReviewDialog from "./EventReviewDialog";
import EditableEventCardSkeleton from "../../../Skeletons/EditableEventCardSkeleton";
import Tooltip from "@mui/material/Tooltip";

function EditableEventsPanel({ children }) {
  const dispatch = useDispatch();
  const { createAndEditS_Alert, editableEventSkeleton } = useSelector(
    (store) => store.event
  );

  const UserId = localStorage.getItem("UserId");
  useEffect(() => {
    dispatch(GetEventsI_CreatedUnFiltreted(UserId));
    console.log(UserId);
  }, [UserId, createAndEditS_Alert]);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Tooltip
          title="Bu panelde yalnızca henüz başlamamış etkinlikleri görüntüleyebilir, düzenleyebilir veya silebilirsiniz."
          placement="right"
        >
          <h2>Etkinliklerim</h2>
        </Tooltip>
      </div>

      <div className="editable-panel-container">
        <div className="flex-row-justify-start">
          {editableEventSkeleton ? (
            <EditableEventCardSkeleton />
          ) : (
            <EditableEventCard />
          )}
        </div>
      </div>

      <EventReviewDialog />
    </>
  );
}

export default EditableEventsPanel;
