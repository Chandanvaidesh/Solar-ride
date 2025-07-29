import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Map from "./Map";
import {
  MapPin,
  Timer,
  MoveRight,
  BatteryFull,
  Power,
  Satellite,
  ShieldCheck,
  Bell,
  AlertCircle,
  PhoneCall,
  PowerOff,
} from "lucide-react";

const Dashboard = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [rideDuration, setRideDuration] = useState(0);

  const navigate = useNavigate();

  const handleUnlock = () => {
    setIsUnlocked(true);
    setShowBanner(true);
    setStartTime(Date.now());
  };

  const handleEndRide = () => {
    setIsUnlocked(false);
    setStartTime(null);
    setRideDuration(0);
    navigate("/end-ride-summary"); // redirect to summary page
  };

  useEffect(() => {
    let timer;
    if (isUnlocked && startTime) {
      timer = setInterval(() => {
        setRideDuration(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isUnlocked, startTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-800">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Unlock Banner */}
        {isUnlocked && showBanner && (
          <div className="bg-green-200 border-4 border-green-600 text-green-900 p-6 rounded-2xl text-center relative shadow-xl animate-pulse">
            <h2 className="text-2xl font-bold mb-2">🎉 Ride Unlocked! 🎉</h2>
            <p className="text-lg">Enjoy your ride. Stay safe and have fun!</p>
            <button
              onClick={() => setShowBanner(false)}
              className="absolute top-2 right-4 text-2xl text-green-900 font-bold hover:text-red-600 transition"
            >
              ✖
            </button>
          </div>
        )}

        {/* Unlock Button */}
        {!isUnlocked && (
          <div className="flex justify-center">
            <button
              onClick={handleUnlock}
              className="bg-green-600 text-white px-6 py-3 rounded-full shadow hover:bg-green-700 transition"
            >
              Unlock & Start Ride
            </button>
          </div>
        )}

        {/* Ride Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-md">
            <Timer className="text-blue-500 mb-2" />
            <p className="font-semibold">Ride Timer</p>
            <p>{formatTime(rideDuration)}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md">
            <MoveRight className="text-indigo-500 mb-2" />
            <p className="font-semibold">Distance</p>
            <p>{isUnlocked ? "1.2 km" : "0.0 km"}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md">
            <Satellite className="text-purple-500 mb-2" />
            <p className="font-semibold">Speed</p>
            <p>{isUnlocked ? "15 km/h" : "0 km/h"}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md">
            <Power className="text-yellow-500 mb-2" />
            <p className="font-semibold">Solar Input</p>
            <p>18W</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md">
            <BatteryFull className="text-green-600 mb-2" />
            <p className="font-semibold">Battery</p>
            <p>85%</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md">
            <MapPin className="text-red-400 mb-2" />
            <p className="font-semibold">Location</p>
            <p>📍 Lat: 12.9, Lon: 77.5</p>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white p-4 rounded-xl shadow-md h-80 mt-4">
          <p className="font-semibold mb-2">GPS Map View</p>
          <div className="w-full h-full rounded mb-3 mt-2 overflow-hidden">
            <Map />
          </div>
        </div>

        {/* Alerts and Controls */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded-xl shadow-md">
            <AlertCircle className="text-red-600 mb-2" />
            <p className="font-semibold">Low Battery Alert</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md">
            <Bell className="text-orange-500 mb-2" />
            <p className="font-semibold">Geo-Fence Alert</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md">
            <ShieldCheck className="text-blue-600 mb-2" />
            <p className="font-semibold">Obstacle Detected</p>
          </div>
        </div>

        {/* Emergency */}
        <div className="mt-6 text-center">
          <button className="bg-red-600 text-white px-6 py-3 rounded-full shadow hover:bg-red-700 transition flex items-center justify-center gap-2 mx-auto">
            <PhoneCall className="w-5 h-5" />
            Emergency SOS
          </button>
        </div>

        {/* Footer Controls */}
        {isUnlocked && (
          <div className="fixed bottom-4 right-4">
            <button
              onClick={handleEndRide}
              className="bg-gray-800 text-white px-4 py-2 rounded-full shadow hover:bg-gray-700 flex items-center gap-2"
            >
              <PowerOff className="w-4 h-4" />
              End Ride
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 