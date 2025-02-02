import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
  onSearch: (query: string) => void;
  companies: Array<{ name: string; description: string }>;
}

export const SearchBar = ({ onSearch, companies }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Array<{ name: string; description: string }>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (query.length > 1) {
      const filtered = companies.filter((company) =>
        company.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, companies]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto relative">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for a company or product..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-12 pl-4 pr-12 text-lg rounded-xl shadow-sm focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
        >
          Search
        </button>
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
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => handleSuggestionClick(suggestion.name)}
                  >
                    <div className="font-medium">{suggestion.name}</div>
                    <div className="text-sm text-gray-500 truncate">{suggestion.description}</div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};