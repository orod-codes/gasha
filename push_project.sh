#!/bin/bash

echo "🚀 Pushing Gasha Project to GitHub..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in the project directory"
    exit 1
fi

# Show current status
echo "📁 Current directory: $(pwd)"
echo "📊 Git status:"
git status --short
echo ""

# Show what will be pushed
echo "📦 Files to push:"
git ls-files | wc -l | xargs echo "Total files:"
echo ""

# Try to push
echo "🔄 Attempting to push to GitHub..."
echo "Repository: https://github.com/orod-codes/gasha.git"
echo ""

# Use token authentication
echo "🔑 You need to authenticate with GitHub:"
echo "1. Go to: https://github.com/settings/tokens"
echo "2. Generate new token (classic) with 'repo' scope"
echo "3. Copy the token"
echo "4. When prompted for password, use the token (not your GitHub password)"
echo ""

read -p "Press Enter when you have your Personal Access Token ready..."

# Try push with explicit authentication
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SUCCESS! Your project has been pushed to GitHub!"
    echo "🌐 View your project at: https://github.com/orod-codes/gasha"
    echo ""
    echo "📋 What was uploaded:"
    echo "   • Complete React/TypeScript application"
    echo "   • Chapa payment integration"
    echo "   • Multiple dashboards (Admin, Developer, Marketing, Super Admin, Technical)"
    echo "   • Chatbot functionality"
    echo "   • Product management system"
    echo "   • Authentication system"
    echo "   • UI components and styling"
    echo "   • All documentation files"
else
    echo ""
    echo "❌ Push failed. Please try again with your Personal Access Token."
    echo "💡 Make sure to use the token as your password when prompted."
fi
