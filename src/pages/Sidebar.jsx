// src/pages/Sidebar.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaUser } from "react-icons/fa";
import { MdOnlinePrediction } from "react-icons/md";
import { LuBotMessageSquare } from "react-icons/lu";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: FaHome, label: "Dashboard", path: "/app" },
    { icon: FaUser, label: "Profile", path: "/app/profile" },
    { icon: MdOnlinePrediction, label: "Predictions", path: "/app/predictions" },
    { icon: LuBotMessageSquare, label: "Notifications", path: "/app/notifications" },
  ];

  return (
    <motion.div
      initial={{ width: 60 }}
      animate={{ width: isOpen ? 240 : 60 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="bg-gray-900 h-screen text-white flex flex-col overflow-hidden"
    >
      {/* Toggle Button - Always centered */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="p-4 hover:bg-gray-800 transition-colors flex items-center"
      >
        <FaBars size={20} />
      </button>

      {/* Menu Items */}
      <nav className="flex-1 mt-4 flex flex-col">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={index}
              to={item.path}
              end={item.path === "/app"}
              className={({ isActive }) =>
                `flex items-center p-4 hover:bg-gray-800 transition-colors ${
                  isActive ? "bg-gray-800" : ""
                } ${isOpen ? "justify-start" : "justify-center"}`
              }
            >
              {/* Icon - Always visible and centered when sidebar is compact */}
              <div className={`${isOpen ? "w-6 flex justify-center" : "flex justify-center"}`}>
                <Icon size={20} />
              </div>

              {/* Label - Only visible when expanded */}
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm font-medium whitespace-nowrap ml-4"
                >
                  {item.label}
                </motion.span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className={`p-4 border-t border-gray-800 flex items-center ${isOpen ? "justify-start" : "justify-center"}`}>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0" />
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="ml-4"
          >
            <p className="text-sm font-medium whitespace-nowrap">John Doe</p>
            <p className="text-xs text-gray-400 whitespace-nowrap">Admin</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}