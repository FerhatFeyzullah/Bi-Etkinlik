import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children, allowedRoles }) {
    try {
        const { token } = useSelector((store) => store.auth);
        const { role } = token;

        // Rol uygun mu?
        if (allowedRoles.includes(role)) {
            return children;
        } else {
            // Rol uygun değil → yetkisiz sayfa mesela veya anasayfa
            return <Navigate to="/yetkisiz-erisim" replace />;
        }
    } catch (error) {
        console.error("Token çözümleme hatası:", error);
        return <Navigate to="/yetkisiz-erisim" replace />;
    }
}

export default PrivateRoute;
