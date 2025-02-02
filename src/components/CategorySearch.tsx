import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Category } from "@/types/company";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface CategorySearchProps {
  categories: Category[];
  onSearch: (filtered: Category[]) => void;
}

export const CategorySearch = ({ categories, onSearch }: CategorySearchProps) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Category[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (query.length > 1) {
      const filtered = categories.filter(
        (category) =>
          category.title.toLowerCase().includes(query.toLowerCase()) ||
          category.description.toLowerCase().includes(query.toLowerCase()) ||
          category.subcategories.some((sub) =>
            sub.name.toLowerCase().includes(query.toLowerCase())
          )
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, categories]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    const filtered = categories.filter(
      (category) =>
        category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.subcategories.some((sub) =>
          sub.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
    onSearch(filtered);
  };

  const handleSuggestionClick = (category: Category) => {
    setQuery(category.title);
    onSearch([category]);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto mb-8">
      <Input
        type="text"
        placeholder="Search industries and sectors..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
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
                {suggestions.map((category, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => handleSuggestionClick(category)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{category.title}</div>
                        <div className="text-sm text-gray-500 truncate">
                          {category.description}
                        </div>
                        <div className="text-xs text-primary">
                          {category.subcategories.length} subsectors
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">${category.gdp}</div>
                        <div className="text-xs text-gray-500">GDP Impact</div>
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};