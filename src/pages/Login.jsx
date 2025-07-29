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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Solaride Login</h2>
        <p className="text-gray-500 mb-6">Sign in with Google to continue</p>
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
