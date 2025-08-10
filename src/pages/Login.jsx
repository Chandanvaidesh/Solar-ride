import React from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

// Firebase config (unchanged)
const firebaseConfig = {
  apiKey: "AIzaSyByYExKceEIriZiJjUHsTCYMIB93vNnwRE",
  authDomain: "solarride-login.firebaseapp.com",
  projectId: "solarride-login",
  storageBucket: "solarride-login.firebasestorage.app",
  messagingSenderId: "596935985769",
  appId: "1:596935985769:web:29875016c4af230629b0f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export default function Login() {
  const navigate = useNavigate();

  async function handleGoogleLogin() {
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;

      const q = query(collection(db, 'allowedUsers'), where('email', '==', email));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        alert('Access granted!');
        navigate('/dashboard');
      } else {
        alert('Access denied!');
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center px-4" 
    style={{backgroundImage: "url('login-bg.jpg')"}}>
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
          <h2 className="text-3xl font-semibold text-shadow-orange-800">TO ENJOY THE RIDE</h2>
          <p className="mt-2 text-sm text-gray-200">
            Continue with your institutional Google account
          </p>
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white/90 border border-gray-300 rounded-lg px-4 py-2 hover:bg-white/70 transition duration-200"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google logo"
            className="w-5 h-5 "
          />
          <span className="text-gray-800 font-medium bg-white/20 rounded ">Sign in with Google</span>
        </button>

        {/* Divider */}
        

        {/* Footer note */}
        <p className="text-xs text-gray-300 text-center">
          By signing in, you agree to our{" "}
          <a href="#" className="text-blue-300 hover:underline">Terms</a> and{" "}
          <a href="#" className="text-blue-300 hover:underline">Privacy Policy</a>.
        </p>
      </div>
      
    </div>
  );
}
