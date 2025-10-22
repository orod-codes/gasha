#!/bin/bash

# Script to clean up processes using port 3000
echo "🧹 Cleaning up processes on port 3000..."

# Find processes using port 3000
PIDS=$(lsof -ti:3000 2>/dev/null)

if [ -z "$PIDS" ]; then
    echo "✅ Port 3000 is already free"
    exit 0
fi

echo "🔍 Found processes using port 3000: $PIDS"

# Kill the processes
for PID in $PIDS; do
    echo "🛑 Killing process $PID"
    kill -9 $PID 2>/dev/null
done

# Verify port is free
sleep 1
REMAINING=$(lsof -ti:3000 2>/dev/null)

if [ -z "$REMAINING" ]; then
    echo "✅ Port 3000 is now free"
else
    echo "❌ Some processes still using port 3000: $REMAINING"
    exit 1
fi

