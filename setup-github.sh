#!/bin/bash

# This script helps you initialize Git and push your project to GitHub
# It will push your project to https://github.com/dineshmoorthy/selfportfolio

echo "Setting up Git for deployment to GitHub..."

# Check if git is already initialized
if [ -d .git ]; then
  echo "Git repository already initialized."
else
  echo "Initializing Git repository..."
  git init
fi

# Add all files to git
echo "Adding files to Git..."
git add .

# Commit changes
echo "Committing changes..."
echo -n "Enter a commit message (default: 'Update portfolio from Replit'): "
read commit_message
if [ -z "$commit_message" ]; then
  commit_message="Update portfolio from Replit"
fi
git commit -m "$commit_message"

# Check if remote already exists
if git remote | grep -q "origin"; then
  echo "Remote 'origin' already exists. Updating URL..."
  git remote set-url origin https://github.com/dineshmoorthy/selfportfolio.git
else
  echo "Adding remote 'origin'..."
  git remote add origin https://github.com/dineshmoorthy/selfportfolio.git
fi

# Push to GitHub
echo "Pushing to GitHub (you'll need to enter your GitHub credentials)..."
echo "Note: If you have 2FA enabled, use a personal access token as your password."
git push -u origin main

echo ""
echo "Setup complete! Your code has been pushed to GitHub."
echo "GitHub Actions will now automatically deploy your site."
echo "Your site will be available at: https://dineshmoorthy.github.io/selfportfolio/"
echo ""
echo "For more information, see the GITHUB_PAGES_DEPLOYMENT.md file."