// src/components/MobileBottomNav.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileBottomNav = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  const tabs = [
    { to: '/dashboard', emoji: '🏠', label: 'Home' },
    { to: '/add',       emoji: '➕', label: 'Add' },
    { to: '/all',       emoji: '📄', label: 'All' },
    { to: '/monthly',   emoji: '📅', label: 'Month' },
  ];

  return(
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-sm">
      <div className="max-w-3xl mx-auto px-4 py-2 flex items-center justify-between">
        {tabs.map(({ to, emoji, label }) => (
          <Link
            key={to}
            to={to}
            className={`flex-1 text-center py-2 transition ${isActive(to) ? 'text-indigo-600' : 'text-gray-500'}`}
          >
            <div className="text-lg">{emoji}</div>
            <div className={`text-xs ${isActive(to) ? 'font-semibold text-indigo-600' : 'text-gray-500'}`}>
              {label}
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
