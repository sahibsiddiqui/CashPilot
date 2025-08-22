import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from './AuthContext'; // reads current user

const TransactionsContext = createContext();

export const useTransactions = () => useContext(TransactionsContext);

export const TransactionsProvider = ({ children }) => {
  // old code-
  // initializing from localStorage so data persists between reloads
  // const [transactions, setTransactions] = useState(() => {
  //   try {
  //     const raw = localStorage.getItem('cp_transactions');
  //     if (raw) return JSON.parse(raw);
  //   } catch (e) {
  //     /* ignore */
  //   }
  //   // default mock data
  //   return [
  //     { id: 1, description: 'Coffee', amount: -3.5, date: '2025-08-01' },
  //     { id: 2, description: 'Salary', amount: 2000, date: '2025-07-30' },
  //     { id: 3, description: 'Groceries', amount: -45.12, date: '2025-08-02' },
  //   ];
  // });
  const { user } = useAuth(); // supabase user object or null
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  // load transactions for current user
  const fetchTransactions = useCallback(async () => {
    if (!user) {
      setTransactions([]);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(1000); // adjust as needed

      if (error) {
        console.error('Error fetching transactions:', error);
        setTransactions([]);
      } else {
        // normalize amounts as numbers
        const normalized = (data || []).map((r) => ({ ...r, amount: Number(r.amount) }));
        setTransactions(normalized);
      }
    } catch (err) {
      console.error('Unexpected fetch error:', err);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // initial fetch and refetch when user changes
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  /* PATA NAHI BUT GPT OFFERED A SUBSCRIPTION-SOMETHING-TO-KEEP IF WANTED? */
  // Optional: realtime subscription (keeps UI live if you want)
  // useEffect(() => {
  //   if (!user) return undefined;

  //   const channel = supabase
  //     .channel('public:transactions')
  //     .on(
  //       'postgres_changes',
  //       { event: '*', schema: 'public', table: 'transactions', filter: `user_id=eq.${user.id}` },
  //       (payload) => {
  //         // payload: { eventType: 'INSERT' | 'UPDATE' | 'DELETE', new: {...}, old: {...} }
  //         const { eventType } = payload;
  //         if (eventType === 'INSERT') {
  //           setTransactions((prev) => [ { ...payload.new, amount: Number(payload.new.amount) }, ...prev ]);
  //         } else if (eventType === 'UPDATE') {
  //           setTransactions((prev) => prev.map((t) => (t.id === payload.new.id ? { ...payload.new, amount: Number(payload.new.amount) } : t)));
  //         } else if (eventType === 'DELETE') {
  //           setTransactions((prev) => prev.filter((t) => t.id !== payload.old.id));
  //         }
  //       }
  //     )
  //     .subscribe();

  //   return () => {
  //     supabase.removeChannel(channel);
  //   };
  // }, [user]);


  // old code-
  // const addTransaction = (tx) => {
  //   // tx: { description, amount/money, date(id) }
  //   const newTx = { id: Date.now(), ...tx }; //to put UUIDs instead, since still just dev-phase na
  //   setTransactions((prev) => [newTx, ...prev]);
  // };

  // const deleteTransaction = (id) => {
  //   setTransactions((prev) => prev.filter((t) => t.id !== id));
  // };
  // add a transaction (writes to supabase)
  const addTransaction = async ({ description, amount, date, category = null }) => {
    if (!user) throw new Error('Must be signed in to add transactions');

    // optimistic: create a temp id so UI feels snappy (optional)
    const newTx = {
      // id will be assigned by DB; keep a temp negative id if you want but here we wait for DB response
      user_id: user.id,
      description,
      amount,
      date,
      category,
    };

    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert([newTx])
        .select()
        .single();

      if (error) {
        console.error('Insert error:', error);
        return { error };
      } else {
        const inserted = { ...data, amount: Number(data.amount) };
        // prepend newest first
        setTransactions((prev) => [inserted, ...prev]);
        return { data: inserted };
      }
    } catch (err) {
      console.error('Unexpected insert error:', err);
      return { error: err };
    }
  };

  // delete a transaction by id
  const deleteTransaction = async (id) => {
    if (!user) throw new Error('Must be signed in to delete transactions');
    try {
      const { data, error } = await supabase.from('transactions').delete().eq('id', id).select().single();
      if (error) {
        console.error('Delete error:', error);
        return { error };
      } else {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
        return { data };
      }
    } catch (err) {
      console.error('Unexpected delete error:', err);
      return { error: err };
    }
  };

  // update a transaction (optional, for edit)
  const updateTransaction = async (id, changes) => {
    if (!user) throw new Error('Must be signed in to update transactions');
    try {
      const { data, error } = await supabase.from('transactions').update(changes).eq('id', id).select().single();
      if (error) {
        console.error('Update error:', error);
        return { error };
      } else {
        setTransactions((prev) => prev.map((t) => (t.id === id ? { ...data, amount: Number(data.amount) } : t)));
        return { data };
      }
    } catch (err) {
      console.error('Unexpected update error:', err);
      return { error: err };
    }
  };

  const balance = transactions.reduce((sum, t) => sum + Number(t.amount || 0), 0);

  return (
    <TransactionsContext.Provider value={{ transactions, loading, fetchTransactions, addTransaction, deleteTransaction, updateTransaction, balance }}>
      {children}
    </TransactionsContext.Provider>
  );
};
