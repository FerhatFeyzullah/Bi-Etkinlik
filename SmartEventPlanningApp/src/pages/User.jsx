import React, { useEffect, useState } from "react";
import "../css/User/User.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DiscoveryPanel from "../components/User/Panels/Discovery/DiscoveryPanel";
import RecommendedPanel from "../components/User/Panels/Recommended/RecommendedPanel";
import CreateAndEditPanel from "../components/User/Panels/CreateEvent/CreateAndEditPanel";
import MessagesPanel from "../components/User/Panels/MessagesPanel";
import NotificationPanel from "../components/User/Panels/NotificationPanel";
import ProfilePanel from "../components/User/Panels/Profile/ProfilePanel";
import DiscoveryFilterPanel from "../components/User/Panels/Discovery/DiscoveryFilterPanel";
import { useDispatch, useSelector } from "react-redux";
import { GetUserSetting } from "../redux/slices/userSettingSlice";
import { useNavigate, useParams } from "react-router-dom";
import ReviewMapPanel from "../components/User/Panels/ReviewMapPanel";
import LogoutIcon from "@mui/icons-material/Logout";
import EditableEventsPanel from "../components/User/Panels/CreateEvent/EditableEventsPanel";
import { blue } from "@mui/material/colors";
import { GetAllCategory } from "../redux/slices/categorySlice";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Forum from "@mui/icons-material/Forum";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import {
  SetDiscoveryLatitude,
  SetDiscoveryLongitude,
} from "../redux/slices/mapSlice";
import { Button } from "@mui/material";
import { LogoutFromSystem } from "../redux/slices/authSlice";

function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  var { userId } = useParams();

  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const FirstOp = (id) => {
    dispatch(GetUserSetting(id));
    dispatch(GetAllCategory());
  };

  useEffect(() => {
    FirstOp(userId);
  }, []);

  useEffect(() => {
    dispatch(SetDiscoveryLatitude(""));
    dispatch(SetDiscoveryLongitude(""));
  }, [selectedTab]);

  const SignOut = async () => {
    try {
      await dispatch(LogoutFromSystem()).unwrap();
      localStorage.clear();
      dispatch({ type: "auth/logout" });
      navigate("/girisyap");
    } catch (error) {
      console.error("Çıkış başarısız:", error);
    }
  };

  return (
    <div className="user-container">
      <div className="user-tab-panel">
        <div className="user-app-title">Bi Etkinlik</div>
        <div
          className="flex-column-justify-space-between"
          style={{ height: "800px" }}
        >
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
              icon={<TravelExploreIcon />}
              iconPosition="start"
              sx={{
                textTransform: "none",
                alignItems: "center", // Yine de center yapıp
                justifyContent: "flex-start",
                fontWeight: "bold",
                fontSize: "15px",
                paddingY: "15px", // Yani top ve bottom padding'i azalt
                minHeight: "unset",
              }}
            />
            <Tab
              label="Önerilenler"
              icon={<ThumbUpIcon />}
              iconPosition="start"
              sx={{
                textTransform: "none",
                alignItems: "center", // Yine de center yapıp
                justifyContent: "flex-start",
                fontWeight: "bold",
                fontSize: "15px",
                paddingY: "15px", // Yani top ve bottom padding'i azalt
                minHeight: "unset",
              }}
            />
            <Tab
              label="Oluştur / Düzenle"
              icon={<EditNoteIcon />}
              iconPosition="start"
              sx={{
                textTransform: "none",
                alignItems: "center", // Yine de center yapıp
                justifyContent: "flex-start",
                fontWeight: "bold",
                fontSize: "15px",
                paddingY: "15px", // Yani top ve bottom padding'i azalt
                minHeight: "unset",
              }}
            />
            <Tab
              label="Mesajlar"
              icon={<Forum />}
              iconPosition="start"
              sx={{
                textTransform: "none",
                alignItems: "center", // Yine de center yapıp
                justifyContent: "flex-start",
                fontWeight: "bold",
                fontSize: "15px",
                paddingY: "15px", // Yani top ve bottom padding'i azalt
                minHeight: "unset",
              }}
            />
            <Tab
              label="Bildirimler"
              icon={<NotificationsIcon />}
              iconPosition="start"
              sx={{
                textTransform: "none",
                alignItems: "center", // Yine de center yapıp
                justifyContent: "flex-start",
                fontWeight: "bold",
                fontSize: "15px",
                paddingY: "15px", // Yani top ve bottom padding'i azalt
                minHeight: "unset",
              }}
            />
            <Tab
              label="Profil"
              icon={<PersonIcon />}
              iconPosition="start"
              sx={{
                textTransform: "none",
                alignItems: "center", // Yine de center yapıp
                justifyContent: "flex-start",
                fontWeight: "bold",
                fontSize: "15px",
                paddingY: "15px", // Yani top ve bottom padding'i azalt
                minHeight: "unset",
              }}
            />
          </Tabs>
          <div style={{ padding: "16px" }}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<LogoutIcon />}
              fullWidth
              sx={{ width: "250px" }}
              onClick={SignOut}
            >
              Çıkış Yap
            </Button>
          </div>
        </div>
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
      {selectedTab === 5 && (
        <div className="flex-row" style={{ width: "100%" }}>
          <ProfilePanel />
        </div>
      )}
    </div>
  );
}

export default User;
