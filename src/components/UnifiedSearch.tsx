import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { type Company } from "@/types/company";
import { type Product } from "@/types/product";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { consumerCompanies, consumerProducts } from "@/data/sectors/consumer";
import { groceryCompanies, groceryProducts } from "@/data/sectors/groceries";
import { healthcareCompanies } from "@/data/sectors/healthcare";
import { technologyCompanies } from "@/data/sectors/technology";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Category {
  title: string;
  gdp: string;
  description: string;
  count: number;
  subcategories: Array<{ name: string; gdp: string; count: number }>;
}

interface SearchResult {
  type: "category" | "company" | "product";
  item: Category | Company | Product;
}

interface UnifiedSearchProps {
  categories: Category[];
  onCategorySearch: (filtered: Category[]) => void;
}

export const UnifiedSearch = ({ categories, onCategorySearch }: UnifiedSearchProps) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  type TabValue = "all" | "categories" | "companies" | "products";
  const [activeTab, setActiveTab] = useState<TabValue>("all");

  // Combine all companies and products
  const allCompanies = [
    ...consumerCompanies,
    ...groceryCompanies,
    ...healthcareCompanies,
    ...technologyCompanies
  ];
  const allProducts = [...consumerProducts, ...groceryProducts];

  useEffect(() => {
    if (query.length > 1) {
      const matchedCategories = categories
        .filter(
          (category) =>
            category.title.toLowerCase().includes(query.toLowerCase()) ||
            category.description.toLowerCase().includes(query.toLowerCase()) ||
            category.subcategories.some((sub) =>
              sub.name.toLowerCase().includes(query.toLowerCase())
            )
        )
        .map((category) => ({ type: "category" as const, item: category }));

      const matchedCompanies = allCompanies
        .filter(
          (company) =>
            company.name.toLowerCase().includes(query.toLowerCase()) ||
            company.description.toLowerCase().includes(query.toLowerCase()) ||
            company.subsector.toLowerCase().includes(query.toLowerCase()) ||
            company.sector.toLowerCase().includes(query.toLowerCase())
        )
        .map((company) => ({ type: "company" as const, item: company }));

      const matchedProducts = allProducts
        .filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        )
        .map((product) => ({ type: "product" as const, item: product }));

      let filteredSuggestions: SearchResult[] = [];
      
      switch (activeTab) {
        case "categories":
          filteredSuggestions = matchedCategories;
          break;
        case "companies":
          filteredSuggestions = matchedCompanies;
          break;
        case "products":
          filteredSuggestions = matchedProducts;
          break;
        default:
          filteredSuggestions = [...matchedCategories, ...matchedCompanies, ...matchedProducts];
      }

      setSuggestions(filteredSuggestions.slice(0, 6));
      setShowSuggestions(true);

      // Update category list if in categories tab
      if (activeTab === "categories") {
        onCategorySearch(matchedCategories.map(result => result.item as Category));
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      onCategorySearch(categories);
    }
  }, [query, activeTab, categories, onCategorySearch]);

  const handleSuggestionClick = (result: SearchResult) => {
    setQuery("");
    setShowSuggestions(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <Tabs defaultValue="all" className="w-full" onValueChange={(value: string) => setActiveTab(value as TabValue)}>
        <div className="flex items-center gap-4 mb-4">
          <Input
            type="text"
            placeholder="Search across all sectors, companies, and products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>
        </div>

        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute w-full mt-2 z-50"
            >
              <Card>
                <CardContent className="p-2">
                  {suggestions.map((result, index) => {
                    const isCategory = result.type === "category";
                    const isCompany = result.type === "company";
                    const isProduct = result.type === "product";

                    return (
                      <Link
                        key={index}
                        to={
                          isProduct
                            ? `/product/${(result.item as Product).id}`
                            : isCompany
                            ? `/category/${(result.item as Company).sector.toLowerCase()}/${(
                                result.item as Company
                              ).subsector.toLowerCase()}`
                            : `/category/${(result.item as Category).title.toLowerCase()}`
                        }
                        className="block"
                        onClick={() => handleSuggestionClick(result)}
                      >
                        <div className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">
                                {isCategory
                                  ? (result.item as Category).title
                                  : isCompany
                                  ? (result.item as Company).name
                                  : (result.item as Product).name}
                              </div>
                              <div className="text-sm text-gray-500 truncate">
                                {isCategory
                                  ? (result.item as Category).description
                                  : isCompany
                                  ? (result.item as Company).description
                                  : (result.item as Product).description}
                              </div>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="outline">{result.type}</Badge>
                                {isCompany && (
                                  <>
                                    <Badge variant="secondary">
                                      {(result.item as Company).sector}
                                    </Badge>
                                    <Badge variant="outline">
                                      {(result.item as Company).subsector}
                                    </Badge>
                                  </>
                                )}
                                {isProduct && (
                                  <Badge variant="secondary">
                                    {(result.item as Product).category}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              {isCategory && (
                                <div className="font-bold text-primary">
                                  ${(result.item as Category).gdp}
                                </div>
                              )}
                              {isProduct && (
                                <div className="font-bold text-primary">
                                  {(result.item as Product).price}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </Tabs>
    </div>
  );
};
