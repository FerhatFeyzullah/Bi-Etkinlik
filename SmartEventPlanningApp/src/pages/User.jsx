import React, { useEffect, useState } from "react";
import "../css/User/User.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DiscoveryPanel from "../components/User/Panels/Discovery/DiscoveryPanel";
import RecommendedPanel from "../components/User/Panels/Recommended/RecommendedPanel";
import CreateAndEditPanel from "../components/User/Panels/CreateEvent/CreateAndEditPanel";
import MessagesPanel from "../components/User/Panels/Message/MessagesPanel";
import ArchivePanel from '../components/User/Panels/Archive/ArchivePanel'
import ProfilePanel from "../components/User/Panels/Profile/ProfilePanel";
import DiscoveryFilterPanel from "../components/User/Panels/Discovery/DiscoveryFilterPanel";
import DiscoveryFilterFab from "../components/User/Panels/Discovery/DiscoveryFilterFab";
import { useDispatch, useSelector } from "react-redux";
import { GetUserSetting } from "../redux/slices/userSettingSlice";
import { useNavigate, useParams } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import EditableEventsPanel from "../components/User/Panels/CreateEvent/EditableEventsPanel";
import { GetAllCategory } from "../redux/slices/categorySlice";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Forum from "@mui/icons-material/Forum";
import { RiArchive2Fill } from "react-icons/ri";
import PersonIcon from "@mui/icons-material/Person";
import {
  SetDiscoveryLatitude,
  SetDiscoveryLongitude,
} from "../redux/slices/mapSlice";
import { Button, useMediaQuery } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import { LogoutFromSystem } from "../redux/slices/authSlice";
import { useTranslation } from "react-i18next";
import EventChatGroupsPanel from "../components/User/Panels/Message/EventChatGroupsPanel";
import { GetMyProfile } from "../redux/slices/accountSlice";
import ArchiveNavbar from "../components/User/Panels/Archive/ArchiveNavbar";

function User() {
  const { t: tButton } = useTranslation("button");
  const { i18n } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  var { userId } = useParams();

  const [selectedTab, setSelectedTab] = useState(0);

  // Dar ekran (<768px): sol sidebar gizlenir, yerine alt navigasyon barı gelir.
  const isMobile = useMediaQuery("(max-width:767.98px)");

  // Alt bardaki 6 sekmenin sığması için ikon/etiketleri küçültür.
  const bottomNavActionSx = {
    minWidth: 0,
    px: 0.5,
    "& .MuiSvgIcon-root": { fontSize: 20 },
    "& .MuiBottomNavigationAction-label": { fontSize: "0.6rem", lineHeight: 1.1 },
    "& .MuiBottomNavigationAction-label.Mui-selected": { fontSize: "0.6rem" },
  };

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const FirstOp = (id) => {
    dispatch(GetUserSetting(id));
    dispatch(GetMyProfile(id));
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
      i18n.changeLanguage("tr")
      navigate("/girisyap");
    } catch (error) {
      console.error("Çıkış başarısız:", error);
    }
  };

  return (
    <div
      className={isMobile ? "user-container user-container--mobile" : "user-container"}
    >
      {!isMobile && (
        <div className="user-tab-panel">
        <div className="user-app-title" onClick={() => setSelectedTab(0)}>Bi Etkinlik</div>
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
              width: "100%"
            }}
          >
            <Tab
              label={tButton("discoveryTab")}
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
              label={tButton("recommendedTab")}
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
              label={tButton("createTab")}
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
              label={tButton("messageTab")}
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
              label={tButton("archiveTab")}
              icon={<RiArchive2Fill size={24} />}
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
              label={tButton("profileTab")}
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
              {tButton("signOut")}
            </Button>
          </div>
        </div>
        </div>
      )}

      {/* Mobil üst başlık çubuğu (top bar) — tüm sekmelerde üstte sabit, kaymaz */}
      {isMobile && (
        <div className="user-topbar">
          <div
            className="user-topbar-title"
            role="button"
            onClick={() => setSelectedTab(0)}
          >
            Bi Etkinlik
          </div>
        </div>
      )}

      {/* Tek dikey kayan bölge — app-shell'in orta alanı (mobilde .user-content stilleri devreye girer) */}
      <div className="user-content">
      {selectedTab === 0 && (
        <div
          className="flex-row"
          style={{ width: "100%", height: "100%" }}
        >
          <div style={{ width: isMobile ? "100%" : "80%" }}>
            <DiscoveryPanel />
          </div>
          {!isMobile && (
            <div style={{ width: "20%" }}>
              <DiscoveryFilterPanel />
            </div>
          )}

        </div>
      )}
      {selectedTab === 1 && (
        <div
          className="flex-row"
          style={{ width: "100%", height: "100%" }}
        >
          <RecommendedPanel />
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
      {selectedTab === 3 && (
        <div
          className="flex-row-justify-start"
          style={{ width: "100%", height: isMobile ? "auto" : "100vh" }}
        >
          <MessagesPanel />
          <EventChatGroupsPanel />
        </div>
      )}
      {selectedTab === 4 &&
        <div style={{ width: "100%", height: isMobile ? "auto" : "100vh" }}>
          <ArchiveNavbar />
          <ArchivePanel />
        </div>

      }
      {selectedTab === 5 && (
        <div className="flex-row" style={{ width: "100%" }}>
          <ProfilePanel />
        </div>
      )}
      </div>

      {isMobile && (
        <Paper
          className="user-bottom-nav"
          elevation={3}
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1100 }}
        >
          <BottomNavigation
            value={selectedTab}
            onChange={handleChange}
            showLabels
            sx={{ height: 60 }}
          >
            <BottomNavigationAction
              label={tButton("discoveryTab")}
              icon={<TravelExploreIcon />}
              sx={bottomNavActionSx}
            />
            <BottomNavigationAction
              label={tButton("recommendedTab")}
              icon={<ThumbUpIcon />}
              sx={bottomNavActionSx}
            />
            <BottomNavigationAction
              label={tButton("create")}
              icon={<EditNoteIcon />}
              sx={bottomNavActionSx}
            />
            <BottomNavigationAction
              label={tButton("messageTab")}
              icon={<Forum />}
              sx={bottomNavActionSx}
            />
            <BottomNavigationAction
              label={tButton("archiveTab")}
              icon={<RiArchive2Fill size={20} />}
              sx={bottomNavActionSx}
            />
            <BottomNavigationAction
              label={tButton("profileTab")}
              icon={<PersonIcon />}
              sx={bottomNavActionSx}
            />
          </BottomNavigation>
        </Paper>
      )}

      {/* Mobilde yalnızca Keşfet'te: sağ filtre paneli yerine FAB + modal */}
      {isMobile && selectedTab === 0 && <DiscoveryFilterFab />}
    </div>
  );
}

export default User;
