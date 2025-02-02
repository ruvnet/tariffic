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

interface SearchResult {
  type: "company" | "product";
  item: Company | Product;
}

export const CompanyProductSearch = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Combine all companies and products
  const allCompanies = [...consumerCompanies, ...groceryCompanies];
  const allProducts = [...consumerProducts, ...groceryProducts];

  useEffect(() => {
    if (query.length > 1) {
      const matchedCompanies = allCompanies
        .filter(
          (company) =>
            company.name.toLowerCase().includes(query.toLowerCase()) ||
            company.description.toLowerCase().includes(query.toLowerCase()) ||
            company.subsector.toLowerCase().includes(query.toLowerCase())
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
    <div className="relative w-full max-w-xl mx-auto mb-8">
      <Input
        type="text"
        placeholder="Search companies and products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full"
      />

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
                    <div className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">
                            {result.type === "company"
                              ? (result.item as Company).name
                              : (result.item as Product).name}
                          </div>
                          <div className="text-sm text-gray-500 truncate">
                            {result.type === "company"
                              ? (result.item as Company).description
                              : (result.item as Product).description}
                          </div>
                          <div className="flex gap-2 mt-1">
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
                          </div>
                        </div>
                        {result.type === "product" && (
                          <div className="text-right">
                            <div className="font-bold text-primary">
                              {(result.item as Product).price}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
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
