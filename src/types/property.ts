export interface Address {
  street: string;
  unit?: string;
  city: string;
  state: string;
  zip: string;
  county?: string;
  latitude?: number;
  longitude?: number;
}

export interface PropertyCharacteristics {
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  lotSize?: number;
  yearBuilt: number;
  propertyType: 'single_family' | 'condo' | 'townhouse' | 'multi_family';
  features?: string[];
}

export interface PropertyValuation {
  currentEstimate: number;
  estimateDate: Date;
  confidenceScore: 'low' | 'medium' | 'high';
  priceHistory?: PricePoint[];
  comparables?: Comparable[];
}

export interface PricePoint {
  date: Date;
  value: number;
}

export interface Comparable {
  address: string;
  salePrice: number;
  saleDate: Date;
  distance: number;
}

export interface MortgageDetails {
  loanType: 'FHA' | 'VA' | 'Conventional' | 'USDA';
  isAssumable: boolean;
  originalAmount: number;
  currentBalance: number;
  interestRate: number;
  originationDate: Date;
  maturityDate: Date;
  monthlyPayment: number;
  escrowAmount?: number;
  lender?: string;
  loanNumber?: string;
}

export interface RateAdvantageMetrics {
  currentMarketRate: number;
  rateDifferential: number;
  monthlyPaymentSavings: number;
  lifetimeSavings: number;
  purchasingPowerBoost: number;
  rateAdvantageScore: number;
  neighborhoodPercentile: number;
  lastCalculated: Date;
}

export interface Property {
  id: string;
  address: Address;
  characteristics?: PropertyCharacteristics;
  valuation?: PropertyValuation;
  mortgage?: MortgageDetails;
  rateAdvantage?: RateAdvantageMetrics;
  createdAt: Date;
  updatedAt: Date;
}

export interface EquityDataPoint {
  date: Date;
  homeValue: number;
  loanBalance: number;
  equity: number;
}

