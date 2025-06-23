#!/bin/bash

# CIVICA 144 - Vercel Build Script
# Custom build script for optimal Vercel deployment

set -e

echo "🌟 Starting CIVICA 144 Vercel Build..."

# Set build environment
export NODE_ENV=production
export VITE_APP_ENVIRONMENT=production
export VITE_DEPLOYMENT_PLATFORM=vercel
export VITE_BUILD_TIME=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# Install dependencies with npm ci for faster, reliable builds
echo "📦 Installing dependencies..."
npm ci --prefer-offline --no-audit

# Type check
echo "🔍 Running type check..."
npm run type-check

# Build the application
echo "🏗️ Building application..."
npm run build

# Verify build output
echo "✅ Verifying build output..."
if [ ! -d "dist" ]; then
  echo "❌ Build failed: dist directory not found"
  exit 1
fi

if [ ! -f "dist/index.html" ]; then
  echo "❌ Build failed: index.html not found in dist"
  exit 1
fi

# Calculate build size
BUILD_SIZE=$(du -sh dist/ | cut -f1)
echo "📊 Build size: $BUILD_SIZE"

# Security check for sensitive files
echo "🔒 Running security checks..."
if find dist/ -name "*.env*" -o -name "*secret*" -o -name "*key*" | grep -v ".js" | grep -v ".css" | head -1; then
  echo "��️ Warning: Potential sensitive files found in build output"
fi

echo "🎉 CIVICA 144 build completed successfully!"
echo "🚀 Ready for Vercel deployment"
