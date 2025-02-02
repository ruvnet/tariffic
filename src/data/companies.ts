import { type Company } from "@/types/company";
import { technologyCompanies } from "./sectors/technology";
import { retailCompanies } from "./sectors/retail";
import { healthcareCompanies } from "./sectors/healthcare";

export const companies: Company[] = [
  ...technologyCompanies,
  ...retailCompanies,
  ...healthcareCompanies
];

export const categories = [
  {
    title: "Technology",
    gdp: "2.1T",
    description: "Digital technology, hardware, and software sectors",
    count: technologyCompanies.length,
    subcategories: [
      { name: "Consumer Electronics", gdp: "460B", count: 1 },
      { name: "Enterprise Software", gdp: "380B", count: 1 }
    ]
  },
  {
    title: "Retail",
    gdp: "1.8T",
    description: "Retail and consumer goods sectors",
    count: retailCompanies.length,
    subcategories: [
      { name: "General Merchandise", gdp: "890B", count: 2 }
    ]
  },
  {
    title: "Healthcare",
    gdp: "2.4T",
    description: "Medical services, pharmaceuticals, and healthcare technology",
    count: healthcareCompanies.length,
    subcategories: [
      { name: "Pharmaceuticals", gdp: "580B", count: 2 }
    ]
  }
];