import React from "react";
import { getCookie } from "../../utils/cookie";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLogged = getCookie("access_token");

  if (!isLogged) return <Navigate to="/" />;
  return children;
};

export default PrivateRoute;
