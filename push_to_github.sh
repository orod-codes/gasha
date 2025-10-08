#!/bin/bash

echo "Pushing project to GitHub..."
echo "Repository: https://github.com/orod-codes/gasha.git"
echo ""

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "Error: Not in a git repository"
    exit 1
fi

# Check remote
echo "Checking remote repository..."
git remote -v

echo ""
echo "Attempting to push to GitHub..."
echo "You may be prompted for your GitHub credentials:"
echo "- Username: orod-codes"
echo "- Password: Use your Personal Access Token (not your GitHub password)"
echo ""

# Try to push
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo "Your project is now available at: https://github.com/orod-codes/gasha"
else
    echo ""
    echo "❌ Push failed. You may need to:"
    echo "1. Create a Personal Access Token at https://github.com/settings/tokens"
    echo "2. Use the token as your password when prompted"
    echo "3. Make sure you have write access to the repository"
fi
