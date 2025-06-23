#!/bin/bash

# CIVICA 144 Build Script for Vercel
# Optimized build process for production deployment

set -e

echo "🌟 CIVICA 144 - Sacred Build Process Initiated"

# Clean previous builds
echo "🧹 Cleaning previous sacred artifacts..."
rm -rf dist
rm -rf node_modules/.vite

# Install dependencies with exact versions
echo "📦 Installing sacred dependencies..."
npm ci --silent

# TypeScript type checking
echo "🔍 Validating sacred code integrity..."
npx tsc --noEmit

# Build optimization
echo "🏗️ Building sacred technology..."
export NODE_ENV=production
export VITE_APP_ENVIRONMENT=production

# Build with optimizations
npm run build

# Verify build output
echo "✅ Verifying sacred build artifacts..."
if [ ! -d "dist" ]; then
  echo "❌ Build failed - dist directory not found"
  exit 1
fi

if [ ! -f "dist/index.html" ]; then
  echo "❌ Build failed - index.html not found"
  exit 1
fi

# Calculate build size
BUILD_SIZE=$(du -sh dist | cut -f1)
echo "📊 Sacred build size: $BUILD_SIZE"

# Generate build info
cat > dist/build-info.json << EOF
{
  "buildTime": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "environment": "production",
  "platform": "vercel",
  "size": "$BUILD_SIZE",
  "version": "$(node -p "require('./package.json').version")",
  "commit": "${VERCEL_GIT_COMMIT_SHA:-local}",
  "sacred": true
}
EOF

echo "🎉 Sacred build complete! Ready for planetary deployment."
echo "🌍 Size: $BUILD_SIZE | Environment: production | Platform: Vercel"
