import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TariffCalculator } from '../../scripts/tariff-calculator/calculator';
import type { TradeCalculation, CalculationResult } from '../../scripts/tariff-calculator/types';
import { hsCodes } from '@/data/hs-codes.ts';

interface FieldInfo {
  label: string;
  description: string;
}

const fieldInfo: Record<string, FieldInfo> = {
  hsCode: {
    label: "HS Code",
    description: "Harmonized System code - a standardized numerical method of classifying traded products. E.g., '84' for machinery, '85' for electrical equipment."
  },
  productValue: {
    label: "Product Value",
    description: "The declared value of the goods being imported, excluding freight and insurance costs."
  },
  freightCosts: {
    label: "Freight Costs",
    description: "Costs associated with transporting the goods from origin to destination."
  },
  insuranceCosts: {
    label: "Insurance Costs",
    description: "Costs of insuring the goods during transit."
  },
  annualVolume: {
    label: "Annual Trade Volume",
    description: "Estimated total value of trade over a year. Used to calculate economic impact."
  },
  tariffAmount: {
    label: "Tariff Amount",
    description: "The total duty charged on the imported goods, calculated as a percentage of the dutiable value (product value + freight + insurance)."
  },
  effectiveRate: {
    label: "Effective Tariff Rate",
    description: "The actual tariff rate as a percentage of the product value, accounting for all costs."
  },
  jobsAffected: {
    label: "Jobs Affected",
    description: "Estimated number of jobs impacted by trade reduction due to tariffs."
  },
  revenueImpact: {
    label: "Revenue Impact",
    description: "Projected annual revenue loss due to trade reduction and increased costs."
  },
  marketShareImpact: {
    label: "Market Share Impact",
    description: "Estimated percentage of market share that could be lost due to competitive disadvantage."
  },
  competitivenessScore: {
    label: "Competitiveness Score",
    description: "Overall impact on competitive position (0-100). Considers tariff burden (40%), market share loss (30%), and employment impact (30%). Higher score means better competitive position."
  }
};

const InfoLabel = ({ fieldName }: { fieldName: string }) => (
  <div className="flex items-center gap-2">
    <Label htmlFor={fieldName}>{fieldInfo[fieldName].label}</Label>
    <HoverCard>
      <HoverCardTrigger>
        <InfoCircledIcon className="h-4 w-4 text-gray-500" />
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <p className="text-sm">{fieldInfo[fieldName].description}</p>
      </HoverCardContent>
    </HoverCard>
  </div>
);

const fromCountries = [
  { code: 'CA', name: 'Canada' },
  { code: 'MX', name: 'Mexico' },
  { code: 'CN', name: 'China' }
];

