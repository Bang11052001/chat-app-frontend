import React from "react";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "../src/features/auth/Pages";
import { PrivateRoute } from "../src/components/Common";
import { ChatPage } from "../src/features/chats/Pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
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
