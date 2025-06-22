# 📅 EMSYSTEM — Events Management System

Welcome to **EMSYSTEM**, a clean and modern **Events Management System** built using **Laravel**, **Inertia.js**, **React**, **Vuexy Theme**, **Material-UI**, and **Axios**.  
Perfect for managing & viewing events with role-based access for Admins & Users.

---

## 🚀 Tech Stack

| Tech          | Purpose                                          |
| ------------- | ------------------------------------------------ |
| Laravel       | Backend API, Authentication & Routing            |
| Inertia.js    | Seamless bridge between Laravel & React SPA      |
| React         | Frontend JavaScript framework                    |
| Material-UI   | Modern React UI Components (MUI)                 |
| Axios         | AJAX requests to backend API                     |
| MySQL         | Database                                         |

---

## ✨ Features

✅ **Role-Based Access:**  
- **Admin (`role = 1`)** — Full Event Management (Create, Edit, Delete)  
- **User (`role = 2`)** — View Events Only

✅ **Events categorized into:**  
- **Today’s Events**
- **Future Events**
- **Past Events**

✅ **Event Details:**  
- Title  
- Description  
- Date  
- Time (optional)  
- Location (optional, with Ahmedabad sample locations)  
- Badges & styled cards for clear UI

✅ **Sample Data:**  
- 5 Events for Today  
- 5 Future Events (1–30 days ahead)  
- 5 Past Events (1–30 days ago)

✅ **⚙️ Setup & Installation:**  
- 1️⃣ Clone the Repo  
- git clone https://github.com/kundanboricha/emsystem.git
- cd emsystem
- 2️⃣ Install Dependencies
- composer install
- npm install
- 3️⃣ Configure Environment
- cp .env.example .env
- php artisan key:generate
- 4️⃣ Migrate & Seed Database
- php artisan migrate --seed
- 5️⃣ Run the Application
- php artisan serve
- npm run dev




## ⚙️ Login Access
- login acess
- for admin login 
- email :admin@example.com 
- pass : password 

- user login
- email user@example.com
- pass:password
