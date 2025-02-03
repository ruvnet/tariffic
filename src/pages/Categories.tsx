import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CategorySection } from "@/components/CategorySection";
import { UnifiedSearch } from "@/components/UnifiedSearch";
import { generateCategoryInsights } from "@/lib/generateProductContent.ts";
import { useQuery } from "@tanstack/react-query";

interface Subcategory {
  name: string;
  gdp: string;
  count: number;
}

interface Category {
  title: string;
  gdp: string;
  description: string;
  count: number;
  subcategories: Subcategory[];
}

// Default categories to show while loading dynamic content
const defaultCategories: Category[] = [
  {
    title: "Consumer",
    gdp: "850B",
    description: "Consumer products with detailed tracking of US-sourced components and manufacturing",
    count: 180,
    subcategories: [
      { name: "Athletic Apparel & Footwear", gdp: "280B", count: 45 },
      { name: "Electronics", gdp: "390B", count: 52 },
      { name: "Personal Care", gdp: "180B", count: 38 }
    ]
  },
  {
    title: "Groceries",
    gdp: "650B",
    description: "Grocery retailers and food products with emphasis on local sourcing and sustainability",
    count: 120,
    subcategories: [
      { name: "Organic & Natural Foods", gdp: "180B", count: 35 },
      { name: "Supermarket Chain", gdp: "470B", count: 45 }
    ]
  },
  {
    title: "Healthcare",
    gdp: "1.2T",
    description: "Healthcare and pharmaceutical companies focusing on research and manufacturing",
    count: 150,
    subcategories: [
      { name: "Pharmaceuticals", gdp: "580B", count: 40 },
      { name: "Medical Devices", gdp: "420B", count: 35 },
      { name: "Healthcare Services", gdp: "200B", count: 75 }
    ]
  },
  {
    title: "Technology",
    gdp: "2.1T",
    description: "Technology companies spanning software, hardware, and digital services",
    count: 200,
    subcategories: [
      { name: "Enterprise Software", gdp: "850B", count: 60 },
      { name: "Consumer Electronics", gdp: "750B", count: 45 },
      { name: "Cloud Services", gdp: "500B", count: 95 }
    ]
  }
];

const generateSubcategoriesAndCompanies = async (category: Category): Promise<Category> => {
  const insights = await generateCategoryInsights(category.title);
  
  // Convert insights into subcategories format
  const subcategories = insights.keyPlayers.map((player, index) => ({
    name: player.name,
    gdp: player.marketShare,
    count: 30 + index * 5 // Example count calculation
  }));

  return {
    ...category,
    description: insights.overview,
    subcategories
  };
};

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>(defaultCategories);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const enrichCategories = async () => {
      setLoading(true);
      try {
        const enrichedCategories = await Promise.all(
          defaultCategories.map(category => generateSubcategoriesAndCompanies(category))
        );
        setCategories(enrichedCategories);
        setFilteredCategories(enrichedCategories);
      } catch (error) {
        console.error('Error enriching categories:', error);
      }
      setLoading(false);
    };

    enrichCategories();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Industry Categories</h1>
          <p className="text-gray-600 max-w-3xl">
            Explore US companies and their products across major industries, with detailed tracking of US-sourced components and manufacturing locations.
          </p>
        </div>

        <UnifiedSearch 
          categories={categories} 
          onCategorySearch={setFilteredCategories} 
        />
        
        <div className="space-y-8">
          {filteredCategories.map((category) => (
            <CategorySection 
              key={category.title}
              category={category}
            />
          ))}
          {loading && (
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Categories;
