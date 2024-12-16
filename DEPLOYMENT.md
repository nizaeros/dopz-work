# DOPZ Work Deployment Guide

## Pre-deployment Checklist

### Environment Variables
- [ ] Ensure `.env` file is properly configured with Supabase credentials
- [ ] Verify environment variables are properly loaded in `vite.config.ts`
- [ ] Check that all environment variables are properly typed in `src/vite-env.d.ts`

### Code Quality
- [ ] Run ESLint to check for code quality issues: `npm run lint`
- [ ] Check for TypeScript errors: `tsc --noEmit`
- [ ] Verify all components are properly typed
- [ ] Ensure no console.log statements in production code
- [ ] Check for unused imports and variables

### Testing
- [ ] Test authentication flow (login, logout, forgot password)
- [ ] Test role-based routing (internal vs external users)
- [ ] Test responsive design on different screen sizes
- [ ] Verify all API calls are working correctly
- [ ] Test error handling and loading states

### Build
- [ ] Run production build locally: `npm run build`
- [ ] Test the production build using: `npm run preview`
- [ ] Verify all assets are loading correctly in production build
- [ ] Check bundle size and optimize if necessary

## Deployment Steps

### GitHub Setup
1. Ensure you have the latest code:
   ```bash
   git checkout main
   git pull origin main
   ```

2. Create a new release branch:
   ```bash
   git checkout -b release/v1.x.x
   ```

3. Build and test:
   ```bash
   npm install
   npm run build
   npm run preview
   ```

4. If everything looks good, merge to main:
   ```bash
   git checkout main
   git merge release/v1.x.x
   git push origin main
   ```

### Netlify Deployment

1. **Connect Repository**
   - Log in to Netlify
   - Click "New site from Git"
   - Choose GitHub and select your repository
   - Choose main branch for production

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18.x (or your preferred version)

3. **Environment Variables**
   - Add all required environment variables in Netlify:
     ```
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     VITE_APP_ENV=production
     ```

4. **Deploy Settings**
   - Enable "Branch deploys" for test branch
   - Configure preview deployments
   - Set up custom domain if needed

5. **Post-deployment**
   - Verify all routes work correctly
   - Check authentication flow
   - Test both internal and external user flows
   - Verify assets and images are loading
   - Check for any console errors

## Branching Strategy

- `main`: Production branch
- `test`: Testing/Staging branch
- `feature/*`: Feature branches
- `release/v*`: Release branches

## Troubleshooting

### Common Issues and Solutions

1. **404 Errors on Routes**
   - Add `_redirects` file in public folder:
     ```
     /* /index.html 200
     ```

2. **Environment Variables Not Loading**
   - Verify environment variables are prefixed with `VITE_`
   - Check if they're properly added in Netlify

3. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are properly installed
   - Check for TypeScript errors

4. **Authentication Issues**
   - Verify Supabase credentials
   - Check CORS settings in Supabase
   - Verify authentication redirects

## Monitoring

- Set up error tracking (e.g., Sentry)
- Configure performance monitoring
- Set up uptime monitoring
- Monitor API usage and limits