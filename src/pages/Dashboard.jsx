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
  const [status, setStatus] = useState("Ready");

  const navigate = useNavigate();

  const handleUnlock = () => {
    setIsUnlocked(true);
    setShowBanner(true);
    setStatus("On-Ride")
    setStartTime(Date.now());
  };

  const handleEndRide = () => {
    setIsUnlocked(false);
    setStartTime(null);
    setRideDuration(0);
    setStatus("Ready")
    navigate("/end-ride-summary");
  };

  const HandleEmergencyCall=()=>{
    const phoneNumber = "+917026360543";
    const link = document.createElement("a");
    link.href = 'tel:${phoneNumber}';
    link.click();
  }

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
    <div className="min-h-screen bg-amber-100/2 p-6 text-gray-800">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Unlock Banner */}
        {isUnlocked && showBanner && (
          <div className="fixed flex inset-0 z-50 items-center justify-center bg-black/50">
            <div className="relative w-80 h-80 bg-green-200 border-4 border-green-600 text-green-900 p-6 rounded-2xl text-center shadow-xl transform transition duration-200 ease-out scale-100 opacity-100">
              <h2 className="text-2xl font-bold mb-2">🎉 Ride Unlocked! 🎉</h2>
              <p className="text-lg">Enjoy your ride. Stay safe and have fun!</p>
              <video
                src="unlock.mp4"
                autoPlay
                loop
                muted
                className="w-full h-40 object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setShowBanner(false)}
                className="absolute top-2 right-4 text-2xl text-green-900 font-bold hover:text-red-600 transition"
              >
                ✖
              </button>
            </div>
          </div>
        )}




        {/* Hero Section (button BELOW poster inside the left column) */}
        <div className="w-full rounded-xl overflow-hidden shadow-lg bg-gradient-to-r from-green-100 via-yellow-50 to-white p-6 flex flex-col md:flex-row items-center gap-6">
          {/* Poster column: stack image + button */}
          <div className="flex-shrink-0 flex flex-col items-center gap-4">
            <img
              src="kk.jpg"
              alt="Solar Ride Poster"
              className="w-40 h-40 md:w-56 md:h-56 rounded-xl object-cover"
              loading="lazy"
            />

            {!isUnlocked && (
              <button
                type="button"
                onClick={handleUnlock}
                aria-label="Unlock and start ride"
                className="bg-green-600 text-white px-5 py-2 rounded-full shadow hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
              >
                Unlock & Start Ride
              </button>
            )}
          </div>

          {/* Hero Text */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800">Welcome to Solar Ride Dashboard</h1>
            <p className="text-gray-600 mt-2 text-lg">
              Monitor your ride stats, battery status, and solar input — all in one place.
            </p>
            <div className="flex gap-x-4 flex-col md:flex-row gap-4 p-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 w-40 h-30 flex flex-col p-4 space-y-2 justify-center items-center rounded-xl shadow-md transform transition duration-200 ease-out hover:scale-105 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2">
                <Timer className="text-blue-500 mb-2" />
                <p className="font-semibold">Ride Timer</p>
                <p>{formatTime(rideDuration)}</p>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 w-40 h-30 flex flex-col p-4 space-y-2 rounded-xl justify-center items-center shadow-md transform transition duration-200 ease-out hover:scale-105 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" strokewidth="3" stroke="green" class="size-6">
                  <path strokeLinecap="round" strokelinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

                <p className="font-semibold text-blac-600"> Status</p>
                <p>{status}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 rounded-xl gap-2 p-4 bg-gradient-to-r from-green-100 via-yellow-50 to-white">
        {/* Ride Metrics */}
        <div className="grid grid-cols-2 grid-rows-2 gap-4">

          <div className="bg-white p-4 rounded-xl shadow-md min-h-28 flex flex-col justify-center items-center transform transition duration-200 ease-out hover:scale-105 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ">
             <div className="p-3 rounded-full bg-indigo-100 mb-2">
            <MoveRight className="text-indigo-500 " />
            </div>
            <p className="font-semibold">Distance</p>
            <p>{isUnlocked ? "1.2 km" : "0.0 km"}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md min-h-28 flex flex-col justify-center items-center transform transition duration-200 ease-out hover:scale-105 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ">
            <div className="p-3 rounded-full bg-indigo-100 mb-2">
            <Satellite className="text-purple-500 mb-2" />
            </div>
            <p className="font-semibold">Speed</p>
            <p>{isUnlocked ? "15 km/h" : "0 km/h"}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md min-h-28 flex flex-col justify-center items-center transform transition duration-200 ease-out hover:scale-105 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2">
            <div className="p-3 rounded-full bg-indigo-100 mb-2">
            <Power className="text-yellow-500 mb-2" />
            </div>
            <p className="font-semibold">Solar Input</p>
            <p>18W</p>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-md min-h-28 flex flex-col justify-center items-center transform transition duration-200 ease-out hover:scale-105 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2">
            <div className="p-3 rounded-full bg-indigo-100 mb-2">
            <MapPin className="text-red-400 mb-2" />
            </div>
            <p className="font-semibold">Location</p>
            <p>📍Lat: 12.9, Lon: 77.5</p>
          </div>

        </div>

        {/* Map Section */}
        <div className="bg-white p-4 rounded-xl shadow-md h-80 z-0">
          <p className="font-semibold mb-2">GPS Map View</p>
          <div className="w-full  h-60 rounded mb-3 mt-2 overflow-hidden">
            <Map />
          </div>
        </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-white p-4 rounded-xl shadow-md">
            <BatteryFull className="text-green-600 " />
            <p className="font-semibold">Battery</p>
            <p className="text-lg font-bold text-green-600">85%</p>
            <div role="progressbar" aria-valuemin={0} aria-valuemax={100} className="w-full bg-gray-200 h-2 rounded-full mt-3">
              <div className="h-2 bg-green-500 rounded-full" style={{width:"85%"}}></div>
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
          <button onClick={HandleEmergencyCall} className="bg-red-600 text-white px-6 py-3 rounded-full shadow hover:bg-red-700 transition flex items-center justify-center gap-2 mx-auto">
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