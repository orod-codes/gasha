#!/bin/bash

# Backend Server Startup Script
echo "🚀 Starting Security Service Backend..."

# Check if port 3000 is in use
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 3000 is already in use. Killing existing process..."
    PID=$(lsof -Pi :3000 -sTCP:LISTEN -t)
    kill -9 $PID
    sleep 2
    echo "✅ Freed up port 3000"
fi

# Navigate to backend directory
cd /home/orod/Desktop/project/backend

# Start the development server
echo "🔄 Starting development server..."
npm run dev
