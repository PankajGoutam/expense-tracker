# 💼 Expense Tracker App

A full-stack application for remote teams to track and review expenses with role-based access and visual insights.

---

## 📁 Folder Structure

root/
├── server # Backend (Node.js, Express, MongoDB)
└── frontend # Frontend (React, Redux, Recharts)


---

## 🔑 Features

- 🔐 **Authentication & RBAC** (JWT-based):
  - Roles: `employee` and `admin`
- 🧾 **Employees** can:
  - Add/view their own expenses
  - Upload and view receipt images
- 🛠️ **Admins** can:
  - View all expenses
  - Filter expenses by:
    - Employee name
    - Category
    - Date range
    - Amount range
  - Change status of expenses (`pending`, `approved`, `rejected`)
  - View receipts for all expenses
  - View audit logs (status updates, expense creation)
  - Export expenses as CSV
  - Visualize insights with charts (category-wise and monthly breakdown)


## 🛠️ Tech Stack

| Layer     | Tech                                     |
|-----------|------------------------------------------|
| Frontend  | React, Redux Toolkit, Recharts, Tailwind |
| Backend   | Node.js, Express, MongoDB                |
| Auth      | JWT (JSON Web Tokens)                    |
| Charts    | Recharts                                 |

---

## ⚙️ Local Setup Instructions

### 📦 1. Backend Setup

cd server
npm install

➕ Create .env file inside /server directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

⚠️ You must use a valid MongoDB URI (e.g., from MongoDB Atlas or local MongoDB)
JWT_SECRET can be any random strong string

🚀 Start Backend Server

npm run dev

💻 2. Frontend Setup

cd frontend
npm install
npm run dev