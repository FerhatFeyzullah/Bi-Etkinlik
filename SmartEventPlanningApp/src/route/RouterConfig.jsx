import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import User from "../pages/User";
import Admin from "../pages/Admin";
import Register from "../pages/Register";

function RouterConfig() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/girisyap" replace />} />
        <Route path="/girisyap" element={<Login />} />
        <Route path="/Kaydol" element={<Register />} />

        <Route path="/kullanici/:userId" element={<User />} />

        <Route path="/admin/:userId" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default RouterConfig;
