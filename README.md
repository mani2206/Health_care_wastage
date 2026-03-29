# 🏥 Compicare Medical Waste Management System

This project is a **React + Vite** based web application designed to help manage **medical waste compliance** for clinics. The system supports multiple user roles and ensures proper document tracking, waste log management, and compliance monitoring.

---

# 🚀 Overview

This application includes three main user roles:

### **👤 Super Admin**

* Manage all clinics
* View compliance status for all clinics
* Oversee medical waste logs

### **🏥 Clinic Admin**

* Manage clinic profile
* Upload compliance documents
* Track document expiry alerts
* Monitor clinic-level waste logs

### **👨‍⚕️ Clinic User / Staff**

* Upload Form II & BMW compliance documents
* Add, edit, delete medical waste logs
* Maintain daily waste disposal records

---

# 🔐 Environment Variables Setup

Create a `.env` file in the root of your project and add the following:

```env
VITE_API_BASE_URL=https://project01-a7ht.onrender.com
VITE_API_KEY=mnbvcxzasdfghjkpoiuytrewq1234567890
```

### ⚠️ Important Notes

* Vite requires environment variables to start with `VITE_`
* Do NOT wrap values in quotes
* Restart the dev server after editing `.env`

---

# 📦 Installation

### **1️⃣ Clone the Repository**

```bash
git clone <your-repo-url>
cd <project-folder>
```

### **2️⃣ Install Dependencies**

```bash
npm install
```

### **3️⃣ Start Development Server**

```bash
npm run dev
```

---

# 🔗 Using Environment Variables in API Calls

You can access `.env` values using `import.meta.env`:

```js
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
```


# 📝 Main Features

## ✅ 1. Authentication Module

* Login
* Register
* Forget & Reset Password
* JWT Token Storage

## ✅ 2. Clinic Profile Management

* Create and update clinic information
* Upload clinic certificates & documents
* Auto-save clinic ID locally

## ✅ 3. Compliance Document Tracking

* Form II tracking
* BMW compliance certificate tracking
* Expiry alerts & notifications
* Dashboard highlights pending/expired statuses

## ✅ 4. Medical Waste Log Management

* Add daily waste logs
* Edit existing logs
* Delete logs
* View all logs submitted by clinic

## ✅ 5. Role-Based Access

| Role             | Access Level                       |
| ---------------- | ---------------------------------- |
| **Super Admin**  | Full access to all clinics & logs  |
| **Clinic Admin** | Manage clinic details & compliance |
| **Clinic User**  | Submit documents & waste logs      |

---

# 📁 Project Structure

```
src/
├── api/            # API service files
├── components/     # Reusable UI components
├── pages/          # Page-level components
├── utils/          # Helpers, configs, constants
├── App.jsx
├── main.jsx
.env
vite.config.js
package.json
```

---


# 🎉 Completed!

Your **Compicare Medical Waste Compliance System** is now structured with:

* Environment variable protection
* Multi-role clinic management
* Waste log system
* Compliance document expiry alerts
* React + Vite performance setup

