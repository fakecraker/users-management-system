import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserService from "../service/UserService";

const RequireAdmin = () => {
  return UserService.isAdmin() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAdmin;
