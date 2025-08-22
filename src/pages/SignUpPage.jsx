// src/pages/SignUpPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [busy, setBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Sign up with', { email, password });
  //   // future: call signup API then navigate
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErrorMsg('');
    setInfoMsg('');
    try {
      const { data, error } = await signUp(email, password);
      if (error) {
        setErrorMsg(error.message || 'Sign up failed');
      } else {
        // supabase may send a confirmation email depending on project settings
        setInfoMsg('Sign up successful. Check your email if confirmation is required.');
        // optionally redirect to login:
        navigate('/dashboard'); // or navigate('/login') if you prefer email confirmation before login
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
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        
        {errorMsg && <div className="mb-3 text-sm text-red-600">{errorMsg}</div>}
        {infoMsg && <div className="mb-3 text-sm text-green-600">{infoMsg}</div>}

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
          {busy ? 'Signing up...' : 'Sign Up'}
        </button>
        <p className="mt-3 text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-indigo-600">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;