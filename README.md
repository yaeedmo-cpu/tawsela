# Tawsela - Microbus Booking Web App
Structure:
- /backend : Express API, Socket.io, MongoDB models
- /frontend: Next.js simple frontend (RTL Arabic default)

Quick start (locally)
1. Backend:
   cd backend
   npm install
   copy .env.example to .env and set MONGO_URI
   node server.js

2. Frontend:
   cd frontend
   npm install
   set NEXT_PUBLIC_API_URL=http://localhost:5000
   npm run dev

This is an initial heavy-lift scaffold. You can extend UI/UX, add Instapay integration, JWT auth, admin dashboards, and prettier styling. I can now expand each part further (admin panel, payment flow, map integration, mobile PWA) on request.
