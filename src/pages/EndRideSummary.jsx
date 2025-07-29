import React from "react";

const EndRideSummary = () => {
  return (
    <div className="w-full min-h-screen bg-white p-6 flex flex-col items-center text-center">
      <div className="text-green-600 font-bold text-2xl mb-4">✅ Ride Completed!</div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-800">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-sm">Time</h2>
          <p className="text-lg font-semibold">18 min 45 s</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-sm">Distance</h2>
          <p className="text-lg font-semibold">4.3 km</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-sm">Avg Speed</h2>
          <p className="text-lg font-semibold">14 km/h</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <h2 className="text-sm">CO₂ Saved</h2>
          <p className="text-lg font-semibold">0.9 kg</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h2 className="text-sm">Calories</h2>
          <p className="text-lg font-semibold">230 kcal</p>
        </div>
      </div>

      <div className="mt-6 w-full max-w-md">
        <div className="bg-gray-300 h-64 w-full rounded-lg flex items-center justify-center text-gray-600">
          Map Snapshot Placeholder
        </div>
      </div>

      <button
        onClick={() => window.location.href = "/dashboard"}
        className="mt-8 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        🔁 Start New Ride
      </button>
    </div>
  );
};

export default EndRideSummary;
