// src/components/MobileBottomNav.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const MobileBottomNav = () => (
  <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-sm mobile-bottom-safe">
    <div className="max-w-3xl mx-auto px-4 py-2 flex items-center justify-between">
      <Link to="/dashboard" className="flex-1 text-center py-2">
        <div className="text-gray-700">🏠</div>
        <div className="text-xs text-gray-600">Home</div>
      </Link>
      <Link to="/add" className="flex-1 text-center py-2">
        <div className="text-indigo-600">＋</div>
        <div className="text-xs text-gray-600">Add</div>
      </Link>
      <Link to="/all" className="flex-1 text-center py-2">
        <div className="text-gray-700">📄</div>
        <div className="text-xs text-gray-600">All</div>
      </Link>
      <Link to="/monthly" className="flex-1 text-center py-2">
        <div className="text-gray-700">📅</div>
        <div className="text-xs text-gray-600">Month</div>
      </Link>
    </div>
  </nav>
);

export default MobileBottomNav;
