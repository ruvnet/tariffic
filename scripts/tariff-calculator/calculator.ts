import { TradeCalculation, CalculationResult, TariffRate, EconomicImpact } from './types';

export class TariffCalculator {
  private rates: TariffRate[] = [
    // Canada to US (25% retaliatory tariffs)
    {
      countryFrom: 'CA',
      countryTo: 'US',
      baseRate: 0.25,
      productSpecificRates: [
        { hsCode: '72-73', rate: 0.25 }, // Steel
        { hsCode: '76', rate: 0.10 },    // Aluminum
        { hsCode: '84-85', rate: 0.25 }  // Machinery and Electronics
      ],
      effectiveDate: new Date('2025-02-01')
    },
    // Mexico to US (25% general tariff)
    {
      countryFrom: 'MX',
      countryTo: 'US',
      baseRate: 0.25,
      productSpecificRates: [
        { hsCode: '50-63', rate: 0.35 }, // Textiles
        { hsCode: '87', rate: 0.25 },    // Vehicles
        { hsCode: '07-08', rate: 0.25 }  // Vegetables and Fruits
      ],
      effectiveDate: new Date('2025-02-01')
    },
    // China to US (10% universal tariff)
    {
      countryFrom: 'CN',
      countryTo: 'US',
      baseRate: 0.10,
      productSpecificRates: [
        { hsCode: '84-85', rate: 0.25 }, // Electronics
        { hsCode: '94', rate: 0.25 },    // Furniture
        { hsCode: '61-62', rate: 0.25 }  // Apparel
      ],
      effectiveDate: new Date('2025-02-01')
    }
  ];

  // Employment impact factors (jobs per $1M in trade value)
  private employmentFactors = {
    'CA': 5.2,  // Canada
    'MX': 6.8,  // Mexico
    'CN': 4.5   // China
  };

  private getTariffRate(calc: TradeCalculation): number {
    const rate = this.rates.find(r => 
      r.countryFrom === calc.countryFrom && 
      r.countryTo === calc.countryTo
    );

    if (!rate) {
      throw new Error(`No tariff rate found for ${calc.countryFrom} to ${calc.countryTo}`);
    }

    // Check for product specific rates
    const specificRate = rate.productSpecificRates.find(r => 
      calc.hsCode.startsWith(r.hsCode.split('-')[0])
    );

    return specificRate?.rate ?? rate.baseRate;
  }

  private calculateEconomicImpact(calc: TradeCalculation, tariffAmount: number): EconomicImpact {
    const annualVolume = calc.annualVolume || calc.productValue * 12; // Estimate annual if not provided
    const baseEmploymentFactor = this.employmentFactors[calc.countryFrom as keyof typeof this.employmentFactors] || 5.0;
    const employmentFactor = calc.employmentFactor || baseEmploymentFactor;

    // Calculate jobs affected based on trade value reduction
    const tradeReduction = annualVolume * 0.15; // Assume 15% trade reduction due to tariffs
    const jobsAffected = Math.round((tradeReduction / 1000000) * employmentFactor);

    // Calculate revenue impact
    const revenueImpact = tradeReduction + (annualVolume * (tariffAmount / calc.productValue));

    // Calculate market share impact and competitiveness components
    const baseMarketShareImpact = 0.15; // 15% market share loss
    const tariffImpact = Math.min(40, (tariffAmount / calc.productValue) * 100); // Cap at 40 points
    const marketShareComponent = Math.min(30, baseMarketShareImpact * 100); // Cap at 30 points
    const jobsImpact = Math.min(30, (jobsAffected / (annualVolume / 1000000 * employmentFactor)) * 100); // Cap at 30 points
    
    const competitivenessScore = Math.max(0, Math.min(100, 100 - (
      tariffImpact +         // Tariff impact (max 40 points)
      marketShareComponent + // Market share impact (max 30 points)
      jobsImpact            // Employment impact (max 30 points)
    )));

    return {
      jobsAffected,
      revenueImpact,
      marketShareImpact: baseMarketShareImpact,
      competitivenessScore
    };
  }

  private calculateVAT(calc: TradeCalculation, tariffAmount: number): number | undefined {
    // US doesn't have VAT
    return undefined;
  }

  private generateBreakdown(
    calc: TradeCalculation, 
    tariffAmount: number, 
    vatAmount?: number
  ): { description: string; amount: number; }[] {
    const breakdown = [
      { description: 'Product Value', amount: calc.productValue },
      { description: 'Freight Costs', amount: calc.freightCosts },
      { description: 'Insurance Costs', amount: calc.insuranceCosts },
      { description: 'Tariff Amount', amount: tariffAmount }
    ];

    if (vatAmount) {
      breakdown.push({ description: 'VAT', amount: vatAmount });
    }

    return breakdown;
  }

  calculateTariffAmount(calc: TradeCalculation): number {
    const dutiableValue = calc.productValue + calc.freightCosts + calc.insuranceCosts;
    return dutiableValue * this.getTariffRate(calc);
  }

  calculateTotalLandedCost(calc: TradeCalculation): CalculationResult {
    const tariffAmount = this.calculateTariffAmount(calc);
    const vatAmount = this.calculateVAT(calc, tariffAmount);
    const breakdown = this.generateBreakdown(calc, tariffAmount, vatAmount);
    const economicImpact = this.calculateEconomicImpact(calc, tariffAmount);
    
    const totalLandedCost = breakdown.reduce((sum, item) => sum + item.amount, 0);
    
    return {
      tariffAmount,
      vatAmount,
      totalLandedCost,
      effectiveRate: tariffAmount / calc.productValue,
      breakdown,
      economicImpact
    };
  }
}
