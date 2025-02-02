import { type Company } from "@/types/company";

export const technologyCompanies: Company[] = [
  {
    name: "Apple Inc.",
    description: "Global technology company specializing in consumer electronics, software, and services.",
    isAmerican: true,
    revenue: "$394.3B (2023)",
    employees: "164,000+",
    headquarters: "Cupertino, California",
    foundedYear: 1976,
    sector: "Technology",
    subsector: "Consumer Electronics",
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
    subsector: "Enterprise Software",
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
  }
];