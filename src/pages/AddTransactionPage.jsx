import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransactions } from '../contexts/TransactionsContext';

const AddTransactionPage = () => {
  const navigate = useNavigate();
  const { addTransaction } = useTransactions();

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(''); // keeping as string, for input
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim() || amount === '') {
      alert('Please enter description and amount');
      return;
    }
    const parsed = Number(amount);
    if (Number.isNaN(parsed)) {
      alert('Amount must be a number (use negative for expense)');
      return;
    }
    addTransaction({ description: description.trim(), amount: parsed, date });
    // quick UX: navigates back to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Add Transaction</h2>

        <label className="block mb-2 text-sm font-medium">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded"
          placeholder="Coffee, Salary, Rent..."
        />

        <label className="block mb-2 text-sm font-medium">Amount</label>
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded"
          placeholder="Use negative for expense, e.g. -12.50"
        />

        <label className="block mb-2 text-sm font-medium">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full mb-6 px-3 py-2 border rounded"
        />

        <div className="flex space-x-3">
          <button type="submit" className="flex-1 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
            Add
          </button>
          <button type="button" onClick={() => navigate('/dashboard')} className="flex-1 py-2 bg-gray-200 rounded hover:bg-gray-300 transition">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransactionPage;
