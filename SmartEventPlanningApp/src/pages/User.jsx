import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DiscoveryPanel from "../components/User/DiscoveryPanel";
import RecommendedPanel from "../components/User/RecommendedPanel";
import CreateEventPanel from "../components/User/CreateEventPanel";
import MessagesPanel from "../components/User/MessagesPanel";
import NotificationPanel from "../components/User/NotificationPanel";
import ProfilePanel from "../components/User/ProfilePanel";

function User() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className="flex-row">
      <div>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="primary"
          orientation="vertical"
          sx={{
            borderRight: "2px solid black", // net ve siyah
            minWidth: 150,
          }}
        >
          <Tab
            label="Ana Sayfa"
            sx={{ textTransform: "none", alignItems: "flex-start" }}
          />
          <Tab
            label="Önerilenler"
            sx={{ textTransform: "none", alignItems: "flex-start" }}
          />
          <Tab
            label="Oluştur"
            sx={{ textTransform: "none", alignItems: "flex-start" }}
          />
          <Tab
            label="Mesajlar"
            sx={{ textTransform: "none", alignItems: "flex-start" }}
          />
          <Tab
            label="Bildirimler"
            sx={{ textTransform: "none", alignItems: "flex-start" }}
          />
          <Tab
            label="Profil"
            sx={{ textTransform: "none", alignItems: "flex-start" }}
          />
        </Tabs>
      </div>
      <div style={{ marginLeft: "30px" }}>
        {selectedTab === 0 && <DiscoveryPanel />}
        {selectedTab === 1 && <RecommendedPanel />}
        {selectedTab === 2 && <CreateEventPanel />}
        {selectedTab === 3 && <MessagesPanel />}
        {selectedTab === 4 && <NotificationPanel />}
        {selectedTab === 5 && <ProfilePanel />}
      </div>
    </div>
  );
}

export default User;
