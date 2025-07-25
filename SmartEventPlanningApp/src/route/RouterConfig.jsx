import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";

function RouterConfig() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="girisyap" replace />} />
        <Route path="girisyap" element={<Login />} />
      </Routes>
    </div>
  );
}

export default RouterConfig;
