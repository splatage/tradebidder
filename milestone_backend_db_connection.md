# ✅ Milestone: Backend-Database Integration with Seeded Data

**Goal:** Connect backend API to MariaDB and confirm functionality with seeded data.

---

## 📁 File Overview

| Path                         | Description                            |
|------------------------------|----------------------------------------|
| `/backend/db.js`             | MariaDB connection pool                |
| `/backend/routes/*.js`       | RESTful API route definitions          |
| `/backend/controllers/*.js` | DB queries and response logic          |
| `.env`                       | DB credentials and config              |
| `server.js`                  | Express server boot                    |

---

## 🔌 Database Connection Setup

**File:** `/backend/db.js`

```js
const pool = mariadb.createPool({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});
```

**Test:**
```js
const conn = await pool.getConnection();
```

---

## 🔧 API Example: GET /api/jobs

**Route:** `/routes/jobs.js`
```js
router.get('/', getJobs);
```

**Controller:** `/controllers/jobController.js`
```js
exports.getJobs = async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM jobs ORDER BY created_at DESC LIMIT 100');
    conn.release();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
```

---

## 🧪 Integration Test Plan

| Feature        | Endpoint                | Expected        |
|----------------|-------------------------|-----------------|
| View Jobs      | GET `/api/jobs`         | 100+ records    |
| Job Detail     | GET `/api/jobs/:id`     | Full job JSON   |
| Create Bid     | POST `/api/bids`        | 201 Created     |
| Get User       | GET `/api/users/:id`    | JSON user info  |
| View Messages  | GET `/api/messages`     | Chat history    |

---

## ⚙️ Server Startup

**Environment:**
```env
DB_USER=root
DB_PASS=yourpassword
DB_NAME=tradebidder
PORT=3000
```

**Start server:**
```bash
node server.js
# or using PM2
pm2 start pm2.backend.config.json
```

---

## ✅ Completion Checklist

- [x] DB connection success via `/db.js`
- [x] Job and User queries work from controllers
- [x] Server runs cleanly and responds on `PORT`
- [x] Seed data visible through endpoints
- [x] Ready to test with frontend

---