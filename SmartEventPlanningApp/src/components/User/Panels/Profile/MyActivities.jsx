import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MyRegisteredEventCard from "./MyRegisteredEventCard";
import "../../../../css/User/Panels/Profile/MyActivities.css";
import {
  GetMyCurrentEvents,
  GetMyFutureEvents,
  GetMyPastEvents,
  SetEventRegisterationDeleted,
} from "../../../../redux/slices/eventRegisterSlice";
import { useTranslation } from "react-i18next";

function MyActivities() {
  const { t: tButton } = useTranslation("button");

  const dispatch = useDispatch();
  const { myRegisteredEvents, eventRegistirationDeleted } = useSelector(
    (store) => store.eventRegister
  );

  const UserId = localStorage.getItem("UserId");
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    if (eventRegistirationDeleted === true || selectedTab !== null) {
      if (selectedTab === 0) {
        dispatch(GetMyFutureEvents(UserId));
      } else if (selectedTab === 1) {
        dispatch(GetMyCurrentEvents(UserId));
      } else if (selectedTab === 2) {
        dispatch(GetMyPastEvents(UserId));
      }
      dispatch(SetEventRegisterationDeleted(false));
    }
  }, [selectedTab, eventRegistirationDeleted]);

  return (
    <div className="my-activities-container">
      <div>
        <Box sx={{ width: "100%", margin: "0 auto" }}>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="primary"
            orientation="horizontal"
            TabIndicatorProps={{
              style: {
                backgroundColor: "#13c3cfff",
                height: "4px",
                borderRadius: "2px",
              },
            }}
            sx={{
              display: "flex",
            }}
          >
            <Tab
              label={tButton("upcomingEvents")}
              sx={{
                flex: 1,
                minWidth: 0,
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            />
            <Tab
              label={tButton("ongoingEvents")}
              sx={{
                flex: 1,
                minWidth: 0,
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            />
            <Tab
              label={tButton("completedEvents")}
              sx={{
                flex: 1,
                minWidth: 0,
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            />
          </Tabs>
        </Box>
      </div>
      <div className="my-activities-card-phase flex-row-align-justify-start">
        {myRegisteredEvents &&
          myRegisteredEvents.map((event) => (
            <MyRegisteredEventCard
              events={event}
              tabNumber={selectedTab}
              key={event.event.eventId}
            />
          ))}
      </div>
    </div>
  );
}

export default MyActivities;
