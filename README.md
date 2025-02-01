# URL Shortener ✂️🔗  

This is a simple **URL Shortener** built using **Node.js, Express, and MongoDB**. It allows users to generate short URLs and track visit history.  

---

## 🚀 Features  
✅ Shorten long URLs into short, unique links  
✅ Redirect users to the original URL when accessing the short link  
✅ Track visit history (timestamps of each access)  

---

## 🛠️ Tech Stack  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **ID Generation:** `shortid` package  

---

## 🔧 How It Works  
- **POST `/url`** – Create a short URL  
- **GET `/:shortID`** – Redirect to the original URL and log the visit  

---

## 📌 Setup  
```bash
git clone https://github.com/your-repo/url-shortener.git
cd url-shortener
npm install
node server.js
