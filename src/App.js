import React from "react";
import { Route, Routes } from "react-router-dom";
import { NotFound, PrivateRoute } from "./components/Common";
import MainLayout from "./components/Layout/MainLayout";
import LoginPage from "./features/auth/Pages/LoginPage";
import RegisterPage from "./features/auth/Pages/RegisterPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="register" element={<RegisterPage />}></Route>
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
