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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Login with', { email, password });
  //   // future: call signup API then navigate
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErrorMsg('');
    try {
      const { data, error } = await signIn(email, password);
      if (error) {
        setErrorMsg(error.message || 'Login failed');
      } else {
        // success -> go to dashboard
        navigate('/dashboard');
      }
    } catch (err) {
      setErrorMsg('Unexpected error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {errorMsg && <div className="mb-3 text-sm text-red-600">{errorMsg}</div>}

        <label className="block mb-2 text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded" 
          required
        />
        <label className="block mb-2 text-sm font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded"
          required
        />

        <button type="submit" disabled={busy}
                className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
          {busy ? 'Logging in...' : 'Login'}
        </button>
        <p className="mt-3 text-sm text-gray-600">
          Don't have an account? <Link to="/signup" className="text-indigo-600">Sign up</Link>
        </p>
      </form>
    </div>
  );

};

export default LoginPage;