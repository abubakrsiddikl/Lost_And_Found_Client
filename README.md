# 📌 Lost & Found Project

![Lost & Found Screenshot](https://i.ibb.co.com/qMMd34Px/Screenshot-from-2025-02-06-23-53-44.png)  


## 📝 Overview

The **Lost & Found Project** is a web-based platform designed to help users **report lost items, browse found items, and connect with others** to reclaim their belongings. The application is built with **security, efficiency, and user-friendliness** in mind, providing a seamless experience for lost item recovery.

---

## 📚 Table of Contents

- [Technologies Used](#-technologies-used)
- [Features](#-features)
- [Dependencies](#-dependencies)
- [How to Run the Project Locally](#-how-to-run-the-project-locally)
- [Live Project Links](#-live-project-links)

---

## 🖥️ Technologies Used

### 🌐 Frontend
- **React.js** – Component-based UI development.
- **Axios** – Handling API requests.
- **Tailwind CSS, Daisy UI & FlowBite** – Responsive and accessible styling.
- **React Hot Toast & Switee Aler** – Beautiful alert notifications.

### 🔙 Backend
- **Node.js** – Server-side runtime.
- **Express.js** – API framework.
- **MongoDB** – NoSQL database for item storage.
- **CORS** – Securely handling cross-origin requests.

### 🔑 Authentication
- **JWT (JSON Web Token)** – Secure user authentication.
- **HTTP-Only Cookies** – Secure token storage.

---

## ✨ Features

✅ **User Authentication** – Secure login and registration using JWT tokens.  
✅ **Lost & Found Reports** – Submit detailed reports of lost or found items.  
✅ **Search Functionality** – Quickly find lost or found items by title or location.  
✅ **Status Management** – Mark items as "Recovered" to prevent duplicate recovery.  
✅ **Dynamic Layout** – Switch between grid and table views for browsing items.  
✅ **Mobile-Friendly Design** – Responsive UI built with Tailwind CSS & Daisy UI.  

---

## 📦 Dependencies

### Backend:
```json
"dependencies": {
  "express": "^4.18.2",
  "mongoose": "^7.0.3",
  "jsonwebtoken": "^9.0.0",
  "cors": "^2.8.5",
  "dotenv": "^16.0.3",
  "cookie-parser": "^1.4.6"
}
```

### Frontend:
```json
"dependencies": {
  "react": "^18.2.0",
  "axios": "^1.3.4",
  "react-hot-toast": "^2.4.0",
  "daisyui": "^2.51.0",
  "tailwindcss": "^3.2.4",
  "flowbite": "^1.6.5",
  "react-router-dom": "^6.10.0"
}
```

---

## 🚀 How to Run the Project Locally

### 1️⃣ Prerequisites
- Node.js (v14+ recommended)
- MongoDB
- NPM or Yarn

### 2️⃣ Clone the Repositories
#### Clone Client (Frontend)
```sh
git clone https://github.com/abubakrsiddikl/Lost_And_Found_Client.git
cd Lost_And_Found_Client
```
#### Clone Server (Backend)
```sh
git clone https://github.com/abubakrsiddikl/Lost_And_Found_Server.git
cd Lost_And_Found_Server
```

### 3️⃣ Backend Setup
```sh
cd Lost_And_Found_Server
npm install
npm start
```

### 4️⃣ Frontend Setup
```sh
cd ../Lost_And_Found_Client
npm install
npm start
```

### 5️⃣ Open in Browser
Navigate to [http://localhost:5000](http://localhost:5000) in your browser to use the application.

---

## 🌍 Live Project Links
🔗 **[Visit the Live Project](https://lost-and-found-web-8dbe0.web.app/)**  


