# VERCEL DEPLOYMENT FIXES - CIVICA 144

## Issues Fixed

### 1. ✅ Cron Job Expression Error

**Error**: `Expected 5 values, but got 6. (Input cron: '0 */5 * * * *')`
**Fix**: Changed from 6-field (seconds included) to 5-field standard cron format

```json
// Before: "0 */5 * * * *" (6 fields)
// After:  "*/5 * * * *"   (5 fields - runs every 5 minutes)
```

### 2. ✅ Environment Variables

**Issue**: Invalid placeholder variables that would cause deployment failures
**Fix**: Removed invalid @ placeholders and streamlined environment configuration

```json
// Removed problematic variables:
// "VITE_BUILD_TIME": "@build_time"
// "VITE_ENCRYPTION_KEY": "@encryption_key"
// etc.
```

### 3. ✅ API Routes Compatibility

**Issue**: TypeScript API routes might not work properly in Vercel
**Fix**: Created JavaScript equivalents in `/api` directory

- `api/health.js` - Simple health check endpoint
- `api/metrics.js` - Basic metrics endpoint

### 4. ✅ Node.js Version Specification

**Fix**: Added explicit Node.js version specification

- `.nvmrc` file with Node 18.18.0
- Updated `package.json` engines specification
- Added runtime specification in vercel.json functions

### 5. ✅ Build Optimization

**Fix**: Enhanced build configuration for Vercel

- Updated build command to use production-specific script
- Created `.vercelignore` for optimized deployments
- Added memory and runtime specifications for functions

### 6. ✅ Function Configuration

**Fix**: Improved Vercel function settings

```json
"functions": {
  "src/api/health.ts": {
    "maxDuration": 10,
    "memory": 256,
    "runtime": "nodejs18.x"
  },
  "src/api/metrics.ts": {
    "maxDuration": 15,
    "memory": 256,
    "runtime": "nodejs18.x"
  }
}
```

## New Cron Jobs Configuration

```json
"crons": [
  {
    "path": "/api/health",
    "schedule": "*/5 * * * *"    // Every 5 minutes
  },
  {
    "path": "/api/metrics",
    "schedule": "*/15 * * * *"   // Every 15 minutes
  }
]
```

## Deployment Checklist

- [x] Cron expressions use 5-field format
- [x] Environment variables are valid
- [x] API routes are JavaScript-compatible
- [x] Node.js version is specified
- [x] Build command is optimized
- [x] Functions have proper configuration
- [x] .vercelignore excludes unnecessary files
- [x] Security headers are configured
- [x] CORS is properly set up

## Test Endpoints After Deployment

- `GET /api/health` - Health check endpoint
- `GET /api/metrics` - Metrics endpoint (JSON)
- `GET /api/metrics?format=prometheus` - Prometheus format

## Environment Variables to Set in Vercel Dashboard

**Required for production:**

- `VITE_PAYSTACK_PUBLIC_KEY` - Paystack public key
- `VITE_PAYPAL_CLIENT_ID` - PayPal client ID
- `PAYSTACK_SECRET_KEY` - Paystack secret (for API functions)
- `PAYPAL_CLIENT_SECRET` - PayPal secret (for API functions)

**Optional but recommended:**

- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key

## Expected Deployment Results

1. ✅ Build should complete without cron validation errors
2. ✅ Health check should be accessible at `/api/health`
3. ✅ Metrics should be accessible at `/api/metrics`
4. ✅ Cron jobs should execute on schedule
5. ✅ All security headers should be properly applied
6. ✅ Static assets should have proper caching headers

## Monitoring

- Health checks run every 5 minutes via cron
- Metrics collection every 15 minutes
- All API calls are logged for monitoring
- CORS is configured for proper API access
