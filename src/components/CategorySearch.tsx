import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Category } from "@/types/company";

interface CategorySearchProps {
  categories: Category[];
  onSearch: (filtered: Category[]) => void;
}

export const CategorySearch = ({ categories, onSearch }: CategorySearchProps) => {
  const [query, setQuery] = useState("");

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

  return (
    <div className="mb-8">
      <Input
        type="text"
        placeholder="Search industries and sectors..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="max-w-xl mx-auto"
      />
    </div>
  );
};