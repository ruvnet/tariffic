import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CategorySection } from "@/components/CategorySection";
import { UnifiedSearch } from "@/components/UnifiedSearch";
import { useState } from "react";

const allCategories = [
  {
    title: "Consumer",
    gdp: "850B",
    description: "Consumer products with detailed tracking of US-sourced components and manufacturing",
    count: 180,
    subcategories: [
      { name: "Athletic Apparel & Footwear", gdp: "280B", count: 45 },
      { name: "Electronics", gdp: "390B", count: 52 },
      { name: "Personal Care", gdp: "180B", count: 38 },
      { name: "Home & Lifestyle", gdp: "150B", count: 45 }
    ]
  },
  {
    title: "Groceries",
    gdp: "650B",
    description: "Grocery retailers and food products with emphasis on local sourcing and sustainability",
    count: 120,
    subcategories: [
      { name: "Organic & Natural Foods", gdp: "180B", count: 35 },
      { name: "Supermarket Chain", gdp: "470B", count: 45 },
      { name: "Specialty Foods", gdp: "120B", count: 25 },
      { name: "Fresh Produce", gdp: "80B", count: 15 }
    ]
  },
  {
    title: "Financial Services",
    gdp: "3.2T",
    description: "Banking, insurance, and investment services",
    count: 112,
    subcategories: [
      { name: "Commercial Banking", gdp: "890B", count: 28 },
      { name: "Investment Banking", gdp: "760B", count: 22 },
      { name: "Insurance", gdp: "650B", count: 31 },
      { name: "Fintech", gdp: "480B", count: 19 },
      { name: "Asset Management", gdp: "420B", count: 12 },
      { name: "Cryptocurrency", gdp: "280B", count: 15 },
      { name: "Payment Processing", gdp: "320B", count: 18 }
    ]
  },
  {
    title: "Healthcare",
    gdp: "2.4T",
    description: "Medical services, pharmaceuticals, and healthcare technology",
    count: 178,
    subcategories: [
      { name: "Pharmaceuticals", gdp: "580B", count: 42 },
      { name: "Medical Devices", gdp: "410B", count: 35 },
      { name: "Healthcare Services", gdp: "620B", count: 48 },
      { name: "Biotechnology", gdp: "450B", count: 29 },
      { name: "Digital Health", gdp: "340B", count: 24 },
      { name: "Mental Health", gdp: "180B", count: 18 },
      { name: "Elder Care", gdp: "220B", count: 15 }
    ]
  },
  {
    title: "Manufacturing",
    gdp: "2.3T",
    description: "Industrial production and manufacturing processes",
    count: 198,
    subcategories: [
      { name: "Automotive", gdp: "520B", count: 45 },
      { name: "Aerospace", gdp: "480B", count: 28 },
      { name: "Industrial Equipment", gdp: "440B", count: 52 },
      { name: "Electronics Manufacturing", gdp: "510B", count: 41 },
      { name: "Chemical Production", gdp: "350B", count: 32 },
      { name: "Robotics", gdp: "180B", count: 25 },
      { name: "3D Printing", gdp: "120B", count: 18 }
    ]
  },
  {
    title: "Energy",
    gdp: "1.9T",
    description: "Traditional and renewable energy sectors",
    count: 145,
    subcategories: [
      { name: "Renewable Energy", gdp: "380B", count: 34 },
      { name: "Oil & Gas", gdp: "520B", count: 41 },
      { name: "Nuclear Power", gdp: "290B", count: 18 },
      { name: "Energy Storage", gdp: "310B", count: 26 },
      { name: "Power Distribution", gdp: "400B", count: 26 },
      { name: "Solar Technology", gdp: "220B", count: 22 },
      { name: "Wind Power", gdp: "180B", count: 19 }
    ]
  },
  {
    title: "Agriculture",
    gdp: "1.2T",
    description: "Farming, food production, and agricultural technology",
    count: 134,
    subcategories: [
      { name: "Crop Production", gdp: "280B", count: 32 },
      { name: "Livestock", gdp: "310B", count: 28 },
      { name: "Agricultural Technology", gdp: "180B", count: 24 },
      { name: "Food Processing", gdp: "240B", count: 26 },
      { name: "Sustainable Farming", gdp: "150B", count: 18 },
      { name: "Vertical Farming", gdp: "80B", count: 12 },
      { name: "Precision Agriculture", gdp: "120B", count: 15 }
    ]
  },
  {
    title: "Transportation",
    gdp: "1.6T",
    description: "Logistics, shipping, and transportation services",
    count: 156,
    subcategories: [
      { name: "Logistics", gdp: "420B", count: 38 },
      { name: "Maritime Shipping", gdp: "380B", count: 32 },
      { name: "Air Freight", gdp: "290B", count: 25 },
      { name: "Rail Transport", gdp: "250B", count: 22 },
      { name: "Last-Mile Delivery", gdp: "180B", count: 20 },
      { name: "Electric Vehicles", gdp: "210B", count: 24 },
      { name: "Autonomous Transport", gdp: "150B", count: 18 }
    ]
  }
];

const Categories = () => {
  const [filteredCategories, setFilteredCategories] = useState(allCategories);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Industry Categories</h1>
          <p className="text-gray-600 max-w-3xl">
            Explore US companies and their products across major industries, with detailed tracking of US-sourced components and manufacturing locations. Special focus on consumer goods and grocery sectors.
          </p>
        </div>

        <UnifiedSearch 
          categories={allCategories} 
          onCategorySearch={setFilteredCategories} 
        />
        
        <div className="space-y-8">
          {filteredCategories.map((category) => (
            <CategorySection 
              key={category.title}
              category={category}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Categories;
