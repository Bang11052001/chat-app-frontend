import React from "react";
import { cookie } from "../../utils";
import LoginPage from "../../features/auth/Pages/LoginPage";

const PrivateRoute = ({ children }) => {
  const isLogged = cookie.getCookie("access_token");

  if (!isLogged) return <LoginPage />;
  return { children };
};

export default PrivateRoute;
