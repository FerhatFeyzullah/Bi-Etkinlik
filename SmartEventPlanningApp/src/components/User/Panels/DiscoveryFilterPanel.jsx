import React from "react";
import "../../../css/User/Panels/DiscoveryFilterPanel.css";
import { useDispatch } from "react-redux";

function DiscoveryFilterPanel() {
  const dispatch = useDispatch();

  return <div className="discovery-filter-container">Discovery Filter</div>;
}

export default DiscoveryFilterPanel;
