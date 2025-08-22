// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);      // supabase user object or null
  const [loading, setLoading] = useState(true); // initial auth check

  useEffect(() => {
    let mounted = true;

    // 1) try to get current session/user on mount
    const getInitialUser = async () => {
      try {
        const { data } = await supabase.auth.getSession(); // v2 API
        const session = data?.session ?? null;
        if (mounted) setUser(session?.user ?? null);
      } catch (err) {
        console.error('Auth getSession error', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    getInitialUser();

    // 2) subscribe to future auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      // cleanup subscription
      if (listener?.subscription) listener.subscription.unsubscribe();
    };
  }, []);

  // sign up (email + password)
  const signUp = async (email, password) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      return { data, error };
    } finally {
      setLoading(false);
    }
  };

  // sign in with email + password
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      return { data, error };
    } finally {
      setLoading(false);
    }
  };

  // sign out
  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) console.warn('Sign out error:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
