// src/components/BalanceCard.jsx
import React from 'react';

const formatCurrency = (n) => {
  const num = Number(n) || 0;
  return (num < 0 ? '-$' + Math.abs(num).toFixed(2) : '$' + num.toFixed(2));
};

const BalanceCard = ({ balance }) => (
  <div className="card p-6 flex flex-col justify-between">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-sm text-gray-500">Current Balance</h2>
        <p className="mt-2 text-3xl font-bold">{formatCurrency(balance)}</p>
      </div>
    </div>
    <p className="mt-4 text-sm text-gray-500">Updated just now</p>
  </div>
);

export default BalanceCard;
