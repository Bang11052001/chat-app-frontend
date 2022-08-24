import React from "react";
import { cookie } from "../../utils";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLogged = cookie.getCookie("access_token");

  if (!isLogged) return <Navigate to="/" />;
  return children;
};

export default PrivateRoute;
