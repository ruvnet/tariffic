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

interface SearchResult {
  type: "company" | "product";
  item: Company | Product;
}

export const CompanyProductSearch = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

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
      const matchedCompanies = allCompanies
        .filter(
          (company) =>
            company.name.toLowerCase().includes(query.toLowerCase()) ||
            company.description.toLowerCase().includes(query.toLowerCase()) ||
            company.sector.toLowerCase().includes(query.toLowerCase()) ||
            company.subsector.toLowerCase().includes(query.toLowerCase())
        )
        .map((company) => ({ type: "company" as const, item: company }));

      const matchedProducts = allProducts
        .filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()) ||
            product.subcategory.toLowerCase().includes(query.toLowerCase())
        )
        .map((product) => ({ type: "product" as const, item: product }));

      // Combine and limit results
      setSuggestions([...matchedCompanies, ...matchedProducts].slice(0, 6));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSuggestionClick = (result: SearchResult) => {
    setQuery("");
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search across all sectors, companies, and products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-white/80 backdrop-blur-sm border-gray-200 focus:border-primary"
        />
      </div>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute w-full mt-2 z-50"
          >
            <Card className="border-0 bg-white/95 backdrop-blur-sm shadow-lg">
              <CardContent className="p-2">
                {suggestions.map((result, index) => (
                  <Link
                    key={index}
                    to={
                      result.type === "product"
                        ? `/product/${(result.item as Product).id}`
                        : `/category/${(result.item as Company).sector.toLowerCase()}/${(
                            result.item as Company
                          ).subsector.toLowerCase()}`
                    }
                    className="block"
                    onClick={() => handleSuggestionClick(result)}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">
                            {result.type === "company"
                              ? (result.item as Company).name
                              : (result.item as Product).name}
                          </div>
                          <div className="text-sm text-gray-500 truncate mt-0.5">
                            {result.type === "company"
                              ? (result.item as Company).description
                              : (result.item as Product).description}
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="outline">
                              {result.type === "company"
                                ? (result.item as Company).sector
                                : (result.item as Product).category}
                            </Badge>
                            <Badge variant="secondary">
                              {result.type === "company"
                                ? (result.item as Company).subsector
                                : (result.item as Product).subcategory}
                            </Badge>
                            {result.type === "company" && (result.item as Company).isAmerican && (
                              <Badge variant="default">American</Badge>
                            )}
                          </div>
                        </div>
                        {result.type === "product" && (
                          <div className="text-right flex-shrink-0">
                            <div className="font-bold text-primary">
                              {(result.item as Product).price}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
