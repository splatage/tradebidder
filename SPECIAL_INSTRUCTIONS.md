
# 📜 TradeBidder – Special Project Instructions

## 🔧 Project Summary
**TradeBidder** is an online platform where tradespeople and clients connect through an auction-style job marketplace. Any user can post a job or bid on one. The platform includes live chat, job scheduling, verification, reviews, a public portfolio, and admin moderation.

---

## 🧱 Technology Stack

| Layer        | Tool                  |
|--------------|------------------------|
| Frontend     | React (Vite, CSR)      |
| Backend      | Node.js (Express)      |
| Database     | MariaDB                |
| Real-time    | Socket.IO              |
| Process Mgmt | PM2                    |
| Hosting      | Linode (Debian Linux)  |
| Versioning   | GitHub (monorepo)      |

---

## 📦 Monorepo Structure

```
tradebidder/
├── backend/ (Express + Socket.IO)
├── frontend/ (Vite + React)
```

---

## 👥 User Model

- Single `users` table — roles are contextual
- Any user can post or bid
- Fields include age (min 16), GST/VAT ID, ID verification, insurance, qualifications, location

---

## 💬 Core Functional Scope

### ✅ Main Features

- Post a job (multi-step form)
- Bid on jobs (with messaging and deadlines)
- Live chat (Socket.IO, only on accepted jobs)
- Public profile with portfolio
- Reviews (double-blind, anonymous display, delayed publication)
- Dashboard (metrics, notifications, schedule)
- Job schedule (for won and posted jobs)
- Notifications (for matched jobs, reviews, chat updates)
- Admin panel (user suspension, review moderation, analytics)
- Authentication (session-based login, email verification)
- Age verification (16+ only)
- GST/Tax registration
- Multi-country support (currency, timezone, filters)
- Portfolio auto-generated from completed jobs
- Appeal process for suspensions

### 🛠️ Supporting Tools

- Matching logic based on user skills, tools, location
- Flagging system (reviews, users)
- Email sender for confirmation and alerts
- Suspension middleware
- Push/email digest notifications
- PM2 startup config
- `.env.example` + full deployment scripts
- Markdown and visual documentation

---

## 📐 Design Notes

- Mobile-first responsive UI
- Unified homepage/dashboard
- Clear visual cues for role and verification status
- Onboarding wizard for first-time users
- Optional fields for job requirements (tools, transport, etc.)
- Visual guidance for job posting

---

## 🧠 Development & Use Instructions

- This project is built to be **iteratively extended**
- All logic should be modular (separate routes/controllers/services)
- All endpoints must return informative JSON errors
- Protect sensitive routes via middleware (`auth.js`, `admin.js`, `suspensionMiddleware.js`)
- Use GitHub as source of truth. Push often

---

## 🧪 Testing Environment

- Fully functional real deployment into a **test-managed Linode VM**
- Real database, live code — no dummy APIs
- GitHub used for persistent code backup
- Manual test data is seeded on startup

---

## 📁 Regeneration

To restore the project:
> “Rebuild the TradeBidder monorepo with backend routes, frontend pages, DB schema, Socket.IO, session login, admin panel, job system, live chat, notifications, and portfolio logic.”
