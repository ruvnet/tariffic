import { type Company } from "@/types/company";
import { type Product } from "@/types/product";

export const consumerProducts: Product[] = [
  {
    id: "nike-aj1",
    name: "Air Jordan 1 Retro High",
    description: "Classic basketball sneaker with modern comfort technology",
    category: "Athletic Apparel & Footwear",
    subcategory: "Footwear",
    price: "$180",
    image: "/products/aj1.png",
    usComponents: [
      {
        name: "Nike Air Cushioning",
        manufacturer: "Nike Inc.",
        location: "Beaverton, Oregon",
        description: "Proprietary air-sole cushioning technology",
        percentage: 30,
        certifications: ["ISO 9001"]
      },
      {
        name: "Performance Leather",
        manufacturer: "Horween Leather Company",
        location: "Chicago, Illinois",
        description: "Premium quality leather upper material",
        percentage: 40
      }
    ],
    manufacturingLocation: "Vietnam",
    specifications: {
      "Upper Material": "Full-grain leather",
      "Sole Type": "Rubber",
      "Closure": "Lace-up"
    }
  },
  {
    id: "nike-dri-fit",
    name: "Nike Dri-FIT Running Shirt",
    description: "Moisture-wicking performance running shirt",
    category: "Athletic Apparel & Footwear",
    subcategory: "Apparel",
    price: "$35",
    image: "/products/dri-fit.png",
    usComponents: [
      {
        name: "Dri-FIT Technology Fabric",
        manufacturer: "Nike Advanced Materials",
        location: "Portland, Oregon",
        description: "Moisture-wicking polyester blend fabric",
        percentage: 60,
        certifications: ["Sustainable Textile Production"]
      }
    ],
    manufacturingLocation: "Mexico",
    specifications: {
      "Material": "100% Recycled Polyester",
      "Fit": "Athletic",
      "Care": "Machine wash"
    },
    sustainability: "Made with recycled materials"
  },
  {
    id: "apple-iphone-15",
    name: "iPhone 15 Pro",
    description: "Latest flagship smartphone with advanced camera system",
    category: "Electronics",
    subcategory: "Smartphones",
    price: "$999",
    image: "/products/iphone-15.png",
    usComponents: [
      {
        name: "A17 Pro Chip",
        manufacturer: "TSMC Arizona",
        location: "Phoenix, Arizona",
        description: "Advanced 3nm process chip",
        percentage: 25,
        certifications: ["ISO 9001", "Energy Star"]
      },
      {
        name: "Ceramic Shield Glass",
        manufacturer: "Corning",
        location: "Harrodsburg, Kentucky",
        description: "Durable front cover glass",
        percentage: 15,
        certifications: ["Impact Resistance Certified"]
      }
    ],
    manufacturingLocation: "China",
    specifications: {
      "Storage": "128GB/256GB/512GB/1TB",
      "Display": "6.1-inch Super Retina XDR",
      "Chip": "A17 Pro",
      "Camera": "48MP Main"
    }
  },
  {
    id: "apple-macbook-pro",
    name: "MacBook Pro 14-inch",
    description: "Professional laptop with M3 Pro chip",
    category: "Electronics",
    subcategory: "Computers",
    price: "$1999",
    image: "/products/macbook-pro.png",
    usComponents: [
      {
        name: "M3 Pro Chip",
        manufacturer: "TSMC Arizona",
        location: "Phoenix, Arizona",
        description: "Advanced silicon chip",
        percentage: 30,
        certifications: ["Energy Star"]
      },
      {
        name: "Display Glass",
        manufacturer: "Corning",
        location: "Harrodsburg, Kentucky",
        description: "Custom display glass",
        percentage: 20
      }
    ],
    manufacturingLocation: "China",
    specifications: {
      "Processor": "M3 Pro",
      "Memory": "16GB/32GB",
      "Storage": "512GB/1TB/2TB",
      "Display": "14.2-inch Liquid Retina XDR"
    }
  },
  {
    id: "pg-tide",
    name: "Tide Original Liquid Detergent",
    description: "Concentrated liquid laundry detergent",
    category: "Home & Lifestyle",
    subcategory: "Laundry Care",
    price: "$12.99",
    image: "/products/tide.png",
    usComponents: [
      {
        name: "Cleaning Enzymes",
        manufacturer: "P&G Manufacturing",
        location: "Lima, Ohio",
        description: "Proprietary enzyme blend",
        percentage: 80,
        certifications: ["EPA Safer Choice"]
      }
    ],
    manufacturingLocation: "USA",
    specifications: {
      "Size": "92 fl oz",
      "Loads": "64 loads",
      "Type": "HE Compatible"
    },
    sustainability: "100% recyclable packaging"
  },
  // New Products
  {
    id: "microsoft-surface-pro9",
    name: "Microsoft Surface Pro 9",
    description: "Versatile 2-in-1 laptop with a vibrant touchscreen display",
    category: "Electronics",
    subcategory: "Computers",
    price: "$1399",
    image: "/products/surface-pro9.png",
    usComponents: [
      {
        name: "Intel i7 Processor",
        manufacturer: "Intel Corporation",
        location: "Santa Clara, California",
        description: "High-performance processor",
        percentage: 35
      },
      {
        name: "PixelSense Display Panel",
        manufacturer: "Microsoft Display",
        location: "Redmond, Washington",
        description: "Vivid display technology",
        percentage: 25
      }
    ],
    manufacturingLocation: "China",
    specifications: {
      "Processor": "Intel i7",
      "Memory": "16GB",
      "Storage": "512GB SSD",
      "Display": "13-inch PixelSense"
    },
    sustainability: "Designed for energy efficiency"
  },
  {
    id: "jj-neutrogena-cleanser",
    name: "Neutrogena Ultra Gentle Cream Cleanser",
    description: "Mild cleanser suitable for sensitive skin",
    category: "Personal Care",
    subcategory: "Skin Care",
    price: "$8.99",
    image: "/products/ultra-gentle-cleanser.png",
    usComponents: [
      {
        name: "Hypoallergenic Formula",
        manufacturer: "Johnson & Johnson",
        location: "New Brunswick, New Jersey",
        description: "Gentle, fragrance-free formula",
        percentage: 100,
        certifications: ["Dermatologist Tested"]
      }
    ],
    manufacturingLocation: "USA",
    specifications: {
      "Volume": "8.5 oz",
      "Type": "Cream Cleanser"
    },
    sustainability: "Recyclable packaging"
  },
  {
    id: "dell-xps-13",
    name: "Dell XPS 13",
    description: "High-performance ultrabook with InfinityEdge display",
    category: "Electronics",
    subcategory: "Computers",
    price: "$1199",
    image: "/products/dell-xps-13.png",
    usComponents: [
      {
        name: "Dell Advanced Cooling",
        manufacturer: "Dell Inc.",
        location: "Round Rock, Texas",
        description: "Efficient thermal management technology",
        percentage: 20,
        certifications: ["Energy Star"]
      },
      {
        name: "InfinityEdge Display",
        manufacturer: "LG Display",
        location: "Deer Park, Texas",
        description: "Bright, energy-efficient display panel",
        percentage: 15,
        certifications: ["Energy Star"]
      }
    ],
    manufacturingLocation: "China",
    specifications: {
      "Processor": "Intel i5",
      "Memory": "8GB",
      "Storage": "256GB SSD",
      "Display": "13.4-inch FHD+"
    },
    sustainability: "Designed for energy efficiency and low power consumption"
  }
];


