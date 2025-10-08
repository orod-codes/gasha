#!/bin/bash

echo "🚀 Uploading ALL files to GitHub..."
echo "Repository: https://github.com/orod-codes/gasha.git"
echo ""

# Show what we're uploading
echo "📦 Files ready to upload:"
git ls-files | wc -l | xargs echo "Total files:"
echo ""

# Try to push with timeout
echo "🔄 Pushing to GitHub..."
timeout 30 git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ SUCCESS! All files uploaded to GitHub!"
    echo "🌐 View at: https://github.com/orod-codes/gasha"
elif [ $? -eq 124 ]; then
    echo "⏰ Push timed out - authentication required"
    echo "💡 You need to authenticate with GitHub first"
else
    echo "❌ Push failed - authentication required"
    echo "💡 Create Personal Access Token at: https://github.com/settings/tokens"
fi
