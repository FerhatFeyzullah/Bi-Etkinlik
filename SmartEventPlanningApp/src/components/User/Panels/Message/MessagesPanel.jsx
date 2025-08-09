import React, { useEffect, useState, useRef } from "react";
import "../../../../css/User/Panels/Message/MessagesPanel.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import BiEtkinlik from "../../../../assets/eventImage/BiEtkinlik.png";
import { Avatar } from "@mui/material";
import { useTranslation } from "react-i18next";
import * as signalR from "@microsoft/signalr";
import { GetOldMessages } from "../../../../redux/slices/messageSlice";

function MessagesPanel() {
  const { t: tText } = useTranslation("text");
  const { t: tInput } = useTranslation("input");
  const dispatch = useDispatch();

  const messagesEndRef = useRef(null);

  const [imgError, setImgError] = useState(false);
  const { chattingEvent, oldMessages } = useSelector((store) => store.message);
  const { myProfile } = useSelector((store) => store.account);

  const [connection, setConnection] = useState(null);

  const userId = Number(localStorage.getItem("UserId"));
  const eventId = chattingEvent?.eventId;
  const userName = myProfile?.myProfile?.userName;
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");

  const previousEventId = useRef(null);

  useEffect(() => {
    if (oldMessages.length > 0) {
      setChatMessages([]);
      setChatMessages((prev) => [
        ...prev,
        ...oldMessages.map((m) => ({
          sender: m.userName,
          message: m.content,
        })),
      ]);
    }
  }, [oldMessages]);

  useEffect(() => {
    setChatMessages([]);
    dispatch(GetOldMessages(eventId));
  }, [eventId]);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7126/chat")
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    return () => {
      newConnection.stop();
    };
  }, []);

  // 3. eventId değiştiğinde eski gruptan çık, yenisine katıl
  useEffect(() => {
    if (!connection || !eventId || !userId) return;

    const setupConnection = async () => {
      try {
        if (connection.state !== "Connected") {
          await connection.start();
          console.log("SignalR bağlantısı kuruldu");
        }

        // Dinleyici EKLE
        connection.off("ReceiveGroupMessage");
        connection.on("ReceiveGroupMessage", (payload) => {
          setChatMessages((prev) => [
            ...prev,
            { sender: payload.sender, message: payload.message },
          ]);
        });

        // Gruba KATIL
        await connection.invoke("JoinEventGroup", eventId);
        console.log(`Event-${eventId} grubuna katılındı`);
      } catch (err) {
        console.error("Bağlantı kurulamadı veya gruba katılma hatası:", err);
      }
    };

    setupConnection();

    // Bağlantı tekrar kurulursa bu da çalışsın
    connection.onreconnected(async () => {
      console.log("Yeniden bağlandı. Gruba tekrar katılıyor...");
      try {
        await connection.invoke("JoinEventGroup", eventId);

        connection.off("ReceiveGroupMessage");
        connection.on("ReceiveGroupMessage", (payload) => {
          setChatMessages((prev) => [
            ...prev,
            { sender: payload.sender, message: payload.message },
          ]);
        });

        console.log("Gruba tekrar katıldı ve dinleyici eklendi.");
      } catch (err) {
        console.error("Reconnect sonrası gruba katılamadı:", err);
      }
    });

    return () => {
      connection.off("ReceiveGroupMessage");
      connection.off("onreconnected");
    };
  }, [connection, eventId, userId]);

  // 4. Mesaj gönderme fonksiyonu
  const SendMessage = async () => {
    if (!connection || connection.state !== "Connected") {
      console.warn("SignalR bağlantısı hazır değil.");
      return;
    }

    if (!message.trim()) return;

    await connection.invoke(
      "SendMessageToEventGroup",
      eventId,
      userId,
      userName,
      message
    );
    console.log("Mesaj gönderme başarılı");
    setMessage("");
  };

  //EYni Mesajlarda Scroll Indirme
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

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
              />
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

      <div className="m-panel-messages-phase">
        {chatMessages &&
          chatMessages.map((m, i) => (
            <div
              key={i}
              className={
                m.sender == userName
                  ? "flex-column-align-end-justify-start"
                  : "flex-column-align-justify-start"
              }
            >
              <div className="m-panel-message-card">
                <b>{m.sender}</b>
                <div>{m.message}</div>
              </div>
            </div>
          ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="m-panel-input-phase flex-row">
        <TextField
          sx={{ width: "95%" }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          placeholder={tInput("writeMessage")}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment>
                  <IconButton size="large" onClick={SendMessage}>
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") SendMessage();
          }}
        />
      </div>
    </div>
  );
}

export default MessagesPanel;
