# Employee Management System – Backend (Node.js + Express + MongoDB)

This is the backend API for the Employee Management System.  
It includes authentication, departments module, employees module, and attendance module.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs
- CORS

---

## 📁 Folder Structure

```
backend/
│── src/
│ │── config/
│ │── controllers/
│ │── middlewares/
│ │── models/
│ │── routes/
│ │── utils/
│ │── app.ts
│ │── server.ts
│── package.json
│── tsconfig.json
│── .env

```
---

## ⚙️ Environment Variables

Create a `.env` file:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/employee_management
JWT_SECRET=your_jwt_secret


---

## 📦 Installation

```bash
npm install


npm run dev
```

### 🏗 Build and Run

```
npm run build
npm start
```


### 📌 API Endpoints
```
Auth
Method	URL	Description
POST	/auth/register	Register user
POST	/auth/login	Login user
Departments
Method	URL	Description
GET	/departments	Get all departments
POST	/departments	Create department
GET	/departments/:id	Get single department
PUT	/departments/:id	Update department
DELETE	/departments/:id	Delete department
Employees
Method	URL	Description
GET	/employees	Get all employees
POST	/employees	Create employee
GET	/employees/:id	Get single employee
PUT	/employees/:id	Update employee
DELETE	/employees/:id	Delete employee
Attendance
Method	URL	Description
GET	/attendance	Get all attendance records
POST	/attendance	Mark attendance
GET	/attendance/:id	Get single attendance record
PUT	/attendance/:id	Update attendance record
DELETE	/attendance/:id	Delete attendance record
```

### 🛡 Authentication
```
Use Bearer Token:

Authorization: Bearer <your_token>
```