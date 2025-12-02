import { calculateMonthlyPayment, calculateMaxPurchasePrice } from './mortgage';
import { calculateRemainingMonths } from '@/lib/utils';
import type { MortgageDetails } from '@/types/property';

export interface RateAdvantageResult {
  currentMarketRate: number;
  rateDifferential: number;
  monthlyPaymentSavings: number;
  lifetimeSavings: number;
  purchasingPowerBoost: number;
  rateAdvantageScore: number;
  neighborhoodPercentile: number;
}

/**
 * Calculate monthly savings from rate difference
 */
export function calculateMonthlySavings(
  balance: number,
  userRate: number,
  marketRate: number,
  remainingMonths: number
): number {
  const userPayment = calculateMonthlyPayment(balance, userRate, remainingMonths);
  const marketPayment = calculateMonthlyPayment(balance, marketRate, remainingMonths);
  return Math.round((marketPayment - userPayment) * 100) / 100;
}

/**
 * Calculate lifetime savings over remaining loan term
 */
export function calculateLifetimeSavings(
  monthlySavings: number,
  remainingMonths: number
): number {
  return Math.round(monthlySavings * remainingMonths);
}

/**
 * Calculate purchasing power boost - how much more house buyer can afford
 */
export function calculatePurchasingPowerBoost(
  targetMonthlyPayment: number,
  userRate: number,
  marketRate: number,
  termMonths: number = 360
): number {
  const maxPriceAtUserRate = calculateMaxPurchasePrice(
    targetMonthlyPayment, userRate, termMonths
  );
  const maxPriceAtMarketRate = calculateMaxPurchasePrice(
    targetMonthlyPayment, marketRate, termMonths
  );
  return Math.round((maxPriceAtUserRate - maxPriceAtMarketRate) * 100) / 100;
}

/**
 * Calculate rate advantage score (1-100)
 */
export function calculateRateAdvantageScore(
  userRate: number,
  marketRate: number,
  neighborhoodAvgRate: number
): number {
  const marketDiff = marketRate - userRate;
  const neighborDiff = neighborhoodAvgRate - userRate;
  
  // Weighted score based on market differential and neighborhood comparison
  const marketScore = Math.min(marketDiff * 15, 50);  // Max 50 points
  const neighborScore = Math.min(neighborDiff * 20, 50);  // Max 50 points
  
  return Math.round(Math.max(0, Math.min(100, marketScore + neighborScore)));
}

/**
 * Calculate percentile rank (0-100) - how many neighbors have higher rates
 */
export function calculatePercentileRank(
  userRate: number,
  neighborhoodRates: number[]
): number {
  if (neighborhoodRates.length === 0) return 50;
  
  const lowerRates = neighborhoodRates.filter(rate => rate > userRate).length;
  return Math.round((lowerRates / neighborhoodRates.length) * 100);
}

/**
 * Main function to calculate all rate advantage metrics
 */
export function calculateRateAdvantage(
  mortgage: MortgageDetails,
  marketRate: number,
  neighborhoodAvgRate: number = marketRate * 0.9, // Default to slightly lower than market
  neighborhoodRates: number[] = []
): RateAdvantageResult {
  const remainingMonths = calculateRemainingMonths(mortgage.maturityDate);
  const monthlySavings = calculateMonthlySavings(
    mortgage.currentBalance,
    mortgage.interestRate,
    marketRate,
    remainingMonths
  );
  
  const lifetimeSavings = calculateLifetimeSavings(monthlySavings, remainingMonths);
  
  // Estimate buyer's target monthly payment (assume they want similar payment)
  const targetPayment = mortgage.monthlyPayment;
  const purchasingPowerBoost = calculatePurchasingPowerBoost(
    targetPayment,
    mortgage.interestRate,
    marketRate
  );
  
  const rateAdvantageScore = calculateRateAdvantageScore(
    mortgage.interestRate,
    marketRate,
    neighborhoodAvgRate
  );
  
  const percentile = neighborhoodRates.length > 0
    ? calculatePercentileRank(mortgage.interestRate, neighborhoodRates)
    : Math.min(95, rateAdvantageScore); // Default high percentile for good rates
  
  return {
    currentMarketRate: marketRate,
    rateDifferential: Math.round((marketRate - mortgage.interestRate) * 100) / 100,
    monthlyPaymentSavings: monthlySavings,
    lifetimeSavings: lifetimeSavings,
    purchasingPowerBoost: purchasingPowerBoost,
    rateAdvantageScore: rateAdvantageScore,
    neighborhoodPercentile: percentile,
  };
}

