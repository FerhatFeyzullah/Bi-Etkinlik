import React, { useEffect, useRef } from "react";
import "../../../../css/User/Panels/CreateEventPanel/EditableEventsPanel.css";
import EditableEventCard from "./EditableEventCard";
import { useDispatch, useSelector } from "react-redux";
import { GetEventsI_CreatedUnFiltreted } from "../../../../redux/slices/eventSlice";

function EditableEventsPanel({ children }) {
  const dispatch = useDispatch();
  const { createAndEditS_Alert } = useSelector((store) => store.event);

  const UserId = localStorage.getItem("UserId");
  useEffect(() => {
    dispatch(GetEventsI_CreatedUnFiltreted(UserId));
    console.log(UserId);
  }, [UserId, createAndEditS_Alert]);

  return (
    <div className="editable-panel-container flex-row-justify-start">
      <EditableEventCard />
    </div>
  );
}

export default EditableEventsPanel;
