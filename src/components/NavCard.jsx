import React from 'react';
import { Link } from 'react-router-dom';

const NavCard = ({ to, label, icon }) => (
  <Link
    to={to}
    className="flex flex-col items-center justify-center bg-white rounded-lg shadow p-6 hover:shadow-lg transition text-center"
  >
    <div className="text-indigo-600">{icon}</div>
    <span className="mt-2 font-medium">{label}</span>
  </Link>
);

export default NavCard;