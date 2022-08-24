import React from "react";
import { Routes, Route } from "react-router-dom";
import { ChatPage } from "../src/features/chats/Pages";
import AuthPage from "./features/auth/Pages/AuthPage";
import { PrivateRoute } from "./components/Common";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<AuthPage />} />
        <Route
          path="/chats"
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
