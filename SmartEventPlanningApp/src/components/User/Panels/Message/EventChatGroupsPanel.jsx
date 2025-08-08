import React, { useEffect } from "react";
import "../../../../css/User/Panels/Message/EventChatGroups.css";
import { useDispatch, useSelector } from "react-redux";
import { GetAllEventsI_Joined } from "../../../../redux/slices/messageSlice";
import ChatGroup from "./ChatGroup";
import { useTranslation } from "react-i18next";

function EventChatGroupsPanel() {
  const { t: tText } = useTranslation("text");
  const dispatch = useDispatch();
  const { eventGroups } = useSelector((store) => store.message);
  const UserId = localStorage.getItem("UserId");

  useEffect(() => {
    dispatch(GetAllEventsI_Joined(UserId));
  }, []);

  return (
    <div className="event-chat-groups-container flex-column-justify-start">
      <h2>{tText("events")}</h2>
      <div className="event-chat-groups-list flex-column-justify-start">
        {eventGroups &&
          eventGroups.events?.map((eg) => (
            <ChatGroup key={eg.eventId} event={eg} />
          ))}
      </div>
    </div>
  );
}

export default EventChatGroupsPanel;
