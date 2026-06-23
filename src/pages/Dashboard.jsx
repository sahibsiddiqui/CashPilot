import React from 'react';
import Sidebar from '../components/Sidebar';
import MobileBottomNav from '../components/MobileBottomNav';
import NavCard from '../components/NavCard';
import BalanceCard from '../components/BalanceCard';
import RecentTransactions from '../components/RecentTransactions';
import { useTransactions } from '../contexts/TransactionsContext';

// small inline icons to avoid external libs
const PlusSVG = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ListSVG = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CalendarSVG = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M16 3v4M8 3v4M3 11h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Dashboard = () => {
  const { transactions, balance } = useTransactions();
  const recent = transactions.slice(0, 5); // displays first 6 trans, but check tht it shld be the latest-6

  const navItems = [
    { to: '/add', label: 'Add Transaction', icon: <PlusSVG /> },
    { to: '/all', label: 'All Transactions', icon: <ListSVG /> },
    { to: '/monthly', label: 'By Month', icon: <CalendarSVG /> },
  ];

  // const user = { name: 'John Doe', email: 'john@example.com', avatar: '/avatar.png' };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gray-100 overflow-hidden">
      
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 overflow-y-auto">
        {/* userinfo: problem persists, solvelater: a new button on bottomnav for profile */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        </div>

        {/* for navcards: 1col on mobile, 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 md:mb-8">
          {navItems.map((it) => (
            <NavCard key={it.to} to={it.to} label={it.label} icon={it.icon} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <BalanceCard balance={balance} />
          <RecentTransactions list={recent} />
        </div>
      </main>

      <MobileBottomNav />
    </div>
  );
};

export default Dashboard;
