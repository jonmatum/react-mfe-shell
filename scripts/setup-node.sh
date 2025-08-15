#!/bin/bash

# Setup script to ensure correct Node.js version
echo "Setting up Node.js environment..."

# Check if nvm is installed
if ! command -v nvm &> /dev/null; then
    echo "ERROR: nvm is not installed. Please install nvm first:"
    echo "   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash"
    exit 1
fi

# Source nvm
source ~/.nvm/nvm.sh

# Install and use the correct Node version
echo "Installing Node.js LTS (jod)..."
nvm install lts/jod
nvm use lts/jod
nvm alias default lts/jod

# Verify versions
echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"

# Install dependencies
echo "Installing dependencies..."
npm install

echo "Setup complete! You can now run:"
echo "   npm run dev     # Start development server"
echo "   npm run build   # Build the library"
echo "   npm run test    # Run tests"
