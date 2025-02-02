import { type Company } from "@/types/company";
import { type Product } from "@/types/product";

export const groceryProducts: Product[] = [
  {
    id: "whole-foods-organic-milk",
    name: "365 Organic Whole Milk",
    description: "USDA certified organic whole milk from American dairy farms",
    category: "Organic & Natural Foods",
    subcategory: "Dairy",
    price: "$4.99",
    image: "/products/organic-milk.png",
    usComponents: [
      {
        name: "Organic Milk",
        manufacturer: "Aurora Organic Dairy",
        location: "Boulder, Colorado",
        description: "USDA certified organic milk from American dairy farms",
        percentage: 100,
        certifications: ["USDA Organic", "Animal Welfare Certified"]
      }
    ],
    manufacturingLocation: "USA",
    specifications: {
      "Volume": "1 Gallon",
      "Fat Content": "Whole (3.25%)",
      "Pasteurization": "Ultra-pasteurized"
    },
    sustainability: "Sustainable packaging, supporting local dairy farms"
  },
  {
    id: "kroger-fresh-produce",
    name: "Simple Truth Organic Baby Spinach",
    description: "Fresh organic baby spinach from California farms",
    category: "Fresh Produce",
    subcategory: "Vegetables",
    price: "$3.99",
    image: "/products/organic-spinach.png",
    usComponents: [
      {
        name: "Organic Spinach",
        manufacturer: "California Organic Farms",
        location: "Salinas Valley, California",
        description: "Locally grown organic baby spinach",
        percentage: 100,
        certifications: ["USDA Organic", "California Certified Organic Farmers"]
      }
    ],
    manufacturingLocation: "USA",
    specifications: {
      "Weight": "5 oz",
      "Packaging": "Recyclable plastic",
      "Storage": "Keep refrigerated"
    },
    sustainability: "Zero pesticides, supporting local farmers"
  },
  {
    id: "kroger-private-selection-beef",
    name: "Private Selection Angus Beef Ribeye",
    description: "Premium USDA Choice Angus beef ribeye steak",
    category: "Specialty Foods",
    subcategory: "Meat",
    price: "$16.99/lb",
    image: "/products/ribeye.png",
    usComponents: [
      {
        name: "Angus Beef",
        manufacturer: "Certified Angus Beef LLC",
        location: "Wooster, Ohio",
        description: "Premium quality Angus beef",
        percentage: 100,
        certifications: ["USDA Choice", "Certified Angus Beef"]
      }
    ],
    manufacturingLocation: "USA",
    specifications: {
      "Grade": "USDA Choice",
      "Cut": "Ribeye",
      "Weight": "12-16 oz per steak"
    },
    sustainability: "Sustainably raised cattle"
  },
  {
    id: "whole-foods-365-almonds",
    name: "365 Organic Raw Almonds",
    description: "California-grown organic raw almonds",
    category: "Organic & Natural Foods",
    subcategory: "Nuts & Seeds",
    price: "$7.99",
    image: "/products/almonds.png",
    usComponents: [
      {
        name: "Organic Almonds",
        manufacturer: "Central Valley Almonds",
        location: "Modesto, California",
        description: "Premium organic almonds",
        percentage: 100,
        certifications: ["USDA Organic", "Non-GMO Project Verified"]
      }
    ],
    manufacturingLocation: "USA",
    specifications: {
      "Weight": "16 oz",
      "Type": "Raw",
      "Storage": "Resealable bag"
    },
    sustainability: "Sustainable farming practices"
  },
  {
    id: "safeway-signature-bread",
    name: "Signature Select Artisan Sourdough",
    description: "Fresh-baked artisan sourdough bread",
    category: "Specialty Foods",
    subcategory: "Bakery",
    price: "$4.99",
    image: "/products/sourdough.png",
    usComponents: [
      {
        name: "Wheat Flour",
        manufacturer: "Ardent Mills",
        location: "Denver, Colorado",
        description: "Premium wheat flour",
        percentage: 85,
        certifications: ["Non-GMO Project Verified"]
      },
      {
        name: "Sourdough Starter",
        manufacturer: "Safeway Bakery",
        location: "Various US Locations",
        description: "Proprietary sourdough culture",
        percentage: 15
      }
    ],
    manufacturingLocation: "USA",
    specifications: {
      "Weight": "24 oz",
      "Type": "Sourdough",
      "Baked": "Fresh Daily"
    }
  }
];

