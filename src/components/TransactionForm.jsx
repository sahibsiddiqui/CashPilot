import { useState } from 'react';

const TransactionForm = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Other');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || !amount) return;

    onAdd({
      id: crypto.randomUUID(),
      text,
      amount: parseFloat(amount),
      category,
    });

    setText('');
    setAmount('');
    setCategory('Other');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#fdf4e5] p-6 rounded-lg shadow-md mb-6 space-y-4">
      <div>
        <input
          type="text"
          placeholder="Transaction title"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border p-3 rounded-lg text-gray-700"
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="Amount (negative for expense | positive for earned)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-3 rounded-lg text-gray-700"
        />
      </div>
      <div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-3 rounded-lg text-gray-700"
        >
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Entertainment</option>
          <option>Salary</option>
          <option>Other</option>
        </select>
      </div>
      <button type="submit" className="w-full bg-[#f1c27d] text-white p-3 rounded-lg hover:bg-[#e2a86c]">
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
