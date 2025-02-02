import { type Alternative, type SupplyChainNode } from "@/types/company";

export interface Company {
  name: string;
  description: string;
  isAmerican: boolean;
  revenue: string;
  employees: string;
  headquarters: string;
  foundedYear: number;
  supplyChain: SupplyChainNode[];
  alternatives: Alternative[];
  sector: string;
}

export const companies: Company[] = [
  {
    name: "Apple Inc.",
    description: "Global technology company specializing in consumer electronics, software, and services.",
    isAmerican: true,
    revenue: "$394.3B (2023)",
    employees: "164,000+",
    headquarters: "Cupertino, California",
    foundedYear: 1976,
    sector: "Technology",
    supplyChain: [
      { location: "China", type: "Manufacturing", percentage: 60 },
      { location: "USA", type: "R&D", percentage: 20 },
      { location: "Taiwan", type: "Components", percentage: 15 },
      { location: "Other", type: "Various", percentage: 5 }
    ],
    alternatives: [
      {
        name: "Samsung Electronics",
        country: "South Korea",
        description: "Leading manufacturer of electronics and digital media devices",
        marketShare: "20% Global Smartphone Market",
        sustainability: "Carbon Neutral by 2030"
      },
      {
        name: "Sony Corporation",
        country: "Japan",
        description: "Consumer and professional electronics, gaming, entertainment",
        marketShare: "15% Global Electronics Market",
        sustainability: "100% Renewable Energy by 2030"
      }
    ]
  },
  {
    name: "Microsoft Corporation",
    description: "Technology corporation specializing in software, cloud computing, and AI.",
    isAmerican: true,
    revenue: "$211.9B (2023)",
    employees: "221,000+",
    headquarters: "Redmond, Washington",
    foundedYear: 1975,
    sector: "Technology",
    supplyChain: [
      { location: "USA", type: "Software Development", percentage: 45 },
      { location: "India", type: "IT Services", percentage: 30 },
      { location: "Ireland", type: "Data Centers", percentage: 15 },
      { location: "Other", type: "Various", percentage: 10 }
    ],
    alternatives: [
      {
        name: "SAP SE",
        country: "Germany",
        description: "Enterprise software and cloud solutions provider",
        marketShare: "23% Enterprise Software Market",
        sustainability: "Net Zero by 2030"
      }
    ]
  },
  {
    name: "Walmart Inc.",
    description: "Multinational retail corporation operating hypermarkets and grocery stores.",
    isAmerican: true,
    revenue: "$611.3B (2023)",
    employees: "2.1M+",
    headquarters: "Bentonville, Arkansas",
    foundedYear: 1962,
    sector: "Retail",
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
    name: "ExxonMobil",
    description: "Multinational oil and gas corporation.",
    isAmerican: true,
    revenue: "$398.7B (2023)",
    employees: "62,000+",
    headquarters: "Irving, Texas",
    foundedYear: 1999,
    sector: "Energy",
    supplyChain: [
      { location: "USA", type: "Production", percentage: 45 },
      { location: "Middle East", type: "Extraction", percentage: 30 },
      { location: "Africa", type: "Operations", percentage: 15 },
      { location: "Other", type: "Various", percentage: 10 }
    ],
    alternatives: [
      {
        name: "Shell plc",
        country: "United Kingdom",
        description: "Multinational oil and gas company",
        marketShare: "12% Global Oil Market",
        sustainability: "Net Zero by 2050"
      }
    ]
  },
  {
    name: "Johnson & Johnson",
    description: "Healthcare and pharmaceutical company.",
    isAmerican: true,
    revenue: "$94.9B (2023)",
    employees: "152,700+",
    headquarters: "New Brunswick, New Jersey",
    foundedYear: 1886,
    sector: "Healthcare",
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
  }
];