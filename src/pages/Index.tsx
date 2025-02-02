import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { SearchBar } from "@/components/SearchBar";
import { CompanyCard } from "@/components/CompanyCard";
import { Footer } from "@/components/Footer";

// Sample data - will be replaced with API calls later
const sampleCompanies = [
  {
    name: "Microsoft",
    description: "Global technology corporation known for Windows OS, Office suite, and cloud services.",
    isAmerican: true,
    alternatives: [
      {
        name: "SAP",
        country: "Germany",
        description: "Enterprise software solutions and business applications provider.",
      },
      {
        name: "Nokia",
        country: "Finland",
        description: "Telecommunications, technology, and consumer electronics company.",
      },
    ],
  },
  {
    name: "Amazon",
    description: "E-commerce and cloud computing giant with diverse technology services.",
    isAmerican: true,
    alternatives: [
      {
        name: "Alibaba",
        country: "China",
        description: "Global e-commerce and technology company.",
      },
      {
        name: "Rakuten",
        country: "Japan",
        description: "E-commerce and online retailing platform.",
      },
    ],
  },
  {
    name: "Apple",
    description: "Consumer electronics and software company known for iPhone, Mac, and iOS.",
    isAmerican: true,
    alternatives: [
      {
        name: "Samsung",
        country: "South Korea",
        description: "Consumer electronics, mobile devices, and home appliances manufacturer.",
      },
      {
        name: "Sony",
        country: "Japan",
        description: "Electronics, gaming, and entertainment company.",
      },
    ],
  },
  {
    name: "Meta",
    description: "Social media and technology company behind Facebook, Instagram, and WhatsApp.",
    isAmerican: true,
    alternatives: [
      {
        name: "Line",
        country: "Japan",
        description: "Social media and communications platform.",
      },
      {
        name: "WeChat",
        country: "China",
        description: "Multi-purpose messaging and social media app.",
      },
    ],
  }
];

const Index = () => {
  const [searchResults, setSearchResults] = useState(sampleCompanies);

  const handleSearch = (query: string) => {
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