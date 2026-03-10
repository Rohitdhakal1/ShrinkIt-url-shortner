# ShrinkIt URL Shortener

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white)

ShrinkIt is a full-stack URL shortening service built with React and Node.js. It takes long URLs and generates unique, shortened links that redirect users to their original destinations.

The project implements a cache-aside pattern using Redis to reduce database strain and improve latency for frequently accessed redirects.

## How it Works

The application flow handles shortening and redirecting:

**Shortening a URL:**
1. The user submits a long URL via the React frontend.
2. The Node.js API hits MongoDB to check if the URL already exists.
3. If not, a unique short code is generated and saved to MongoDB.

**Redirecting a User:**
1. A user visits the shortened link.
2. The Node.js API checks Redis for the cached destination URL.
3. If found (Cache Hit), the user is redirected immediately.
4. If not found (Cache Miss), the API queries MongoDB, caches the result in Redis with a Time-To-Live (TTL), and redirects the user.

## Technology Stack

- **Frontend:** React, Vite, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Persistent storage for links and click analytics)
- **Cache:** Redis (In-memory caching for faster redirects)
- **Language:** TypeScript used across both frontend and backend

## Getting Started

### Requirements

Before running the project, make sure you have:
1) Node.js (v18 or higher)
2) MongoDB (local installation or MongoDB Atlas)
3) Redis (run locally with Docker or use Upstash Redis online)
### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rohitdhakal1/ShrinkIt-url-shortner.git
   cd ShrinkIt-url-shortner
   ```

2. **Configure Environment Variables**
   Create a `.env` file in the `backend` directory with the following variables:
   ```env
   PORT_URI=5001
   BASE_URL=http://localhost:5001
   MONGODB_URI=your_mongodb_connection_string
   REDIS_URL=your_redis_connection_string
   ```

3. **Install Dependencies**
   Run the following commands in their respective directories:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

4. **Run the Application**
   Start both the backend and frontend development servers.

   Terminal 1 (Backend):
   ```bash
   cd backend
   npm run dev
   ```

   Terminal 2 (Frontend):
   ```bash
   cd client
   npm run dev
   ```

The frontend will be available at `http://localhost:5173` (or the port Vite outputs), and the backend API will run on `http://localhost:5001`.

## Author
Rohit Dhakal
