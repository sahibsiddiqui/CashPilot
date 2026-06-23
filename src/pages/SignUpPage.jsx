// src/pages/SignUpPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [busy, setBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMsg('Name cannot be empty.');
      return;
    }
    if (!email.trim()) {
      setErrorMsg('Email cannot be empty.');
      return;
    }
    if (!password.trim()) {
      setErrorMsg('Password cannot be empty.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }
    
    setBusy(true);
    setErrorMsg('');
    setInfoMsg('');
    try {
      const { data, error } = await signUp(email, password, name);
      if (error) {
        const msg = error.message?.toLowerCase() || '';
        if (
          msg.includes('user already registered') ||
          msg.includes('already registered') ||
          msg.includes('already exists') ||
          msg.includes('email address is already')
        ) {
            setErrorMsg('already_exists'); // user shld login instead of signup
          } else {
            setErrorMsg(error.message || 'Sign up failed.'); // othererror if any
          }
      } else {
        setInfoMsg('Account created! Taking you to your dashboard...');
        setTimeout(() => navigate('/dashboard'), 1000);
      }
    } catch (err) {
      setErrorMsg('Unexpected error. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        
        {errorMsg === 'already_exists' && (
          <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
            An account with this email already exists.{' '}
            <Link to="/login" className="underline font-medium text-red-700">
              Login instead..
            </Link>
          </div>
        )}
        {errorMsg && errorMsg !== 'already_exists' && (
          <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
            {errorMsg}
          </div>
        )}
        {infoMsg && (
          <div className="mb-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2">
            {infoMsg}
          </div>
        )}
        
        <label className="block mb-2 text-sm font-medium">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => { setName(e.target.value); setErrorMsg(''); }}
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="John Doe"
          required
        />
        
        <label className="block mb-2 text-sm font-medium">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setErrorMsg(''); }}
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="you@example.com"
          required
        />

        <label className="block mb-2 text-sm font-medium">
          Password <span className="text-red-500">*</span>
          <span className="ml-2 text-xs text-gray-500 font-normal">
            (minimum 6 characters)
          </span>
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setErrorMsg(''); }}
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="••••••••"
          required
        />
        
        <button type="submit" disabled={busy}
          className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition disabled:opacity-60">
          {busy ? 'Signing up...' : 'Sign Up'}
        </button>
        <p className="mt-3 text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;