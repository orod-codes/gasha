# Development Commands Reference

## Quick Start Commands

### Start Backend Server
```bash
# Option 1: Use the startup script (recommended)
./start-backend.sh

# Option 2: Manual command
cd backend && npm run dev
```

### Start Frontend Servers
```bash
# Option 1: Use the startup script (starts both servers)
./start-frontend.sh

# Option 2: Manual commands
cd frontend && npm run dev        # Main frontend (port 5173)
cd frontend && npm run dev:sa     # Super Admin (port 5174)
```

### Start Both Servers
```bash
# Terminal 1: Backend
./start-backend.sh

# Terminal 2: Frontend
./start-frontend.sh
```

## Port Information
- **Backend**: http://localhost:3000
- **Main Frontend**: http://localhost:5173 (Vite default)
- **Super Admin Frontend**: http://localhost:5174

## Common Development Tasks

### Database Operations
```bash
# Run database migrations
cd backend && node database/migrate.js

# Seed database with sample data
cd backend && node database/seed.js
```

### Package Management
```bash
# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd frontend && npm install

# Install all dependencies (both projects)
npm run install:all  # if you have this script
```

### Troubleshooting

#### Port 3000 Already in Use
```bash
# Find what's using port 3000
lsof -i :3000

# Kill the process (replace PID with actual process ID)
kill -9 <PID>

# Or use the startup script which handles this automatically
./start-backend.sh
```

#### Port 5173 Already in Use (Frontend)
```bash
# Find what's using port 5173
lsof -i :5173

# Kill the process
kill -9 <PID>
```

### Health Checks
```bash
# Check backend health
curl http://localhost:3000/health

# Check if servers are running
lsof -i :3000  # Backend
lsof -i :5173  # Frontend
```

## Project Structure
```
project/
├── backend/          # Node.js/Express API
├── frontend/         # React/Vite frontend
├── start-backend.sh  # Backend startup script
├── start-frontend.sh # Frontend startup script
└── DEV-COMMANDS.md   # This file
```

## Environment Variables
Make sure to copy and configure environment variables:
```bash
# Backend
cp backend/env.example backend/.env

# Edit the .env file with your database credentials
```

## API Endpoints (when backend is running)
- Health: http://localhost:3000/health
- API Docs: http://localhost:3000/api-docs (if Swagger is configured)
- Auth: http://localhost:3000/api/auth/*
- Products: http://localhost:3000/api/products/*
- Users: http://localhost:3000/api/users/*
- Analytics: http://localhost:3000/api/analytics/*
