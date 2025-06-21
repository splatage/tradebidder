
# 📘 TradeBidder Project Blueprint

This document provides a high-level overview of the TradeBidder platform, including structure, scope, modules, and regeneration instructions for rapid rebuilding.

---

## 🏗️ Project Structure (Monorepo)

```
tradebidder/
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── routes/
│   │   ├── users.js
│   │   ├── jobs.js
│   │   ├── bids.js
│   │   ├── reviews.js
│   │   ├── dashboard.js
│   │   ├── admin.js
│   │   ├── portfolio.js
│   │   ├── notifications.js
│   │   ├── verification.js
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── jobController.js
│   │   ├── bidController.js
│   │   ├── reviewController.js
│   │   ├── dashboardController.js
│   │   ├── adminController.js
│   │   ├── portfolioController.js
│   │   ├── notificationController.js
│   │   ├── verificationController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── admin.js
│   │   ├── roleMiddleware.js
│   │   ├── suspensionMiddleware.js
│   ├── sockets/
│   │   ├── chat.js
│   │   ├── notifications.js
│   ├── utils/
│   │   ├── mailer.js
│   │   ├── matching.js
│   ├── pm2.config.json
│   ├── .env.example
│   └── README.md
├── frontend/
│   ├── vite.config.js
│   ├── index.html
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── components/
│   │   │   ├── Nav.jsx
│   │   │   ├── JobCard.jsx
│   │   │   ├── ChatBox.jsx
│   │   │   ├── NotificationBell.jsx
│   │   │   ├── PortfolioPreview.jsx
│   │   │   ├── SuspensionNotice.jsx
│   │   │   ├── UserCard.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── PostJob.jsx
│   │   │   ├── JobDetail.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Portfolio.jsx
│   │   │   ├── AdminPanel.jsx
│   │   │   ├── Notifications.jsx
│   │   │   ├── Verification.jsx
│   │   │   ├── SuspensionAppeal.jsx
│   │   │   ├── JobSchedule.jsx
│   │   │   ├── NotFound.jsx
│   ├── assets/
│   ├── styles/
│   └── README.md
```

---

## 🔧 Core Functional Modules

| Module         | Backend Route Prefix | Frontend Page(s)             | Notes                                     |
|----------------|----------------------|------------------------------|-------------------------------------------|
| Users/Auth     | /api/users           | Login, Register              | Session auth, email verification          |
| Dashboard      | /api/dashboard       | Dashboard                    | Unified user homepage                     |
| Jobs           | /api/jobs            | PostJob, JobDetail           | Posting, bidding, and job lifecycle       |
| Bids           | /api/bids            | —                            | Create/view bids                          |
| Reviews        | /api/reviews         | Profile, JobDetail           | Double-blind, anonymous, moderation       |
| Portfolio      | /api/portfolio       | Portfolio                    | Auto-generated from completed jobs        |
| Admin          | /api/admin           | AdminPanel                   | User management, job review, analytics    |
| Notifications  | /api/notifications   | Notifications, Bell Icon     | Matching jobs, reminders, alerts          |
| Verification   | /api/verification    | Verification                 | ID, insurance, qualifications             |
| Suspension     | —                    | SuspensionNotice, Appeal     | Flagged users and admin review process    |
| Scheduler      | —                    | JobSchedule                  | Shows upcoming accepted jobs              |
| Chat           | via Socket.IO        | JobDetail (if active)        | Real-time job chat                        |

---

## 🧠 Regeneration Prompt

You can regenerate the full scaffold by saying:

> “Rebuild TradeBidder monorepo with backend (Node.js + Express) and frontend (Vite + React), including all core modules, real-time chat, dashboard, admin panel, verification, and notification logic. Include DB schema, routes, controllers, UI pages and session auth.”

---

## ✅ Deployment & Tools

- PM2 for Node app process management
- Vite for frontend bundling
- Socket.IO for real-time features
- MariaDB for relational storage
- GitHub for version control

---

## 📦 To-Do Placeholders (Generated)

- `notifications.js`, `verification.js`, `suspensionMiddleware.js`, `JobSchedule.jsx`, etc. — all added as empty files for future logic expansion.

---

## 📁 File Output

This document is saved as: `project-blueprint.md`

Use this as a master spec and rebuild reference.
