import React, { useEffect, useState } from "react";
import "../css/User/User.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DiscoveryPanel from "../components/User/Panels/Discovery/DiscoveryPanel";
import RecommendedPanel from "../components/User/Panels/Recommended/RecommendedPanel";
import CreateAndEditPanel from "../components/User/Panels/CreateEvent/CreateAndEditPanel";
import MessagesPanel from "../components/User/Panels/MessagesPanel";
import NotificationPanel from "../components/User/Panels/NotificationPanel";
import ProfilePanel from "../components/User/Panels/ProfilePanel";
import DiscoveryFilterPanel from "../components/User/Panels/Discovery/DiscoveryFilterPanel";
import { useDispatch, useSelector } from "react-redux";
import { GetUserInfo } from "../redux/slices/accountSlice";
import { useParams } from "react-router-dom";
import ReviewMapPanel from "../components/User/Panels/ReviewMapPanel";
import CreateEventMapPanel from "../components/User/Panels/CreateEvent/CreateEventMapPanel";
import EditableEventsPanel from "../components/User/Panels/CreateEvent/EditableEventsPanel";
import { blue } from "@mui/material/colors";
import { GetAllCategory } from "../redux/slices/categorySlice";

function User() {
  const dispatch = useDispatch();
  var { userId } = useParams();

  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const FirstOp = (id) => {
    dispatch(GetUserInfo(id));
    dispatch(GetAllCategory());
  };

  useEffect(() => {
    FirstOp(userId);
  }, []);

  return (
    <div className="user-container">
      <div className="user-tab-panel">
        <div className="user-app-title">Bi Etkinlik</div>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="primary"
          orientation="vertical"
          sx={{
            minWidth: 300,
          }}
        >
          <Tab
            label="Keşfet"
            sx={{
              textTransform: "none",
              alignItems: "flex-start",
              fontWeight: "bold",
              fontSize: "15px",
            }}
          />
          <Tab
            label="Önerilenler"
            sx={{
              textTransform: "none",
              alignItems: "flex-start",
              fontWeight: "bold",
              fontSize: "15px",
            }}
          />
          <Tab
            label="Oluştur / Düzenle"
            sx={{
              textTransform: "none",
              alignItems: "flex-start",
              fontWeight: "bold",
              fontSize: "15px",
            }}
          />
          <Tab
            label="Mesajlar"
            sx={{
              textTransform: "none",
              alignItems: "flex-start",
              fontWeight: "bold",
              fontSize: "15px",
            }}
          />
          <Tab
            label="Bildirimler"
            sx={{
              textTransform: "none",
              alignItems: "flex-start",
              fontWeight: "bold",
              fontSize: "15px",
            }}
          />
          <Tab
            label="Profil"
            sx={{
              textTransform: "none",
              alignItems: "flex-start",
              fontWeight: "bold",
              fontSize: "15px",
            }}
          />
        </Tabs>
      </div>

      {selectedTab === 0 && (
        <div
          className="flex-row-justify-start"
          style={{ width: "100%", height: "100%" }}
        >
          <DiscoveryPanel />
          <div
            className="flex-column"
            style={{ height: "100vh", width: "100%" }}
          >
            <DiscoveryFilterPanel />
            <ReviewMapPanel />
          </div>
        </div>
      )}
      {selectedTab === 1 && (
        <div
          className="flex-row-justify-start"
          style={{ width: "100%", height: "100%" }}
        >
          <RecommendedPanel />
          <div
            className="flex-column"
            style={{ height: "100vh", width: "100%" }}
          >
            <ReviewMapPanel />
          </div>
        </div>
      )}
      {selectedTab === 2 && (
        <div className="flex-column" style={{ width: "100%" }}>
          <div className="flex-row" style={{ width: "100%" }}>
            <CreateAndEditPanel />
          </div>

          <EditableEventsPanel />
        </div>
      )}
      {selectedTab === 3 && <MessagesPanel />}
      {selectedTab === 4 && <NotificationPanel />}
      {selectedTab === 5 && <ProfilePanel />}
    </div>
  );
}

export default User;
