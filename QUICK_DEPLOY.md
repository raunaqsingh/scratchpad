# Quick Deploy to Vercel - Step by Step

## Option 1: Deploy via Vercel Dashboard (Easiest - 2 minutes)

1. **Go to [vercel.com](https://vercel.com) and sign in**

2. **Click "Add New Project"**

3. **Connect your GitHub account** (if not already connected)
   - Click "Import Git Repository"
   - Authorize Vercel to access your GitHub

4. **Push this project to GitHub:**
   ```bash
   # In your terminal, navigate to the project:
   cd /Users/raunaqsingh/Cursor/pdp
   
   # Initialize git (if not done):
   git init
   git add .
   git commit -m "Initial commit - Roam Homeowner Dashboard"
   
   # Create a new repo on GitHub, then:
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

5. **In Vercel dashboard:**
   - Select your newly pushed repository
   - Vercel will auto-detect Next.js
   - Click "Deploy"
   - Wait 1-2 minutes
   - **Done!** Your app will be live at `your-project.vercel.app`

## Option 2: Deploy via Vercel CLI (5 minutes)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Navigate to project:**
   ```bash
   cd /Users/raunaqsingh/Cursor/pdp
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Login if needed
   - Accept defaults
   - Your app will deploy!

4. **For production deployment:**
   ```bash
   vercel --prod
   ```

## Option 3: Deploy from GitHub (If already on GitHub)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Click Deploy
4. Done!

## After Deployment

Your app will be available at:
- **Preview URL**: `https://your-project-abc123.vercel.app`
- **Production URL**: `https://your-project.vercel.app` (after setting custom domain)

## Troubleshooting

### Build fails?
- Make sure all files are committed to git
- Check that `package.json` has all dependencies
- Vercel will show build logs

### Need environment variables?
- Go to Project Settings > Environment Variables
- Add any API keys needed
- Redeploy

### Want a custom domain?
- Go to Project Settings > Domains
- Add your domain
- Follow DNS instructions

## That's it!

Your Roam Homeowner Dashboard will be live and shareable in minutes! 🚀

