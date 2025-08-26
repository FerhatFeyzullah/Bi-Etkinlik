import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import User from "../pages/User";
import Admin from "../pages/Admin";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import AccessDenied from '../pages/AccessDenied'
import NotFound from '../pages/NotFound'
import PrivateRoute from "./PrivateRoute";


function RouterConfig() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/girisyap" replace />} />
        <Route path="/girisyap" element={<Login />} />
        <Route path="/Kaydol" element={<Register />} />

        <Route path="/kullanici/:userId"
          element={
            <PrivateRoute allowedRoles={["User"]}>
              <User />
            </PrivateRoute>
          } />

        <Route path="/admin/:userId" element={
          <PrivateRoute allowedRoles={["Admin"]}>
            <Admin />
          </PrivateRoute>
        } />

        <Route path="/sifremiunuttum" element={<ForgotPassword />} />
        <Route path="/yetkisiz-erisim" element={<AccessDenied />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default RouterConfig;
