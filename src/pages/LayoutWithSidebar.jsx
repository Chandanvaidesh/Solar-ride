// src/layouts/LayoutWithSidebar.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Sidebar";

export default function LayoutWithSidebar() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
