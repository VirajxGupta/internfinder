import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-hot-toast";

const ProtectedRoute = () => {
    const storedUser = localStorage.getItem("user");
    const isAuthenticated = !!storedUser;

    if (!isAuthenticated) {
        // Optionally show a toast, though sometimes it can trigger multiple times if not handled carefully
        // We'll stick to redirect for now.
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