export default function Calculator() {
  const [calculation, setCalculation] = useState<TradeCalculation>({
    countryFrom: '',
    countryTo: 'US', // Always US as destination
    productValue: 0,
    hsCode: '',
    freightCosts: 0,
    insuranceCosts: 0,
    currency: 'USD',
    annualVolume: 0,
  });

  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleCalculate = () => {
    try {
      const calculator = new TariffCalculator();
      const result = calculator.calculateTotalLandedCost(calculation);
      setResult(result);
    } catch (error) {
      console.error('Calculation error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">Trade War Impact Calculator</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Trade Details</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="countryFrom">From Country</Label>
                  <Select
                    value={calculation.countryFrom}
                    onValueChange={(value) => setCalculation(prev => ({ ...prev, countryFrom: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {fromCountries.map(country => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="countryTo">To Country</Label>
                  <Input
                    id="countryTo"
                    value="United States"
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <InfoLabel fieldName="hsCode" />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between text-left font-normal"
                    >
                      {calculation.hsCode ? (
                        <div className="flex flex-col gap-1">
                          <div className="font-medium">
                            {hsCodes.find(h => h.code === calculation.hsCode)?.title || "Select HS code"}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Code: {calculation.hsCode}
                          </div>
                        </div>
                      ) : (
                        "Search and select HS code..."
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search HS codes..." />
                      <CommandEmpty>No HS code found.</CommandEmpty>
                      <CommandGroup heading={`${hsCodes.length} Common HS Codes Available`} className="max-h-[300px] overflow-auto">
                        {hsCodes.map((hsCode) => (
                          <CommandItem
                            key={hsCode.code}
                            value={`${hsCode.code} ${hsCode.title} ${hsCode.description}`}
                            onSelect={() => {
                              setCalculation(prev => ({ ...prev, hsCode: hsCode.code }));
                            }}
                            className="flex flex-col gap-1 py-3"
                          >
                            <div className="font-medium">{hsCode.title}</div>
                            <div className="text-sm text-muted-foreground">Code: {hsCode.code}</div>
                            <div className="text-xs text-muted-foreground">{hsCode.description}</div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                      <div className="p-2 text-xs text-muted-foreground border-t">
                        <a 
                          href="https://www.trade.gov/harmonized-system-hs-codes" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          View full HS Code database (5,000+ codes)
                        </a>
                      </div>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <InfoLabel fieldName="productValue" />
                <Input
                  id="productValue"
                  type="number"
                  placeholder="Enter value"
                  value={calculation.productValue || ''}
                  onChange={(e) => setCalculation(prev => ({ ...prev, productValue: Number(e.target.value) }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <InfoLabel fieldName="freightCosts" />
                  <Input
                    id="freightCosts"
                    type="number"
                    placeholder="Enter freight costs"
                    value={calculation.freightCosts || ''}
                    onChange={(e) => setCalculation(prev => ({ ...prev, freightCosts: Number(e.target.value) }))}
                  />
                </div>

                <div className="space-y-2">
                  <InfoLabel fieldName="insuranceCosts" />
                  <Input
                    id="insuranceCosts"
                    type="number"
                    placeholder="Enter insurance costs"
                    value={calculation.insuranceCosts || ''}
                    onChange={(e) => setCalculation(prev => ({ ...prev, insuranceCosts: Number(e.target.value) }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <InfoLabel fieldName="annualVolume" />
                <Input
                  id="annualVolume"
                  type="number"
                  placeholder="Enter annual volume"
                  value={calculation.annualVolume || ''}
                  onChange={(e) => setCalculation(prev => ({ ...prev, annualVolume: Number(e.target.value) }))}
                />
              </div>

              <Button 
                className="w-full mt-4" 
                onClick={handleCalculate}
                disabled={!calculation.countryFrom || !calculation.hsCode || !calculation.productValue}
              >
                Calculate Impact
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Impact Analysis</h2>
            
            {result ? (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">Cost Breakdown</h3>
                    <HoverCard>
                      <HoverCardTrigger>
                        <InfoCircledIcon className="h-4 w-4 text-gray-500" />
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <p className="text-sm">Detailed breakdown of all costs involved in the import transaction.</p>
                      </HoverCardContent>
                    </HoverCard>
                  </div>

                  {result.breakdown.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-600">{item.description}</span>
                      <span className="font-semibold">
                        USD {item.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center font-bold">
                      <span>Total Landed Cost</span>
                      <span className="text-primary">
                        USD {result.totalLandedCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span>Effective Tariff Rate</span>
                        <HoverCard>
                          <HoverCardTrigger>
                            <InfoCircledIcon className="h-4 w-4 text-gray-500" />
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80">
                            <p className="text-sm">{fieldInfo.effectiveRate.description}</p>
                          </HoverCardContent>
                        </HoverCard>
                      </div>
                      <span className="text-primary">
                        {Math.min(result.effectiveRate * 100, 999.99).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>

                {result.economicImpact && (
                  <div className="space-y-4 border-t pt-4">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">Economic Impact</h3>
                      <HoverCard>
                        <HoverCardTrigger>
                          <InfoCircledIcon className="h-4 w-4 text-gray-500" />
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <p className="text-sm">Analysis of broader economic effects including jobs, revenue, and market competitiveness.</p>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="p-4 bg-muted">
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-gray-600">Jobs Affected</div>
                          <HoverCard>
                            <HoverCardTrigger>
                              <InfoCircledIcon className="h-4 w-4 text-gray-500" />
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80">
                              <p className="text-sm">{fieldInfo.jobsAffected.description}</p>
                            </HoverCardContent>
                          </HoverCard>
                        </div>
                        <div className="text-2xl font-bold text-red-500">
                          {result.economicImpact.jobsAffected.toLocaleString()}
                        </div>
                      </Card>
                      
                      <Card className="p-4 bg-muted">
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-gray-600">Revenue Impact</div>
                          <HoverCard>
                            <HoverCardTrigger>
                              <InfoCircledIcon className="h-4 w-4 text-gray-500" />
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80">
                              <p className="text-sm">{fieldInfo.revenueImpact.description}</p>
                            </HoverCardContent>
                          </HoverCard>
                        </div>
                        <div className="text-2xl font-bold text-amber-500">
                          USD {(result.economicImpact.revenueImpact / 1000000).toFixed(1)}M
                        </div>
                      </Card>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span>Market Share Impact</span>
                          <HoverCard>
                            <HoverCardTrigger>
                              <InfoCircledIcon className="h-4 w-4 text-gray-500" />
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80">
                              <p className="text-sm">{fieldInfo.marketShareImpact.description}</p>
                            </HoverCardContent>
                          </HoverCard>
                        </div>
                        <span className="text-amber-500">
                          {(result.economicImpact.marketShareImpact * 100).toFixed(1)}%
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span>Competitiveness Score</span>
                          <HoverCard>
                            <HoverCardTrigger>
                              <InfoCircledIcon className="h-4 w-4 text-gray-500" />
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80">
                              <p className="text-sm">{fieldInfo.competitivenessScore.description}</p>
                            </HoverCardContent>
                          </HoverCard>
                        </div>
                        <span className={`font-bold ${
                          result.economicImpact.competitivenessScore > 70 ? 'text-green-500' :
                          result.economicImpact.competitivenessScore > 40 ? 'text-amber-500' :
                          'text-red-500'
                        }`}>
                          {result.economicImpact.competitivenessScore.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-500">
                Enter trade details and click Calculate to see impact analysis
              </div>
            )}
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
