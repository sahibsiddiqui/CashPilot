import { useEffect, useState } from 'react';
import Header from './components/Header';
import BalanceCard from './components/BalanceCard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import CategoryCharts from './components/CategoryCharts';
import { saveToLocalStorage, loadFromLocalStorage } from './utils/localStorageHelper';

const App = () => {
  const [transactions, setTransactions] = useState(() => loadFromLocalStorage());

  //save to localStorage whenever transactions change
  useEffect(() => {
    saveToLocalStorage(transactions);
  }, [transactions]);

  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const handleAddTransaction = (tx) => {
    setTransactions([tx, ...transactions]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f2e5] to-[#f0e6d6] p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <Header />
        <BalanceCard income={income} expense={expense} />
        <TransactionForm onAdd={handleAddTransaction} />
        <TransactionList transactions={transactions} />
        <CategoryCharts transactions={transactions} />
      </div>
    </div>
  );
};

export default App;
