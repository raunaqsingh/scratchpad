# Setup Instructions

## Quick Start (5 minutes)

1. **Install Node.js** (if not already installed)
   - Download from [nodejs.org](https://nodejs.org/) (version 18 or higher)
   - Verify installation: `node --version`

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - You should see the onboarding page!

## What You'll See

1. **Home Page** (`/`): Onboarding flow
   - Enter your address
   - Enter mortgage details
   - See instant rate advantage results

2. **Dashboard** (`/dashboard`): Full dashboard view
   - Rate Advantage Card
   - Equity Tracker with charts
   - Buyer Demand section

## Demo Data

The app uses mock data for demonstration:
- Market rate: 6.85%
- Neighborhood average: 4.82%
- Property values are estimated based on address

## Troubleshooting

### "Command not found: npm"
- Install Node.js from [nodejs.org](https://nodejs.org/)

### Port 3000 already in use
- Kill the process using port 3000, or
- Run: `PORT=3001 npm run dev`

### Module not found errors
- Delete `node_modules` and `package-lock.json`
- Run: `npm install` again

### TypeScript errors
- Make sure you're using Node.js 18+
- Run: `npm run build` to check for errors

## Next Steps

1. **Customize the design**: Edit `tailwind.config.ts`
2. **Add real APIs**: Replace mock data in `src/lib/mock-data.ts`
3. **Deploy**: Follow `DEPLOYMENT.md`

## Need Help?

Check the main `README.md` for more details.