export const consumerCompanies: Company[] = [
  {
    name: "Nike, Inc.",
    description: "Global leader in athletic footwear, apparel, and sports equipment",
    isAmerican: true,
    revenue: "$44.5B (2023)",
    employees: "79,100+",
    headquarters: "Beaverton, Oregon",
    foundedYear: 1964,
    sector: "Consumer",
    subsector: "Athletic Apparel & Footwear",
    supplyChain: [
      { location: "USA", type: "Design & Development", percentage: 25 },
      { location: "Vietnam", type: "Manufacturing", percentage: 40 },
      { location: "China", type: "Manufacturing", percentage: 25 },
      { location: "Other", type: "Various", percentage: 10 }
    ],
    alternatives: [
      {
        name: "Adidas",
        country: "Germany",
        description: "Multinational athletic wear manufacturer",
        marketShare: "20% Global Athletic Wear",
        sustainability: "100% Recycled Polyester by 2024"
      }
    ]
  },
  {
    name: "Apple Inc.",
    description: "Technology company focusing on consumer electronics and services",
    isAmerican: true,
    revenue: "$394.3B (2023)",
    employees: "164,000+",
    headquarters: "Cupertino, California",
    foundedYear: 1976,
    sector: "Consumer",
    subsector: "Electronics",
    supplyChain: [
      { location: "USA", type: "Design & Development", percentage: 30 },
      { location: "China", type: "Assembly", percentage: 45 },
      { location: "Taiwan", type: "Components", percentage: 15 },
      { location: "Other", type: "Various", percentage: 10 }
    ],
    alternatives: [
      {
        name: "Samsung",
        country: "South Korea",
        description: "Global electronics manufacturer",
        marketShare: "21% Global Smartphone Market",
        sustainability: "100% Renewable Energy by 2025"
      }
    ]
  },
  {
    name: "Procter & Gamble",
    description: "Multinational consumer goods corporation",
    isAmerican: true,
    revenue: "$82.0B (2023)",
    employees: "106,000+",
    headquarters: "Cincinnati, Ohio",
    foundedYear: 1837,
    sector: "Consumer",
    subsector: "Home & Lifestyle",
    supplyChain: [
      { location: "USA", type: "Manufacturing", percentage: 45 },
      { location: "Mexico", type: "Production", percentage: 25 },
      { location: "China", type: "Manufacturing", percentage: 20 },
      { location: "Other", type: "Various", percentage: 10 }
    ],
    alternatives: [
      {
        name: "Unilever",
        country: "United Kingdom/Netherlands",
        description: "Global consumer goods company",
        marketShare: "18% Global Personal Care",
        sustainability: "Net Zero Emissions by 2039"
      }
    ]
  },
  {
    name: "Microsoft Corporation",
    description: "Technology company specializing in software, cloud computing, and consumer electronics",
    isAmerican: true,
    revenue: "$211.9B (2023)",
    employees: "221,000+",
    headquarters: "Redmond, Washington",
    foundedYear: 1975,
    sector: "Consumer",
    subsector: "Electronics",
    supplyChain: [
      { location: "USA", type: "Development", percentage: 40 },
      { location: "China", type: "Manufacturing", percentage: 35 },
      { location: "Taiwan", type: "Components", percentage: 15 },
      { location: "Other", type: "Various", percentage: 10 }
    ],
    alternatives: [
      {
        name: "Sony",
        country: "Japan",
        description: "Multinational technology and entertainment company",
        marketShare: "25% Gaming Console Market",
        sustainability: "100% Renewable Energy by 2030"
      }
    ]
  },
  {
    name: "Johnson & Johnson",
    description: "Healthcare and consumer packaged goods manufacturer",
    isAmerican: true,
    revenue: "$94.9B (2023)",
    employees: "152,700+",
    headquarters: "New Brunswick, New Jersey",
    foundedYear: 1886,
    sector: "Consumer",
    subsector: "Personal Care",
    supplyChain: [
      { location: "USA", type: "Manufacturing", percentage: 50 },
      { location: "Europe", type: "Production", percentage: 25 },
      { location: "Asia", type: "Manufacturing", percentage: 15 },
      { location: "Other", type: "Various", percentage: 10 }
    ],
    alternatives: [
      {
        name: "Reckitt",
        country: "United Kingdom",
        description: "Consumer health and hygiene company",
        marketShare: "15% Global Personal Care",
        sustainability: "Carbon Neutral by 2040"
      }
    ]
  }
];
