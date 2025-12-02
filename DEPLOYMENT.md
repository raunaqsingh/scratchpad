# Deployment Guide

This guide will help you deploy the Roam Homeowner Dashboard to production.

## Quick Deploy to Vercel

### Option 1: Deploy from GitHub

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-github-repo-url
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js and configure everything
   - Click "Deploy"

3. **Your app will be live!** 🎉

### Option 2: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts to deploy.

## Environment Variables

If you're using external services, add these in Vercel dashboard under Settings > Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

## Custom Domain

1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Build Configuration

Vercel automatically detects Next.js and uses these settings:
- **Build Command**: `next build`
- **Output Directory**: `.next`
- **Install Command**: `npm install` (or `yarn` / `pnpm`)

## Other Deployment Options

### Netlify

1. Connect your GitHub repo
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Deploy!

### AWS Amplify

1. Connect repository
2. Auto-detect Next.js
3. Deploy

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

## Performance Optimization

The app is already optimized with:
- Next.js automatic code splitting
- Image optimization (when using Next.js Image)
- Static generation where possible
- Tailwind CSS purging unused styles

## Monitoring

Consider adding:
- Vercel Analytics (built-in)
- Sentry for error tracking
- Google Analytics for user tracking

## Security Checklist

- [ ] Environment variables are set securely
- [ ] API keys are not exposed in client code
- [ ] HTTPS is enabled (automatic on Vercel)
- [ ] CORS is configured if needed
- [ ] Rate limiting is implemented for APIs

## Troubleshooting

### Build Fails

- Check Node.js version (needs 18+)
- Ensure all dependencies are in package.json
- Check for TypeScript errors: `npm run build`

### Runtime Errors

- Check browser console for errors
- Verify environment variables are set
- Check Vercel function logs

### Performance Issues

- Enable Vercel Analytics
- Check bundle size with `npm run build`
- Optimize images and assets

