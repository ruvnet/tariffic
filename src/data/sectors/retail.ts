import { type Company } from "@/types/company";

export const retailCompanies: Company[] = [
  {
    name: "Walmart Inc.",
    description: "Multinational retail corporation operating hypermarkets and grocery stores.",
    isAmerican: true,
    revenue: "$611.3B (2023)",
    employees: "2.1M+",
    headquarters: "Bentonville, Arkansas",
    foundedYear: 1962,
    sector: "Retail",
    subsector: "General Merchandise",
    supplyChain: [
      { location: "China", type: "Manufacturing", percentage: 40 },
      { location: "USA", type: "Distribution", percentage: 35 },
      { location: "Mexico", type: "Production", percentage: 15 },
      { location: "Other", type: "Various", percentage: 10 }
    ],
    alternatives: [
      {
        name: "Carrefour",
        country: "France",
        description: "Global retail and wholesale group",
        marketShare: "15% European Retail Market",
        sustainability: "Zero Food Waste by 2025"
      }
    ]
  },
  {
    name: "Target Corporation",
    description: "Retail corporation offering general merchandise and food products.",
    isAmerican: true,
    revenue: "$109.1B (2023)",
    employees: "440,000+",
    headquarters: "Minneapolis, Minnesota",
    foundedYear: 1902,
    sector: "Retail",
    subsector: "General Merchandise",
    supplyChain: [
      { location: "USA", type: "Distribution", percentage: 45 },
      { location: "Asia", type: "Manufacturing", percentage: 35 },
      { location: "Mexico", type: "Production", percentage: 15 },
      { location: "Other", type: "Various", percentage: 5 }
    ],
    alternatives: [
      {
        name: "Tesco",
        country: "United Kingdom",
        description: "Multinational groceries and general merchandise retailer",
        marketShare: "27% UK Retail Market",
        sustainability: "Net Zero by 2035"
      }
    ]
  }
];