# CashPilot

**A lightweight personal finance tracker** built with React, TailwindCSS and Supabase.  
Track income & expenses, view transactions month-wise, and sign in with email — deployed live.

> Live demo:
> `[https://cashpilotz.vercel.app](https://cashpilotz.vercel.app/)`

---

## What this project is
CashPilot is an MVP expense/income tracking app with:
- Email-based authentication (Supabase)
- Per-user transactions stored in Supabase
- Add / Delete transactions
- View transactions (all / month-wise)
- Responsive UI (mobile-first dashboard + bottom nav)
- Deployed to Vercel

---

## Features
- ✅ Sign up / Login (Supabase Auth)
- ✅ CRUD for transactions (Supabase DB + RLS)
- ✅ Monthly grouping and per-month totals
- ✅ Responsive dashboard & mobile bottom nav
- ✅ Search, sort, pagination for "All transactions"
- ✅ Delete with confirmation

---

## Tech stack
- Frontend: React + Vite  
- Styling: Tailwind CSS  
- Backend / Auth / DB: Supabase (Auth + Postgres)  
- Hosting: Vercel

---

## Quick start — run locally

1. Clone:
```
git clone git@github.com:YOUR_USER/YOUR_REPO.git
cd YOUR_REPO
```
2. Install:
```
npm install
```
3. Add environment variables (create .env in project root — do not commit it):
```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```
4. Run dev server:
```
npm run dev
Open http://localhost:5173
```
Also,
don't forget to do the Supabase setup :)
