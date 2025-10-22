#!/bin/bash

# Frontend Development Server Startup Script
echo "🎨 Starting Security Service Frontend..."

# Navigate to frontend directory
cd /home/orod/Desktop/project/frontend

# Start both development servers
echo "🔄 Starting Vite development servers..."
echo "📱 Starting main frontend (port 5173)..."
npm run dev &
sleep 2
echo "👤 Starting Super Admin frontend (port 5174)..."
npm run dev:sa &

echo "✅ Both frontend servers are starting..."
echo "🌐 Main Frontend: http://localhost:5173"
echo "👤 Super Admin: http://localhost:5174"
echo ""
echo "Press Ctrl+C to stop all servers"
wait
