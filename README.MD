# 🚀 ShrinkIt | High-Performance URL Shortener

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)

**ShrinkIt** is a production-ready, full-stack URL shortening service engineered for **scale** and **performance**. Unlike basic CRUD apps, ShrinkIt implements advanced system design patterns like **Cache-Aside** to ensure sub-millisecond redirection latencies.

👉 **[Live Demo](https://shortenit-frontend-jwxs.vercel.app/)**

---

## ⚡ Key Features

- **🚀 Ultra-Fast Redirection:** Implements **Redis Caching (Cache-Aside Pattern)** to bypass the database for frequently accessed links, reducing read latency from ~150ms to <10ms.
- **📊 Real-Time Analytics:** Tracks click counts instantly using atomic database increments.
- **🐳 Containerized Architecture:** Development environment fully containerized using **Docker** for consistent dependency management (Redis/Node).
- **🛡️ Type Safety:** Built with **TypeScript** across the entire stack (Frontend & Backend) for robust, error-free code.
- **🎨 Modern UI:** A responsive, Glassmorphism-inspired interface built with **React** and **Tailwind CSS**.
- **🔒 Security:** Implements rigorous input validation (`valid-url`) and CORS policies.

---

## 🏗️ System Architecture

**The Data Flow:**

1.  **Write (Shorten):** User -> React -> API -> MongoDB (Persist) -> Redis (Cache) -> User.
2.  **Read (Redirect):** User -> API -> **Redis (Hit?)** -> Redirect.
    - _If Miss:_ -> MongoDB -> Save to Redis -> Redirect.

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, Axios, React Icons
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Persistent Storage)
- **Caching:** Redis (Upstash for Prod / Docker for Dev)
- **DevOps:** Docker, Railway (Backend), Vercel (Frontend)

---

## 🚀 Getting Started (Run Locally)

### Prerequisites

- Node.js (v18+)
- Docker Desktop (for local Redis)
- MongoDB URI

### 1. Clone the Repository

```bash
git clone [https://github.com/Rohitdhakal1/ShrinkIt-url-shortner.git](https://github.com/Rohitdhakal1/ShrinkIt-url-shortner.git)
cd ShrinkIt
```

👨‍💻 Author
Rohit Dhakal
