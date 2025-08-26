import React, { useEffect, useState } from "react";
import "../../../../css/User/Panels/Message/ChatGroup.css";
import BiEtkinlik from "../../../../assets/eventImage/BiEtkinlik.png";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { SetChattingEvent } from "../../../../redux/slices/messageSlice";

function ChatGroup({ event }) {
  const dispatch = useDispatch();

  const OpenChat = () => {
    dispatch(SetChattingEvent(event));
  };
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="chat-group-card-container flex-row-justify-start"
      onClick={OpenChat}
    >
      <div style={{ marginLeft: "20px" }}>
        <Avatar
          sx={{ width: 70, height: 70 }}
          src={
            !imgError && event.eventImageId
              ? `http://localhost:7126/api/Users/ProfileImage/${event.eventImageId}`
              : BiEtkinlik
          }
          onError={() => setImgError(true)}
        ></Avatar>
      </div>
      <div style={{ marginLeft: "20px" }}>
        <div>{event.name}</div>
        <div>{event.city}</div>
      </div>
    </div>
  );
}

export default ChatGroup;
