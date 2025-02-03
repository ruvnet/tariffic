export interface TariffRate {
  countryFrom: string;
  countryTo: string;
  baseRate: number;
  productSpecificRates: {
    hsCode: string;
    rate: number;
  }[];
  effectiveDate: Date;
}

export interface TradeCalculation {
  productValue: number;
  freightCosts: number;
  insuranceCosts: number;
  hsCode: string;
  countryFrom: string;
  countryTo: string;
  currency: string;
  annualVolume?: number; // Annual trade volume for economic impact calculation
  employmentFactor?: number; // Jobs per million in trade value
}

export interface EconomicImpact {
  jobsAffected: number;
  revenueImpact: number;
  marketShareImpact: number;
  competitivenessScore: number;
}

export interface CalculationResult {
  tariffAmount: number;
  vatAmount?: number;
  totalLandedCost: number;
  effectiveRate: number;
  breakdown: {
    description: string;
    amount: number;
  }[];
  economicImpact?: EconomicImpact;
}