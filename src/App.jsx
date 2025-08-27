import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Dashboard from './pages/Dashboard';
import AddTransactionPage from './pages/AddTransactionPage';
import AllTransactionsPage from './pages/AllTransactionsPage';
import MonthlyTransactionsPage from './pages/MonthlyTransactionsPage';
import { useAuth } from './contexts/AuthContext';

export default function App() {
  // defined isLoggedIn in such a way that the route expression won't crash
  // Later to replace this with real auth state.
  // const [isLoggedIn] = useState(true);
  // done-
  const { user, loading } = useAuth();

  // while it checks the session, rendering a simple loading UI (avoids redirect flicker)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Checking auth...</div>
      </div>
    );
  }
  
  const isLoggedIn = !!user; // if the user's loggedin then its true else the value wld be false

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/add"
          element={isLoggedIn ? <AddTransactionPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/all"
          element={isLoggedIn ? <AllTransactionsPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/monthly"
          element={isLoggedIn ? <MonthlyTransactionsPage /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}
