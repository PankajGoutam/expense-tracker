# 💼 Expense Tracker App

A full-stack application for remote teams to track and review expenses with role-based access and visual insights.

## 📁 Structure

## root/
       ├── server
       └── frontend


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

## 🚀 Setup

### Backend

```bash
cd server
npm install
npm run dev

➕ Create .env file inside /server directory:

### Frontend
```bash
cd frontend
npm install
npm run dev

