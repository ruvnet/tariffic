import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { SearchBar } from "@/components/SearchBar";
import { CompanyCard } from "@/components/CompanyCard";
import { Footer } from "@/components/Footer";
import { CategorySection } from "@/components/CategorySection";
import { motion, AnimatePresence } from "framer-motion";

const sampleCompanies = [
  {
    name: "Apple Inc.",
    description: "Global technology company specializing in consumer electronics, software, and services.",
    isAmerican: true,
    revenue: "$394.3B (2023)",
    employees: "164,000+",
    headquarters: "Cupertino, California",
    foundedYear: 1976,
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
      },
      {
        name: "Huawei",
        country: "China",
        description: "Technology and telecommunications equipment provider",
        marketShare: "18% Global Tech Infrastructure",
        sustainability: "Green Partner Network"
      }
    ]
  },
  {
    name: "Tesla, Inc.",
    description: "Electric vehicle and clean energy company.",
    isAmerican: true,
    revenue: "$96.8B (2023)",
    employees: "127,800+",
    headquarters: "Austin, Texas",
    foundedYear: 2003,
    supplyChain: [
      { location: "USA", type: "Assembly", percentage: 40 },
      { location: "China", type: "Manufacturing", percentage: 25 },
      { location: "Germany", type: "Production", percentage: 20 },
      { location: "Other", type: "Components", percentage: 15 }
    ],
    alternatives: [
      {
        name: "BYD Company",
        country: "China",
        description: "World's largest electric vehicle manufacturer",
        marketShare: "25% Global EV Market",
        sustainability: "Zero Emission Strategy"
      },
      {
        name: "Volkswagen Group",
        country: "Germany",
        description: "Leading automotive manufacturer with strong EV focus",
        marketShare: "15% Global EV Market",
        sustainability: "Carbon Neutral by 2050"
      }
    ]
  }
];

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
  const [searchResults, setSearchResults] = useState<typeof sampleCompanies | null>(null);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }
    
    const filtered = sampleCompanies.filter((company) =>
      company.name.toLowerCase().includes(query.toLowerCase()) ||
      company.description.toLowerCase().includes(query.toLowerCase())
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
          <SearchBar onSearch={handleSearch} companies={sampleCompanies} />
        </div>

        <AnimatePresence mode="wait">
          {searchResults === null ? (
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
