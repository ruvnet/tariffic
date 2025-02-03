# Tariff Calculator Implementation Strategy

## System Overview

The tariff calculator will be implemented in two phases:
1. CLI tool for testing formulas and LLM integration
2. React-based UI for real-time calculations and visualizations

## Implementation Strategy

### Phase 1: CLI Implementation

1. **Core Calculator Module**
```typescript
// scripts/tariff-calculator/calculator.ts
export class TariffCalculator {
  calculateTariffAmount(calc: TradeCalculation): number {
    const dutiableValue = calc.productValue + calc.freightCosts + calc.insuranceCosts;
    return dutiableValue * this.getTariffRate(calc);
  }

  calculateTotalLandedCost(calc: TradeCalculation): CalculationResult {
    const tariffAmount = this.calculateTariffAmount(calc);
    const vatAmount = this.calculateVAT(calc, tariffAmount);
    
    return {
      tariffAmount,
      vatAmount,
      totalLandedCost: calc.productValue + calc.freightCosts + 
                      calc.insuranceCosts + tariffAmount + (vatAmount || 0),
      effectiveRate: tariffAmount / calc.productValue,
      breakdown: this.generateBreakdown(calc, tariffAmount, vatAmount)
    };
  }
}
```

2. **CLI Tool Structure**
```
scripts/tariff-calculator/
├── calculator.ts       # Core calculation logic
├── types.ts           # Type definitions
├── llm-service.ts     # LLM integration for HS code lookup
├── rates-service.ts   # Tariff rate data management
├── cli.ts            # Command line interface
└── test/
    ├── calculator.test.ts
    └── fixtures/
        └── sample-data.json
```

3. **CLI Commands**
```typescript
// scripts/tariff-calculator/cli.ts
interface CLIOptions {
  command: 'calculate' | 'lookup-hs' | 'get-rate';
  params: Record<string, any>;
}

const commands = {
  calculate: async (params: TradeCalculation) => {
    const calculator = new TariffCalculator();
    return calculator.calculateTotalLandedCost(params);
  },
  
  'lookup-hs': async (params: { description: string }) => {
    const llmService = new LLMService();
    return llmService.lookupHSCode(params.description);
  },
  
  'get-rate': async (params: { 
    countryFrom: string; 
    countryTo: string; 
    hsCode: string; 
  }) => {
    const ratesService = new RatesService();
    return ratesService.getTariffRate(params);
  }
};
```

4. **LLM Integration**
```typescript
// scripts/tariff-calculator/llm-service.ts
interface LLMResponse {
  hsCode: string;
  confidence: number;
  alternatives?: string[];
}

class LLMService {
  async lookupHSCode(description: string): Promise<LLMResponse> {
    // Integrate with OpenAI or similar LLM service
    // Use prompt engineering to get accurate HS code classifications
    return {
      hsCode: '...',
      confidence: 0.95
    };
  }
}
```

5. **Test Cases**
```typescript
// scripts/tariff-calculator/test/calculator.test.ts
describe('TariffCalculator', () => {
  const testCases = [
    {
      name: 'Mexico to Canada - Textiles',
      input: {
        productValue: 10000,
        freightCosts: 2000,
        insuranceCosts: 500,
        hsCode: '5208.11',
        countryFrom: 'MX',
        countryTo: 'CA',
        currency: 'CAD'
      },
      expected: {
        tariffAmount: 4375,
        totalLandedCost: 16875
      }
    },
    // Additional test cases...
  ];

  testCases.forEach(({ name, input, expected }) => {
    it(`correctly calculates ${name}`, () => {
      const calculator = new TariffCalculator();
      const result = calculator.calculateTotalLandedCost(input);
      expect(result.tariffAmount).toBe(expected.tariffAmount);
      expect(result.totalLandedCost).toBe(expected.totalLandedCost);
    });
  });
});
```

### Phase 2: UI Implementation

After validating the calculations and LLM integration through the CLI tool, we'll proceed with the React UI implementation:

1. **Component Architecture**
```
src/features/tariff-calculator/
├── components/
│   ├── CalculatorForm/
│   │   ├── CountrySelector
│   │   ├── ProductClassification (HS Code)
│   │   ├── ValueInputs
│   │   └── CurrencySelector
│   ├── VisualizationPanel/
│   │   ├── CostBreakdown
│   │   ├── TariffImpactChart
│   │   └── ComparisonView
│   └── ResultsPanel/
│       ├── SummaryMetrics
│       ├── DetailedBreakdown
│       └── ExportOptions
└── services/
    ├── calculator.ts    # Reuse CLI calculator
    ├── llm-service.ts   # Reuse CLI LLM service
    └── rates-service.ts # Reuse CLI rates service
```

2. **State Management**
```typescript
interface CalculatorState {
  currentCalculation: TradeCalculation;
  results: CalculationResult;
  history: CalculationResult[];
  comparisonMode: 'time' | 'country' | 'product';
}
```

## Data Models

```typescript
interface TariffRate {
  countryFrom: string;
  countryTo: string;
  baseRate: number;
  productSpecificRates: {
    hsCode: string;
    rate: number;
  }[];
  effectiveDate: Date;
}

interface TradeCalculation {
  productValue: number;
  freightCosts: number;
  insuranceCosts: number;
  hsCode: string;
  countryFrom: string;
  countryTo: string;
  currency: string;
}

interface CalculationResult {
  tariffAmount: number;
  vatAmount?: number;
  totalLandedCost: number;
  effectiveRate: number;
  breakdown: {
    description: string;
    amount: number;
  }[];
}
```

## Implementation Timeline

1. **Week 1**: CLI Implementation
   - Core calculation engine
   - LLM integration
   - Test suite
   - Command line interface

2. **Week 2**: CLI Testing & Refinement
   - Comprehensive test cases
   - Performance optimization
   - Error handling
   - Documentation

3. **Week 3-4**: UI Implementation
   - Component development
   - State management
   - Integration with CLI services
   - Visualization components

4. **Week 5**: Integration & Testing
   - E2E testing
   - Performance optimization
   - Documentation
   - User feedback

## Dependencies

```json
{
  "required": {
    "@shadcn/ui": "latest",
    "axios": "^1.6.0",
    "commander": "^11.0.0",
    "date-fns": "^2.30.0",
    "openai": "^4.0.0",
    "react-query": "^5.0.0",
    "recharts": "^2.10.0"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "typescript": "^5.0.0",
    "ts-node": "^10.9.0",
    "cypress": "^13.0.0"
  }
}
```

## Testing Strategy

1. **CLI Testing**
   - Unit tests for calculation engine
   - Integration tests for LLM service
   - End-to-end CLI workflow tests
   - Performance benchmarking

2. **UI Testing**
   - Component unit tests
   - Integration tests
   - E2E tests with Cypress
   - Performance monitoring

## Future Enhancements

1. **CLI Enhancements**
   - Batch processing
   - Custom rate tables
   - Export to various formats
   - Rate update automation

2. **UI Enhancements**
   - Advanced visualizations
   - Comparative analysis
   - Bulk import/export
   - Integration with external systems