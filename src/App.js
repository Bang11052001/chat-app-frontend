import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { NotFound, PrivateRoute } from "./components/Common";
import MainLayout from "./components/Layout/MainLayout";
import LoginPage from "./features/auth/Pages/LoginPage";
import RegisterPage from "./features/auth/Pages/RegisterPage";
import { getCookie } from "./utils/cookie";

function App() {
  const isLogged = getCookie("access_token");
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={isLogged ? <Navigate to="/chats" /> : <LoginPage />}
        ></Route>
        <Route
          path="register"
          element={isLogged ? <Navigate to="/chats" /> : <RegisterPage />}
        ></Route>
        <Route
          path="/chats"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        ></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
