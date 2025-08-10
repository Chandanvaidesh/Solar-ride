import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EndRideSummary from "./pages/EndRideSummary";
import Map from './pages/Map';

export default function App() {
  return (
    <Router basename="/Solar-ride">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/end-ride-summary" element={<EndRideSummary />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Map" element={<Map />} />
      </Routes>
    </Router>
  );
}
