# 🌤️ Weather App

A modern weather application with Auth0 authentication and real-time weather data.

## Features

- 🔐 Secure login with Auth0
- 🌍 Real-time weather for 8 major cities
- 🔍 Search cities by name
- 📱 Responsive design
- ⚡ Fast performance with caching

## Tech Stack

**Frontend:** React + Vite + Auth0  
**Backend:** Node.js + Express + JWT  
**APIs:** OpenWeatherMap

## Quick Setup

1. **Clone & Install**
   ```bash
   git clone <repo-url>
   cd weather-web-application
   
   # Backend
   cd backend && npm install
   
   # Frontend  
   cd ../frontend && npm install
   ```

2. **Environment Variables**
   
   `backend/.env`:
   ```
   AUTH0_DOMAIN=your-domain.auth0.com
   AUTH0_AUDIENCE=https://weather-api
   OPENWEATHER_API_KEY=your-api-key
   PORT=5000
   ```
   
   `frontend/.env`:
   ```
   VITE_AUTH0_DOMAIN=your-domain.auth0.com
   VITE_AUTH0_CLIENT_ID=your-client-id
   VITE_AUTH0_AUDIENCE=https://weather-api
   ```

3. **Run the App**
   ```bash
   # Backend (terminal 1)
   cd backend && npm run dev
   
   # Frontend (terminal 2)
   cd frontend && npm run dev
   ```

4. **Visit** `http://localhost:5173`

## API Keys Setup

- **Auth0**: Create account → New App → Copy domain & client ID
- **OpenWeatherMap**: Sign up → Get free API key

## Project Structure

```
├── backend/           # Express API server
├── frontend/          # React application
└── README.md
```

## Commands

```bash
# Development
npm run dev            # Start with hot reload

# Production  
npm start              # Backend
npm run build          # Frontend build
```

---

**Login required** • **8 cities included** • **Real-time updates**
