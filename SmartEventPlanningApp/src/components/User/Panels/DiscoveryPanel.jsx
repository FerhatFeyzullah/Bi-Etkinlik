import React, { useEffect } from "react";
import "../../../css/User/Panels/DiscoveryPanel.css";
import { useDispatch, useSelector } from "react-redux";
import { GetE_UnFiltered } from "../../../redux/slices/discoverySlice";
import DiscoveryEventCard from "../DiscoveryEventCard";

function DiscoveryPanel() {
  const dispatch = useDispatch();
  const { discoveryEvents } = useSelector((store) => store.discovery);

  const AppUser = JSON.parse(localStorage.getItem("AppUser"));

  useEffect(() => {
    dispatch(GetE_UnFiltered(AppUser.id));
  }, []);

  useEffect(() => {
    console.log(discoveryEvents);
  }, [discoveryEvents]);

  return (
    <div className="discovery-container">
      <DiscoveryEventCard />
    </div>
  );
}

export default DiscoveryPanel;
