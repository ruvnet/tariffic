import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { SearchBar } from "@/components/SearchBar";
import { CompanyCard } from "@/components/CompanyCard";
import { Footer } from "@/components/Footer";

// Sample data - will be replaced with API calls later
const sampleCompanies = [
  {
    name: "TechCorp",
    description: "A leading technology company specializing in consumer electronics and software.",
    isAmerican: true,
    alternatives: [
      {
        name: "GlobalTech",
        country: "Sweden",
        description: "Innovative tech company with focus on sustainable electronics.",
      },
      {
        name: "EcoTech",
        country: "Finland",
        description: "Environmentally conscious technology solutions provider.",
      },
    ],
  },
  {
    name: "GreenEnergy",
    description: "Renewable energy solutions and sustainable power systems.",
    isAmerican: false,
    alternatives: [],
  },
];

const Index = () => {
  const [searchResults, setSearchResults] = useState(sampleCompanies);

  const handleSearch = (query: string) => {
    // Filter companies based on search query
    const filtered = sampleCompanies.filter((company) =>
      company.name.toLowerCase().includes(query.toLowerCase())
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
            Discover alternative companies and products from around the world. Enter a company name
            to find non-American alternatives.
          </p>
        </div>

        <div className="mb-12">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {searchResults.map((company) => (
            <CompanyCard key={company.name} {...company} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;