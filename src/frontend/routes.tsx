import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./screens/Dashboard/Dashboard";
import Calendar from "./screens/Calendar/Calendar";
import Logs from "./screens/logs/Logs";
import AuthScreen from "./screens/Auth/Login";
import NotFound from "./components/NotFound/NotFound";

const AllRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/logs" element={<Logs />} />
      <Route path="/auth" element={<AuthScreen />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllRoutes;
