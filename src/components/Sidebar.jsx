import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  
  const logout = async () => {
    await signOut();
    navigate('/');
  };

  const displayName = user?.user_metadata?.full_name || 'User';
  const displayEmail = user?.email || '';

  // name's initials for the avatar circle
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <aside className="w-64 min-h-screen bg-white shadow-lg p-6 flex flex-col justify-between">
      <div className="space-y-4 text-center">
        <div className="w-16 h-16 rounded-full mx-auto bg-indigo-600 flex items-center justify-center text-white text-xl font-bold">
          {initials}
        </div>
        <h3 className="font-semibold">{displayName}</h3>
        <p className="text-sm text-gray-500">{displayEmail}</p>
      </div>
      <button
        onClick={logout}
        className="mt-auto w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;