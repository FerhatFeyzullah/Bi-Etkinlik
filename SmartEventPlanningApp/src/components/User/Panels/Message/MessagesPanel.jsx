import React, { useEffect, useState } from "react";
import "../../../../css/User/Panels/Message/MessagesPanel.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import { useSelector } from "react-redux";
import BiEtkinlik from "../../../../assets/eventImage/BiEtkinlik.png";
import { Avatar } from "@mui/material";
import { useTranslation } from "react-i18next";

function MessagesPanel() {
  const { t: tText } = useTranslation("text");
  const { chattingEvent } = useSelector((store) => store.message);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="messages-panel-container flex-column">
      <div className="m-panel-title-phase flex-row-justify-start">
        {chattingEvent ? (
          <>
            <div style={{ marginLeft: "20px" }}>
              <Avatar
                sx={{ width: 70, height: 70 }}
                src={
                  !imgError && chattingEvent.eventImageId
                    ? `https://localhost:7126/api/Users/ProfileImage/${chattingEvent.eventImageId}`
                    : BiEtkinlik
                }
                onError={() => setImgError(true)}
              ></Avatar>
            </div>
            <div style={{ marginLeft: "30px" }}>
              <div>{chattingEvent.name}</div>
              <div>{chattingEvent.city}</div>
            </div>
          </>
        ) : (
          <div className="flex-row" style={{ width: "100%" }}>
            <h2>{tText("selectChatGroup")}</h2>
          </div>
        )}
      </div>
      <div className="m-panel-message-phase"></div>
      <div className="m-panel-input-phase flex-row">
        <TextField
          sx={{ width: "95%" }}
          fullWidth
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment>
                  <IconButton size="large">
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </div>
    </div>
  );
}

export default MessagesPanel;
