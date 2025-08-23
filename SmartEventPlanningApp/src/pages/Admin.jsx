import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminNavbar from "../components/Admin/AdminNavbar";
import EventStatusPanel from "../components/Admin/EventStatusPanel";
import { GetUserSetting } from "../redux/slices/userSettingSlice";
import { useDispatch } from "react-redux";

function Admin() {
  const { userId } = useParams();
  const dispatch = useDispatch();

  const FirstOp = (id) => {
    dispatch(GetUserSetting(id));
  };

  useEffect(() => {
    FirstOp(userId);
  }, []);

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
