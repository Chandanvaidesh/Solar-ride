// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EndRideSummary from './pages/EndRideSummary';
import Map from './pages/Map';
import LayoutWithSidebar from './pages/LayoutWithSidebar';

export default function App() {
  return (
    <Router basename="/Solar-ride">
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />

        {/* Protected / app area: layout with sidebar */}
        <Route path="/app" element={<LayoutWithSidebar />}>
          {/* index route -> renders at /app */}
          <Route index element={<Dashboard />} />
          <Route path="end-ride-summary" element={<EndRideSummary />} />
          <Route path="map" element={<Map />} />
          {/* add other nested routes here: /app/somepage */}
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
