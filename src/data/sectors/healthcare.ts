import { type Company } from "@/types/company";

export const healthcareCompanies: Company[] = [
  {
    name: "Johnson & Johnson",
    description: "Healthcare and pharmaceutical company.",
    isAmerican: true,
    revenue: "$94.9B (2023)",
    employees: "152,700+",
    headquarters: "New Brunswick, New Jersey",
    foundedYear: 1886,
    sector: "Healthcare",
    subsector: "Pharmaceuticals",
    supplyChain: [
      { location: "USA", type: "R&D", percentage: 40 },
      { location: "Europe", type: "Manufacturing", percentage: 30 },
      { location: "Asia", type: "Production", percentage: 20 },
      { location: "Other", type: "Various", percentage: 10 }
    ],
    alternatives: [
      {
        name: "Roche",
        country: "Switzerland",
        description: "Global healthcare company",
        marketShare: "18% Global Pharma Market",
        sustainability: "100% Renewable Energy"
      }
    ]
  },
  {
    name: "Pfizer Inc.",
    description: "Global pharmaceutical corporation.",
    isAmerican: true,
    revenue: "$100.3B (2023)",
    employees: "79,000+",
    headquarters: "New York City, New York",
    foundedYear: 1849,
    sector: "Healthcare",
    subsector: "Pharmaceuticals",
    supplyChain: [
      { location: "USA", type: "R&D", percentage: 35 },
      { location: "Europe", type: "Manufacturing", percentage: 30 },
      { location: "Asia", type: "Production", percentage: 25 },
      { location: "Other", type: "Various", percentage: 10 }
    ],
    alternatives: [
      {
        name: "Novartis",
        country: "Switzerland",
        description: "Multinational pharmaceutical company",
        marketShare: "15% Global Pharma Market",
        sustainability: "Carbon Neutral by 2030"
      }
    ]
  }
];