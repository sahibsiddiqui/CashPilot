// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [busy, setBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    if (!email.trim() && !password.trim()) {
      setErrorMsg('Email and password cannot be empty.');
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

    setBusy(true);
    setErrorMsg('');
    try {
      const { data, error } = await signIn(email, password);

      if (error) {
        const msg = error.message?.toLowerCase() || '';
        if (
          msg.includes('invalid login credentials') ||
          msg.includes('user not found') ||
          msg.includes('invalid credentials')
        ) {
          setErrorMsg("No account found with these details. If you're new here, sign up first!");
        } else {
          setErrorMsg(error.message || 'Login failed. Please try again.');
        }
      } else {
        navigate('/dashboard');
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
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {errorMsg && <div className="mb-3 text-sm text-red-600">{errorMsg}</div>}
        {errorMsg && (
          <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
            {errorMsg}
            {errorMsg.includes("sign up first") && (
              <span>
                {' '}
                <Link to="/signup" className="underline font-medium text-red-700">
                  Sign up here..
                </Link>
              </span>
            )}
          </div>
        )}

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
          {busy ? 'Logging in...' : 'Login'}
        </button>
        <p className="mt-3 text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-indigo-600 hover:underline">Sign up</Link>
        </p>
      </form>
    </div>
  );

};

export default LoginPage;