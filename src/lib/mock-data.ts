import type { Property, MortgageDetails, PropertyValuation, Address } from '@/types/property';

/**
 * Mock market rate data - in production, this would come from Freddie Mac API
 */
export const MOCK_MARKET_RATE = 6.85;

/**
 * Mock neighborhood data
 */
export const MOCK_NEIGHBORHOOD_AVG_RATE = 4.82;
export const MOCK_NEIGHBORHOOD_RATES = [
  2.5, 2.75, 3.0, 3.25, 3.5, 3.75, 4.0, 4.25, 4.5, 4.75,
  5.0, 5.25, 5.5, 5.75, 6.0, 6.25, 6.5, 6.75, 7.0, 7.25,
  3.0, 3.25, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0,
];

/**
 * Mock property data generator
 */
export function createMockProperty(
  address: Address,
  mortgage: Partial<MortgageDetails>
): Property {
  const defaultMortgage: MortgageDetails = {
    loanType: 'FHA',
    isAssumable: true,
    originalAmount: 350000,
    currentBalance: 320000,
    interestRate: 2.75,
    originationDate: new Date('2021-03-15'),
    maturityDate: new Date('2051-03-15'),
    monthlyPayment: 1428,
    lender: 'Quicken Loans',
    ...mortgage,
  };
  
  const estimatedValue = defaultMortgage.originalAmount * 1.4; // 40% appreciation
  
  const valuation: PropertyValuation = {
    currentEstimate: Math.round(estimatedValue),
    estimateDate: new Date(),
    confidenceScore: 'medium',
  };
  
  return {
    id: `prop-${Date.now()}`,
    address,
    characteristics: {
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 1800,
      yearBuilt: 2015,
      propertyType: 'single_family',
    },
    valuation,
    mortgage: defaultMortgage,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

/**
 * Get mock property value for an address
 */
export function getMockPropertyValue(address: Address): number {
  // Simple hash-based value for consistency
  const hash = address.street.length + address.zip.length;
  return 350000 + (hash * 5000) + Math.floor(Math.random() * 100000);
}

