import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children, allowedRoles }) {
    const { token } = useSelector((store) => store.auth);
    const role = token?.role;

    // Token yok / boş → kullanıcı oturum açmamış (ör. çıkış yaptı ya da doğrudan
    // korumalı bir URL'e geldi) → yetkisiz-erisim değil, giriş ekranına yönlendir.
    if (!role) {
        return <Navigate to="/girisyap" replace />;
    }

    // Oturum açık ve rol uygun → içeriği göster.
    if (allowedRoles.includes(role)) {
        return children;
    }

    // Oturum açık ama rol uygun değil → yetkisiz erişim.
    return <Navigate to="/yetkisiz-erisim" replace />;
}

export default PrivateRoute;
