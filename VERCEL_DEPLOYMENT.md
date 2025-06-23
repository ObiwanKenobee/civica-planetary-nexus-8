# CIVICA 144 Vercel Deployment Guide

## 🚀 Production Deployment Setup

This guide ensures your CIVICA 144 platform deploys correctly on Vercel with full functionality and zero routing errors.

## 🔧 Vercel Configuration

### 1. Environment Variables Setup

In your Vercel dashboard, add these environment variables:

```bash
# Required for Vercel deployment
NODE_ENV=production
VITE_APP_ENVIRONMENT=production

# Payment Security (Use Vercel Secrets)
VITE_PAYSTACK_PUBLIC_KEY=pk_live_6dcd0c152d43e1f2c0d004d6fdbe3e9fa1e67812
PAYSTACK_SECRET_KEY=sk_live_9b6499452f39bca443250eb08edbf9285ce7f2c0
VITE_PAYPAL_CLIENT_ID=ARZQ__plfO77HymSNkCFPFpAmYJ0rlAlJ0mnq58_qHy4W9K7adf2mJs12xrYEDn3IQWxBMSXJnFqmnei
PAYPAL_CLIENT_SECRET=EBvNxIzZVwak6PyIr7ywIzSeIMfU5PBsPpU0vwEhZgCzvQ5LTPJdigMVaWgR400fdFsGpIVnUK5jdPKO

# Security Configuration
VITE_ENCRYPTION_KEY=CIVICA_144_SACRED_ENCRYPTION_KEY_2024
VITE_WEBHOOK_SECRET=CIVICA_SACRED_WEBHOOK_VERIFICATION_SECRET
VITE_CSP_NONCE=CIVICA_144_CSP_NONCE
VITE_CORS_ORIGIN=https://your-domain.vercel.app

# Optional Configuration
VITE_RATE_LIMIT_WINDOW=900000
VITE_RATE_LIMIT_MAX_REQUESTS=100
```

### 2. Domain Configuration

1. **Custom Domain**: Set up your custom domain in Vercel dashboard
2. **SSL**: Automatically handled by Vercel
3. **Redirects**: Configured in `vercel.json`

## 📁 File Structure Verification

Ensure these critical files exist:

```
✅ vercel.json - SPA routing configuration
✅ .vercelignore - Deployment optimization
✅ vite.config.ts - Build optimization
✅ src/components/ErrorBoundary.tsx - Error handling
✅ src/components/PageNotFound.tsx - 404 handling
✅ src/components/LoadingSpinner.tsx - Loading states
```

## 🔄 Deployment Steps

### 1. Connect Repository

```bash
# Link your repository to Vercel
npx vercel --prod
```

### 2. Environment Secrets

```bash
# Add secrets via Vercel CLI
vercel env add PAYSTACK_SECRET_KEY
vercel env add PAYPAL_CLIENT_SECRET
vercel env add VITE_ENCRYPTION_KEY
```

### 3. Deploy

```bash
# Deploy to production
git push origin main
# Vercel will auto-deploy
```

## 🧪 Testing Deployment

### Routes to Test:

- ✅ `https://your-domain.com/` - Landing page
- ✅ `https://your-domain.com/auth` - Authentication
- ✅ `https://your-domain.com/dashboard` - Main dashboard
- ✅ `https://your-domain.com/ritual-technologist` - Services page
- ✅ `https://your-domain.com/billing` - Sacred economy
- ✅ `https://your-domain.com/invalid-route` - 404 handling

### Reload Test:

Each route should work when directly accessed or reloaded.

## 🔒 Security Checklist

### Environment Variables:

- ✅ No hardcoded secrets in code
- ✅ All keys in Vercel environment variables
- ✅ Production environment properly set
- ✅ CORS origins configured for domain

### Headers Applied:

- ✅ X-Content-Type-Options: nosniff
- ✅ X-Frame-Options: DENY
- ✅ X-XSS-Protection: 1; mode=block
- ✅ Strict-Transport-Security: enabled
- ✅ Referrer-Policy: configured

## 🏗️ Build Optimization

### Automatic Optimizations:

- **Code Splitting**: Vendor, router, and UI chunks
- **Tree Shaking**: Unused code removal
- **Minification**: Production-ready size
- **Caching**: Static assets cached for 1 year

### Performance Targets:

- **First Load**: < 3 seconds
- **Interactive**: < 5 seconds
- **Bundle Size**: < 1MB gzipped main chunk
- **Lighthouse Score**: > 90

## 🐛 Common Issues & Solutions

### 1. Route Not Found (404 on reload)

**Cause**: SPA routing not configured
**Solution**: Ensure `vercel.json` has rewrite rules

### 2. Environment Variables Not Working

**Cause**: Variables not prefixed with `VITE_`
**Solution**: Client variables must start with `VITE_`

### 3. Payment Integration Failing

**Cause**: Wrong environment or missing secrets
**Solution**: Verify all payment env vars are set correctly

### 4. Large Bundle Size Warning

**Cause**: Inefficient imports or large dependencies
**Solution**: Code splitting configured in `vite.config.ts`

## 📊 Monitoring & Analytics

### Vercel Analytics:

- Enable Vercel Analytics in dashboard
- Monitor Core Web Vitals
- Track page performance

### Error Tracking:

- ErrorBoundary captures React errors
- Console errors in development mode
- Production error logging ready

## 🔄 Continuous Deployment

### Auto-Deploy Triggers:

- ✅ Push to `main` branch
- ✅ Pull request previews
- ✅ Environment variable changes

### Deployment Hooks:

- Pre-build: Dependency installation
- Build: Optimized production build
- Post-build: Asset optimization

## 🌐 Multi-Environment Setup

### Staging Environment:

```bash
# Deploy to staging
vercel --target staging
```

### Production Environment:

```bash
# Deploy to production
vercel --target production
```

## 💡 Performance Tips

### 1. Image Optimization:

- Use Vercel Image Optimization
- Serve WebP format when supported
- Lazy load images below fold

### 2. Caching Strategy:

- Static assets: 1 year cache
- HTML: No cache (for updates)
- API responses: Custom cache headers

### 3. Bundle Optimization:

- Dynamic imports for large components
- Tree shake unused dependencies
- Preload critical resources

## 🚨 Troubleshooting

### Build Failures:

1. Check TypeScript errors: `npx tsc --noEmit`
2. Verify environment variables
3. Review build logs in Vercel dashboard

### Runtime Errors:

1. Check ErrorBoundary catches
2. Verify API endpoints
3. Test payment integrations

### Performance Issues:

1. Analyze bundle with Vercel Bundle Analyzer
2. Optimize images and assets
3. Review network waterfall

## 📞 Support Resources

- **Vercel Documentation**: https://vercel.com/docs
- **CIVICA 144 Issues**: Check project repository
- **Payment Provider Docs**: Paystack & PayPal official docs

---

## ✅ Deployment Checklist

Before going live:

- [ ] All environment variables configured
- [ ] Custom domain set up with SSL
- [ ] All routes tested (including reload)
- [ ] Payment integration tested
- [ ] Error boundaries working
- [ ] 404 page displays correctly
- [ ] Loading states functional
- [ ] Mobile responsiveness verified
- [ ] Performance benchmarks met
- [ ] Security headers applied

**🎉 Your CIVICA 144 platform is ready for planetary deployment!**

_Sacred technology serving the highest good, now available to all beings worldwide._
