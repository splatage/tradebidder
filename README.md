# 🛠️ TradeBidder

**TradeBidder** is a platform for tradespeople and job posters to connect through a smart auction-style job marketplace.  
It supports job posting, bidding, live chat, verification, scheduling, and double-blind reviews — built with Node.js, React, MariaDB.

---

## 📸 Preview

![Dashboard Preview](screenshots/dashboard.png)  
_A responsive, mobile-first dashboard with job metrics and smart notifications._

---

## 🚀 Features

- 🔒 **Secure unified user system** (post jobs, bid on jobs)
- 📍 **Location-aware job posting and filtering**
- 💬 **Live chat** for active jobs via WebSockets
- ⭐ **Ratings & double-blind review system**
- 🧾 **Portfolio & ID verification system**
- 📅 **Job scheduler with calendar view**
- 🧮 **Freemium model with commission + subscriptions**
- 🌍 **Internationalization with multi-currency and tax support**

---

## 🧰 Tech Stack

| Layer       | Technology                      |
|-------------|----------------------------------|
| Frontend    | Vite + React                    |
| Backend     | Node.js + Express               |
| Database    | MariaDB                         |
| Real-time   | Socket.IO                       |
| Deployment  | PM2 + Linode/Debian             |

---

## 📦 Project Structure (Monorepo)

```bash
tradebidder/
├── backend/                  # Express API
│   ├── controllers/
│   ├── routes/
│   └── server.js
├── frontend/                 # Vite + React app
│   ├── src/pages/
│   ├── src/components/
│   └── App.jsx

🧑‍💻 Getting Started
1. Clone the Repo
bash
Copy
git clone https://github.com/YOUR_USERNAME/tradebidder.git
cd tradebidder
2. Install Dependencies
bash
Copy
cd backend && npm install
cd ../frontend && npm install
3. Configure Environment
Create .env inside /backend:

env
Copy
PORT=3000
DB_HOST=localhost
DB_USER=tradeuser
DB_PASS=StrongPassword!
DB_NAME=tradebidder
4. Start Development Servers
bash
Copy
# In backend/
npm run dev

# In frontend/
npm run dev
🧪 Testing
Seed test data and log in as a sample user:

📩 Email: demo@tradebidder.com

🔑 Password: test1234

Mock data includes:

Jobs, reviews, profiles, and live chat channels

🌐 Deployment with PM2
Build and serve frontend

bash
Copy
cd frontend && npm run build && pm2 start ecosystem.config.js --env production

Serve backend + static build

bash
Copy
cd ../backend && pm2 start pm2.config.json -i max

📂 Screenshots
Dashboard	Job Detail	Profile & Reviews

📁 Place screenshots in /screenshots/ folder for display

🔐 Security & Privacy
Session-based auth with secure cookies

Email verification required

Flagging, moderation, and user suspension support

Anonymous reviews with admin-only disclosure

💡 Roadmap
 MVP deployment

 Email verification

 Freemium monetization

 Native mobile app

 Stripe & PayPal integration

 Multi-language support (i18n)

🧑‍🏫 License
This project is licensed under the MIT License.
Feel free to contribute or fork for your region or trade specialty!

🤝 Contributing
Fork the repo

Create your feature branch (git checkout -b feature/YourFeature)

Commit changes

Push and create a PR
