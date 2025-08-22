import React from "react";
import { useParams } from "react-router-dom";
import AdminNavbar from "../components/Admin/AdminNavbar";
import EventStatusPanel from "../components/Admin/EventStatusPanel";

function Admin() {
  const { userId } = useParams();
  return (
    <div style={{ height: "100vh" }}>
      <div style={{ height: "10%" }}>
        <AdminNavbar />
      </div>

      <div className="flex-column-justify-start" style={{ height: "90%" }}>
        <EventStatusPanel />
      </div>
    </div>
  )
}

export default Admin;
