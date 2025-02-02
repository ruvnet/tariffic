import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { SearchBar } from "@/components/SearchBar";
import { CompanyCard } from "@/components/CompanyCard";
import { Footer } from "@/components/Footer";
import { CategorySection } from "@/components/CategorySection";
import { motion, AnimatePresence } from "framer-motion";
import { companies } from "@/data/companies";

const topCategories = [
  {
    title: "Technology",
    gdp: "2.1T",
    description: "Digital technology, hardware, and software sectors",
    count: 156,
    subcategories: [
      { name: "Consumer Electronics", gdp: "460B", count: 45 },
      { name: "Enterprise Software", gdp: "380B", count: 38 }
    ]
  },
  {
    title: "Financial Services",
    gdp: "3.2T",
    description: "Banking, insurance, and investment services",
    count: 112,
    subcategories: [
      { name: "Commercial Banking", gdp: "890B", count: 28 },
      { name: "Investment Banking", gdp: "760B", count: 22 }
    ]
  },
  {
    title: "Healthcare",
    gdp: "2.4T",
    description: "Medical services, pharmaceuticals, and healthcare technology",
    count: 178,
    subcategories: [
      { name: "Pharmaceuticals", gdp: "580B", count: 42 },
      { name: "Medical Devices", gdp: "410B", count: 35 }
    ]
  }
];

const Index = () => {
  const [searchResults, setSearchResults] = useState(companies);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults(companies);
      return;
    }
    
    const filtered = companies.filter((company) =>
      company.name.toLowerCase().includes(query.toLowerCase()) ||
      company.description.toLowerCase().includes(query.toLowerCase()) ||
      company.sector.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Find Non-American Alternatives</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover alternative companies and products from around the world. Search for a company
            to find detailed information about its supply chain and non-American alternatives.
          </p>
        </div>

        <div className="mb-12">
          <SearchBar 
            onSearch={handleSearch} 
            companies={companies.map(c => ({ 
              name: c.name, 
              description: c.description 
            }))} 
          />
        </div>

        <AnimatePresence mode="wait">
          {searchResults.length === companies.length ? (
            <motion.div
              key="categories"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-bold mb-6">Top Categories by GDP Impact</h2>
              {topCategories.map((category) => (
                <CategorySection 
                  key={category.title}
                  category={category}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-8"
            >
              <h2 className="text-2xl font-bold mb-6">Search Results</h2>
              {searchResults.length > 0 ? (
                searchResults.map((company) => (
                  <CompanyCard key={company.name} {...company} />
                ))
              ) : (
                <div className="text-center text-gray-600">
                  No companies found matching your search.
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
