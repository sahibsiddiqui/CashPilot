import React, { useMemo, useState } from 'react';
import { useTransactions } from '../contexts/TransactionsContext';
import { Link } from 'react-router-dom';

const monthKey = (isoDate) => {
  const d = new Date(isoDate);
  if (isNaN(d)) return 'Unknown';
  // produce year-month key that's sortable
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
};

const monthLabel = (key) => {
  if (key === 'Unknown') return 'Unknown';
  const [y, m] = key.split('-').map(Number);
  const d = new Date(y, m - 1, 1);
  return d.toLocaleString(undefined, { month: 'short', year: 'numeric' }); // e.g. "Aug 2025"
};

const formatCurrency = (n) => {
  const num = Number(n) || 0;
  return (num < 0 ? '- $' + Math.abs(num).toFixed(2) : '$' + num.toFixed(2));
};

const formatDate = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString();
  } catch {
    return iso;
  }
};

export default function MonthlyTransactionsPage() {
  const { transactions } = useTransactions();

  // group transactions by month key
  const grouped = useMemo(() => {
    return transactions.reduce((acc, tx) => {
      const key = monthKey(tx.date || tx.created_at || new Date().toISOString());
      if (!acc[key]) acc[key] = { key, items: [], total: 0, income: 0, expense: 0 };
      acc[key].items.push(tx);
      acc[key].total += Number(tx.amount) || 0;
      if (Number(tx.amount) >= 0) acc[key].income += Number(tx.amount);
      else acc[key].expense += Number(tx.amount);
      return acc;
    }, {});
  }, [transactions]);

  // sorted month keys (latest first)
  const monthKeys = useMemo(() => {
    return Object.keys(grouped)
      .sort((a, b) => (a < b ? 1 : -1)); // descending (newest first)
  }, [grouped]);

  // pick initial month (latest) or 'Unknown' if none
  const [selected, setSelected] = useState(() => (monthKeys.length ? monthKeys[0] : null));

  // make sure when grouped changes we keep a valid selected month
  React.useEffect(() => {
    if (!selected && monthKeys.length) setSelected(monthKeys[0]);
    if (selected && !monthKeys.includes(selected)) setSelected(monthKeys[0] || null);
  }, [monthKeys, selected]);

  const currentGroup = selected ? grouped[selected] : null;
  const items = currentGroup ? [...currentGroup.items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) : [];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Transactions — By Month</h2>
          <p className="text-sm text-gray-500">Select a month to view totals and transactions grouped by month.</p>
        </div>

        <div className="flex items-center space-x-3">
          <Link to="/add" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
            + Add Transaction
          </Link>
        </div>
      </div>

      <div className="mb-6 flex items-center space-x-4">
        <label className="text-sm font-medium">Month</label>
        <select
          value={selected || ''}
          onChange={(e) => setSelected(e.target.value || null)}
          className="px-3 py-2 border rounded bg-white"
        >
          {monthKeys.length === 0 && <option value="">(no transactions)</option>}
          {monthKeys.map((k) => (
            <option key={k} value={k}>
              {monthLabel(k)}
            </option>
          ))}
        </select>
        <div className="ml-4 text-sm text-gray-600">
          {selected ? `${items.length} transaction${items.length !== 1 ? 's' : ''}` : ''}
        </div>
      </div>

      {currentGroup ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <div className="text-xs text-gray-500">Net</div>
            <div className={`text-2xl font-bold ${currentGroup.total < 0 ? 'text-red-500' : 'text-green-600'}`}>
              {formatCurrency(currentGroup.total)}
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="text-xs text-gray-500">Income</div>
            <div className="text-xl font-semibold text-green-600">{formatCurrency(currentGroup.income)}</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="text-xs text-gray-500">Expenses</div>
            <div className="text-xl font-semibold text-red-500">{formatCurrency(currentGroup.expense)}</div>
          </div>
        </div>
      ) : (
        <div className="mb-6 text-gray-600">No transactions available.</div>
      )}

      {/* Transactions list */}
      <div className="bg-white rounded shadow overflow-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="text-left bg-gray-50">
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-4 py-6 text-center text-gray-500">
                  No transactions in this month.
                </td>
              </tr>
            ) : (
              items.map((tx) => (
                <tr key={tx.id} className="border-t">
                  <td className="px-4 py-3 align-top">{formatDate(tx.date)}</td>
                  <td className="px-4 py-3 align-top">{tx.description || '-'}</td>
                  <td className="px-4 py-3 align-top">
                    <span className={tx.amount < 0 ? 'text-red-500 font-semibold' : 'text-green-600 font-semibold'}>
                      {formatCurrency(tx.amount)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
