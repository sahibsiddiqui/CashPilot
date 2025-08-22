// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white px-4">
    <h1 className="text-4xl font-bold text-[rgba(192,202,210,1)] font-bruno">CASHPILOT</h1>
    <div className="mx-auto mt-3 w-20 h-1 bg-[#0b1220] rounded"></div>
    <h3 className="mt-8 text-2xl md:text-3xl font-serif text-[#080808]">Take Control of Your Finances</h3>
    <p className="mt-1 max-w-md text-center text-sm text-gray-400">
      Master your money — track, budget, thrive.
    </p>
    <div className="mt-8 flex space-x-4">
      <Link to="/login" className="px-6 py-3 bg-white text-gray-900 rounded-lg font-medium shadow hover:shadow-lg hover:bg-gray-400 transition">
        Login
      </Link>
      <Link to="/signup" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium shadow hover:bg-indigo-800 transition">
        SignUp
      </Link>
    </div>
    <p className="mt-6 text-xs text-gray-500">
      {/* Trusted by pilots everywhere. */} Join thousands of users taking control of their financial future
    </p>
  </div>
);

export default HomePage;

