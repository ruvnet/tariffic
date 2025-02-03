import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CategorySection } from "@/components/CategorySection";
import { motion, AnimatePresence } from "framer-motion";
import { UnifiedSearch } from "@/components/UnifiedSearch";

const featuredCategories = [
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
    description: "Banking, insurance, and investment services with robust digital solutions",
    count: 112,
    subcategories: [
      { name: "Commercial Banking", gdp: "890B", count: 28 },
      { name: "Investment Banking", gdp: "760B", count: 22 },
      { name: "Insurance", gdp: "650B", count: 31 },
      { name: "Fintech", gdp: "480B", count: 19 }
    ]
  },
  {
    title: "Healthcare",
    gdp: "2.4T",
    description: "Medical services, pharmaceuticals, and healthcare technology with innovative approaches",
    count: 178,
    subcategories: [
      { name: "Pharmaceuticals", gdp: "580B", count: 42 },
      { name: "Medical Devices", gdp: "410B", count: 35 },
      { name: "Healthcare Services", gdp: "620B", count: 48 },
      { name: "Biotechnology", gdp: "450B", count: 29 }
    ]
  },
  {
    title: "Technology",
    gdp: "2.1T",
    description: "Digital technology, hardware, and software sectors driving innovation",
    count: 156,
    subcategories: [
      { name: "Consumer Electronics", gdp: "460B", count: 45 },
      { name: "Enterprise Software", gdp: "380B", count: 38 },
      { name: "Semiconductors", gdp: "550B", count: 29 },
      { name: "Cloud Services", gdp: "410B", count: 24 }
    ]
  }
];

const Index = () => {
  const [filteredCategories, setFilteredCategories] = useState(featuredCategories);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Track US-Sourced Components</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore companies and products across industries, with detailed tracking of US-sourced components 
            and manufacturing locations. Special focus on consumer goods and grocery sectors.
          </p>
        </div>

        <div className="mb-12">
          <UnifiedSearch 
            categories={featuredCategories}
            onCategorySearch={setFilteredCategories}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <h2 className="text-2xl font-bold mb-6">Featured Categories</h2>
          {filteredCategories.map((category) => (
            <CategorySection 
              key={category.title}
              category={category}
            />
          ))}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
