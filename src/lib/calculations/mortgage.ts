/**
 * Calculate monthly mortgage payment using standard amortization formula
 */
export function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  termMonths: number
): number {
  if (termMonths === 0 || annualRate === 0) return principal;
  
  const monthlyRate = annualRate / 100 / 12;
  const payment = principal * 
    (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
    (Math.pow(1 + monthlyRate, termMonths) - 1);
  
  return Math.round(payment * 100) / 100;
}

/**
 * Calculate remaining balance after N payments
 */
export function calculateRemainingBalance(
  originalPrincipal: number,
  annualRate: number,
  termMonths: number,
  paymentsMade: number
): number {
  if (paymentsMade >= termMonths) return 0;
  if (annualRate === 0) {
    return originalPrincipal * (1 - paymentsMade / termMonths);
  }
  
  const monthlyRate = annualRate / 100 / 12;
  const monthlyPayment = calculateMonthlyPayment(originalPrincipal, annualRate, termMonths);
  
  const remainingBalance = originalPrincipal * 
    Math.pow(1 + monthlyRate, paymentsMade) - 
    monthlyPayment * 
    (Math.pow(1 + monthlyRate, paymentsMade) - 1) / monthlyRate;
  
  return Math.max(0, Math.round(remainingBalance * 100) / 100);
}

/**
 * Calculate maximum purchase price a buyer can afford with given monthly payment
 */
export function calculateMaxPurchasePrice(
  targetMonthlyPayment: number,
  annualRate: number,
  termMonths: number,
  downPaymentPercent: number = 20
): number {
  if (annualRate === 0) {
    return (targetMonthlyPayment * termMonths) / (1 - downPaymentPercent / 100);
  }
  
  const monthlyRate = annualRate / 100 / 12;
  const loanAmount = targetMonthlyPayment * 
    (Math.pow(1 + monthlyRate, termMonths) - 1) / 
    (monthlyRate * Math.pow(1 + monthlyRate, termMonths));
  
  return loanAmount / (1 - downPaymentPercent / 100);
}

