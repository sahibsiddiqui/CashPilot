import React, { useMemo, useState } from 'react';
import { useTransactions } from '../contexts/TransactionsContext';
import { Link } from 'react-router-dom';

const formatDate = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString();
  } catch {
    return iso;
  }
};

const formatCurrency = (n) => {
  const num = Number(n) || 0;
  return (num < 0 ? '-$' + Math.abs(num).toFixed(2) : '$' + num.toFixed(2));
};


export default function AllTransactionsPage() {
  const { transactions, deleteTransaction } = useTransactions();

  const [query, setQuery] = useState(''); //empty searchbox
  const [page, setPage] = useState(1); //always onepg is visible
  const pageSize = 10; // 1page: num of contents/rows
  const [sortKey, setSortKey] = useState('date'); // 'date' or 'amount'
  const [sortDir, setSortDir] = useState('desc'); // ->'asc' or 'desc'

  // Filter by search query
  const filtered = useMemo(() => {
    if (!query.trim()) return transactions;
    const q = query.trim().toLowerCase();
    return transactions.filter((t) => (t.description || '').toLowerCase().includes(q));
  }, [transactions, query]);

  // Sort filtered results
  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      if (sortKey === 'amount') {
        const va = Number(a.amount) || 0;
        const vb = Number(b.amount) || 0;
        return sortDir === 'asc' ? va - vb : vb - va;
      }
      // default: date
      const da = new Date(a.date || 0).getTime();
      const db = new Date(b.date || 0).getTime();
      return sortDir === 'asc' ? da - db : db - da;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);

  
  // totalPages OR totalPagesRequired- wtv
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize)); 
  if (page > totalPages) setPage(totalPages);

  const pageItems = sorted.slice((page - 1) * pageSize, page * pageSize); // either itll make it one less OR itll remain the same

  // Handlers
  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
    setPage(1);
  };

  const handleDelete = (id) => {
    const ok = confirm('Delete this transaction?');
    if (!ok) return;

    deleteTransaction(id);
    // if deleting causes last page to become empty, go back a page
    const newTotal = Math.max(1, Math.ceil((sorted.length - 1) / pageSize));
    if (page > newTotal) setPage(newTotal); //totalpgsreq basically
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">All Transactions</h2>
          <p className="text-sm text-gray-500">Search, sort and manage all your transactions.</p>
        </div>

        <div className="flex items-center space-x-3">
          <Link to="/add" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
            + Add Transaction
          </Link>
        </div>
      </div>

      <div className="mb-4 flex items-center space-x-3">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder="Search by description..."
          className="px-3 py-2 border rounded w-full max-w-md bg-white"
        />

        <div className="flex items-center space-x-2">
          <button
            onClick={() => toggleSort('date')}
            className="px-3 py-2 border rounded bg-white hover:shadow-sm"
          >
            Sort by Date {sortKey === 'date' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
          </button>
          <button
            onClick={() => toggleSort('amount')}
            className="px-3 py-2 border rounded bg-white hover:shadow-sm"
          >
            Sort by Amount {sortKey === 'amount' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
          </button>
        </div>
      </div>

      <div className="bg-white rounded shadow overflow-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="text-left bg-gray-50">
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-4 py-6 text-center text-gray-500">
                  No transactions found.
                </td>
              </tr>
            ) : (
              pageItems.map((tx) => (
                <tr key={tx.id} className="border-t">
                  <td className="px-4 py-3 align-top">{formatDate(tx.date)}</td>
                  <td className="px-4 py-3 align-top">{tx.description || '-'}</td>
                  <td className="px-4 py-3 align-top">
                    <span className={tx.amount < 0 ? 'text-red-500 font-semibold' : 'text-green-600 font-semibold'}>
                      {formatCurrency(tx.amount)}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <button
                      onClick={() => handleDelete(tx.id)} 
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition" //huh np but color aint coming y tho
                    >
                      Delete
                    </button> 
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, sorted.length)} of {sorted.length} {/* simplemath involved */}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <div className="px-3 py-1 border rounded">
            Page {page} / {totalPages}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
