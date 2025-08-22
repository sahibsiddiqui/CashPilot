import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = ({ user }) => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  
  const logout = async () => {
    await signOut();
    navigate('/');
  };

  // issue remains- user's details arent being displayed
  return (
    <aside className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
      <div className="space-y-4 text-center">
        <img src={user.avatar} alt="avatar" className="w-16 h-16 rounded-full mx-auto" />
        <h3 className="font-semibold">{user.name}</h3>
        <p className="text-sm text-gray-500">{user.email}</p>
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