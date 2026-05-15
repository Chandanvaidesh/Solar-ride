// Login.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  function handleGoogleLogin() {
    // Direct login without Google authentication
    alert("Access granted!");
    navigate('/app');
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('login-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative w-full max-w-md bg-transparent rounded-xl border border-white/20 shadow-2xl p-6 sm:p-8 lg:p-10 space-y-6 backdrop-blur-md text-white">

        {/* Logo */}
        <div className="flex justify-center items-center h-32 w-48 max-w-xs mx-auto">
          <img
            src="Solar-Ride-logo.png"
            alt="Solaride Logo"
            className="h-24 max-w-full object-contain"
          />
        </div>

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold">
            TO ENJOY THE RIDE
          </h2>

          <p className="mt-2 text-sm text-gray-200">
            Click below to continue
          </p>
        </div>

        {/* Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white/90 border border-gray-300 rounded-lg px-4 py-2 hover:bg-white/70 transition duration-200"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google logo"
            className="w-5 h-5"
          />

          <span className="text-gray-800 font-medium">
            Login
          </span>
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-300 text-center">
          By signing in, you agree to our{" "}
          <a href="#" className="text-blue-300 hover:underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-300 hover:underline">
            Privacy Policy
          </a>.
        </p>
      </div>
    </div>
  );
}