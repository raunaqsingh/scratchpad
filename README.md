# Roam Homeowner Property Dashboard

A modern, production-ready web application that helps homeowners with assumable mortgages understand the dollar value of their low mortgage rates. Built with Next.js 14, React, TypeScript, and Tailwind CSS.

## 🎯 Overview

This dashboard transforms a static asset (a home) into a dynamic financial instrument that homeowners want to monitor regularly. It shows them exactly how valuable their low mortgage rate is to potential buyers, creating engagement and positioning Roam as the obvious choice when they decide to sell.

### Key Features

- **Rate Advantage Calculator**: See how much buyers save with your low rate
- **Equity Tracker**: Visualize your home's value and equity growth over time
- **Interactive Onboarding**: Simple address and mortgage data entry
- **Shareable Rate Cards**: Share your rate advantage on social media
- **Mobile-Responsive Design**: Beautiful UI that works on all devices
- **Real-time Calculations**: Accurate mortgage and equity calculations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- (Optional) Supabase account for production database

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd pdp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── dashboard/          # Dashboard page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home/onboarding page
│   └── globals.css         # Global styles
├── components/
│   ├── dashboard/         # Dashboard components
│   │   ├── rate-advantage-card.tsx
│   │   └── equity-tracker.tsx
│   ├── onboarding/         # Onboarding components
│   │   ├── address-lookup.tsx
│   │   └── mortgage-form.tsx
│   └── ui/                 # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── ...
├── lib/
│   ├── calculations/       # Calculation engines
│   │   ├── mortgage.ts
│   │   ├── rate-advantage.ts
│   │   └── equity.ts
│   ├── mock-data.ts       # Mock data for demo
│   └── utils.ts           # Utility functions
└── types/
    └── property.ts        # TypeScript types
```

## 🎨 Features in Detail

### 1. Rate Advantage Card
- Displays user's rate vs. current market rate
- Shows monthly and lifetime savings
- Rate Advantage Score (1-100) with visual indicator
- Percentile ranking vs. neighbors
- Share functionality

### 2. Equity Tracker
- Current home value and equity
- Equity growth chart over time
- Monthly equity gain tracking
- Comparison to renting scenario

### 3. Onboarding Flow
- Address lookup form
- Mortgage details entry with validation
- Instant results showing rate advantage
- Account creation (demo uses localStorage)

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components (shadcn/ui style)
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **State Management**: React hooks + localStorage (for demo)

## 📊 Calculations

The app includes accurate mortgage calculations:

- **Monthly Payment**: Standard amortization formula
- **Rate Advantage**: Savings from low rate vs. market rate
- **Lifetime Savings**: Total savings over remaining loan term
- **Purchasing Power Boost**: How much more house buyers can afford
- **Equity Tracking**: Home value minus loan balance over time

All calculations are in `src/lib/calculations/`.

## 🎯 Demo Mode

The app currently runs in demo mode using:
- Mock property data
- Mock market rates (6.85%)
- Mock neighborhood data
- localStorage for data persistence

To connect to real APIs:
1. Set up Supabase for database
2. Integrate property data APIs (ATTOM, CoreLogic, etc.)
3. Connect to market rate APIs (Freddie Mac, Mortgage News Daily)
4. Replace localStorage with API calls

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## 🔧 Environment Variables

For production, create a `.env.local` file:

```env
# Supabase (optional for demo)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# Property Data API (optional)
PROPERTY_DATA_API_KEY=your_api_key

# Market Rates API (optional)
MARKET_RATES_API_KEY=your_api_key
```

## 📱 Mobile Responsive

The app is fully responsive and optimized for:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktop (1024px+)

## 🎨 Design System

The app follows a consistent design system:
- **Primary Color**: Blue (#1E40AF)
- **Success Color**: Green (#10B981)
- **Accent Color**: Amber (#F59E0B)
- **Typography**: Inter font family
- **Spacing**: Consistent 4px grid system

## 📈 Future Enhancements

Planned features (from spec):
- Neighborhood rate comparison
- Buyer demand signals
- Scenario calculator
- Activity feed
- Email notifications
- Achievement system
- Referral program

## 🤝 Contributing

This is a demo application built from the Roam Homeowner Dashboard specification. For production use, consider:

1. Adding proper authentication (Supabase Auth, Clerk, etc.)
2. Connecting to real property data APIs
3. Implementing backend API routes
4. Adding email notification service
5. Setting up analytics tracking

## 📄 License

This project is built as a demonstration of the Roam Homeowner Dashboard specification.

## 🙏 Acknowledgments

Built based on the comprehensive product specification document provided.

---

**Built with ❤️ for homeowners with assumable mortgages**

