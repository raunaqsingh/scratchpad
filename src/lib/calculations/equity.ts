import type { MortgageDetails, PropertyValuation, EquityDataPoint } from '@/types/property';
import { calculateRemainingBalance } from './mortgage';
import { calculateMonthsBetween } from '@/lib/utils';

/**
 * Calculate current equity (home value - loan balance)
 */
export function calculateEquity(
  homeValue: number,
  loanBalance: number
): number {
  return Math.max(0, homeValue - loanBalance);
}

/**
 * Calculate equity percentage
 */
export function calculateEquityPercentage(
  homeValue: number,
  loanBalance: number
): number {
  if (homeValue === 0) return 0;
  return Math.round((calculateEquity(homeValue, loanBalance) / homeValue) * 100);
}

/**
 * Calculate monthly equity gain (principal paydown + appreciation)
 */
export function calculateMonthlyEquityGain(
  currentEquity: number,
  previousEquity: number
): number {
  return currentEquity - previousEquity;
}

/**
 * Generate equity history data points
 */
export function generateEquityHistory(
  mortgage: MortgageDetails,
  valuation: PropertyValuation,
  months: number = 12
): EquityDataPoint[] {
  const history: EquityDataPoint[] = [];
  const now = new Date();
  
  // Start from origination or 12 months ago, whichever is more recent
  const startDate = new Date(now);
  startDate.setMonth(startDate.getMonth() - months);
  const actualStart = startDate > mortgage.originationDate ? startDate : mortgage.originationDate;
  
  const totalMonths = calculateMonthsBetween(actualStart, now);
  const paymentsMadeAtStart = calculateMonthsBetween(mortgage.originationDate, actualStart);
  
  // Estimate home value growth (simple linear for demo)
  const valueGrowth = (valuation.currentEstimate - (mortgage.originalAmount * 1.1)) / totalMonths;
  
  for (let i = 0; i <= totalMonths; i += 1) {
    const date = new Date(actualStart);
    date.setMonth(date.getMonth() + i);
    
    if (date > now) break;
    
    const paymentsMade = paymentsMadeAtStart + i;
    const loanBalance = calculateRemainingBalance(
      mortgage.originalAmount,
      mortgage.interestRate,
      calculateMonthsBetween(mortgage.originationDate, mortgage.maturityDate),
      paymentsMade
    );
    
    // Simple linear appreciation model
    const homeValue = (mortgage.originalAmount * 1.1) + (valueGrowth * i);
    
    history.push({
      date,
      homeValue: Math.round(homeValue),
      loanBalance: Math.round(loanBalance),
      equity: Math.round(homeValue - loanBalance),
    });
  }
  
  return history;
}

