import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./screens/Dashboard/Dashboard";
import Calendar from "./screens/Calendar/Calendar";
import Logs from "./screens/logs/Logs";
import AuthScreen from "./screens/Auth/Login";
import { TimerProvider } from "./context/TimerProvider";

const AllRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthScreen />} />
      <Route
        path="/"
        element={
          <TimerProvider>
            <Dashboard />
          </TimerProvider>
        }
      />
      <Route
        path="/calendar"
        element={
          <TimerProvider>
            <Calendar />
          </TimerProvider>
        }
      />
      <Route
        path="/logs"
        element={
          <TimerProvider>
            <Logs />
          </TimerProvider>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
