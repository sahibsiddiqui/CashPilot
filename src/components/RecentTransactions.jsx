import React from 'react';

const formatCurrency = (n) => {
  const num = Number(n) || 0;
  return (num < 0 ? '-$' + Math.abs(num).toFixed(2) : '$' + num.toFixed(2));
};

const formatDate = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString();
  } catch {
    return iso;
  }
};

// const RecentTransactions = ({ list = [] }) => (
//   <div className="bg-white rounded-lg shadow p-6">
//     <h2 className="text-sm text-gray-500">Recent Transactions</h2>
//     <ul className="mt-4 space-y-2 max-h-48 overflow-y-auto">
//       {list.map((tx) => (
//         <li key={tx.id} className="flex justify-between">
//           <span>{tx.description+" "}</span>
//           <span className={`font-semibold ${tx.amount < 0 ? 'text-red-500' : 'text-green-600'}`}>
//             {Number(tx.amount) < 0 ? '-$' + Math.abs(Number(tx.amount)).toFixed(2) : '$' + Number(tx.amount).toFixed(2)}
//           </span>
//         </li>
//       ))}
//     </ul>
//   </div>
// );

// export default RecentTransactions;

const RecentTransactions = ({ list = [] }) => (
  <div className="card p-6">
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-sm text-gray-500">Recent Transactions</h2>
    </div>

    <ul className="mt-2 space-y-2 recent-scroll" style={{ maxHeight: 240, overflowY: 'auto' }}>
      {list.map((tx) => (
        <li key={tx.id} className="flex items-start justify-between">
          <div>
            <div className="text-sm font-medium">{tx.description || '-'}</div>
            <div className="text-xs text-gray-500">{formatDate(tx.date)}</div>
          </div>
          <div className="text-right">
            <div className={`font-semibold ${tx.amount < 0 ? 'text-red-500' : 'text-green-600'}`}>
              {formatCurrency(tx.amount)}
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default RecentTransactions;