export const groceryCompanies: Company[] = [
  {
    name: "Whole Foods Market",
    description: "American multinational supermarket chain focusing on organic and natural foods",
    isAmerican: true,
    revenue: "$16.7B (2023)",
    employees: "105,000+",
    headquarters: "Austin, Texas",
    foundedYear: 1980,
    sector: "Groceries",
    subsector: "Organic & Natural Foods",
    supplyChain: [
      { location: "USA", type: "Local Farming", percentage: 45 },
      { location: "USA", type: "Distribution", percentage: 30 },
      { location: "International", type: "Specialty Items", percentage: 15 },
      { location: "Other", type: "Various", percentage: 10 }
    ],
    alternatives: [
      {
        name: "Sprouts Farmers Market",
        country: "USA",
        description: "Natural and organic food retailer",
        marketShare: "15% Natural Foods Market",
        sustainability: "Zero Food Waste by 2025"
      }
    ]
  },
  {
    name: "The Kroger Co.",
    description: "One of the largest supermarket chains in the United States",
    isAmerican: true,
    revenue: "$148.3B (2023)",
    employees: "420,000+",
    headquarters: "Cincinnati, Ohio",
    foundedYear: 1883,
    sector: "Groceries",
    subsector: "Supermarket Chain",
    supplyChain: [
      { location: "USA", type: "Local Sourcing", percentage: 40 },
      { location: "USA", type: "Manufacturing", percentage: 35 },
      { location: "International", type: "Imports", percentage: 15 },
      { location: "Other", type: "Various", percentage: 10 }
    ],
    alternatives: [
      {
        name: "Albertsons",
        country: "USA",
        description: "Major American grocery company",
        marketShare: "12% US Grocery Market",
        sustainability: "50% Reduction in Food Waste by 2025"
      }
    ]
  },
  {
    name: "Costco Wholesale Corporation",
    description: "Membership-based wholesale club known for bulk sales and quality products",
    isAmerican: true,
    revenue: "$226.9B (2023)",
    employees: "304,000+",
    headquarters: "Issaquah, Washington",
    foundedYear: 1983,
    sector: "Groceries",
    subsector: "Supermarket Chain",
    supplyChain: [
      { location: "USA", type: "Direct Sourcing", percentage: 50 },
      { location: "USA", type: "Manufacturing", percentage: 25 },
      { location: "International", type: "Imports", percentage: 15 },
      { location: "Other", type: "Various", percentage: 10 }
    ],
    alternatives: [
      {
        name: "Sam's Club",
        country: "USA",
        description: "Walmart's membership warehouse club",
        marketShare: "15% Wholesale Club Market",
        sustainability: "Zero Waste by 2025"
      }
    ]
  },
  {
    name: "Safeway Inc.",
    description: "Major American supermarket chain with strong private label brands",
    isAmerican: true,
    revenue: "$46.9B (2023)",
    employees: "250,000+",
    headquarters: "Pleasanton, California",
    foundedYear: 1915,
    sector: "Groceries",
    subsector: "Supermarket Chain",
    supplyChain: [
      { location: "USA", type: "Local Sourcing", percentage: 45 },
      { location: "USA", type: "Manufacturing", percentage: 30 },
      { location: "International", type: "Imports", percentage: 15 },
      { location: "Other", type: "Various", percentage: 10 }
    ],
    alternatives: [
      {
        name: "Publix",
        country: "USA",
        description: "Employee-owned supermarket chain",
        marketShare: "10% Southeast US Market",
        sustainability: "Reduced Food Waste by 30%"
      }
    ]
  },
  {
    name: "Trader Joe's",
    description: "Specialty grocery chain known for unique private label products",
    isAmerican: true,
    revenue: "$16.5B (2023)",
    employees: "50,000+",
    headquarters: "Monrovia, California",
    foundedYear: 1958,
    sector: "Groceries",
    subsector: "Specialty Foods",
    supplyChain: [
      { location: "USA", type: "Private Label", percentage: 55 },
      { location: "USA", type: "Distribution", percentage: 25 },
      { location: "International", type: "Specialty Items", percentage: 15 },
      { location: "Other", type: "Various", percentage: 5 }
    ],
    alternatives: [
      {
        name: "Aldi",
        country: "Germany",
        description: "Discount grocery chain with private labels",
        marketShare: "8% US Grocery Market",
        sustainability: "Plastic-free by 2025"
      }
    ]
  }
];
