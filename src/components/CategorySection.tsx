import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

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

interface CategorySectionProps {
  category: Category;
}

export const CategorySection = ({ category }: CategorySectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl transition-all duration-300"
    >
      <Card className="overflow-hidden border-0 bg-white/50 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">{category.title}</CardTitle>
              <CardDescription className="mt-2">{category.description}</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">${category.gdp}</div>
              <div className="text-sm text-gray-500">Annual GDP Impact</div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.subcategories.map((sub) => (
              <Link 
                key={sub.name}
                to={`/category/${category.title.toLowerCase()}/${sub.name.toLowerCase()}`}
                className="block"
              >
                <Card className="hover:shadow-md transition-shadow bg-white/80">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{sub.name}</h3>
                      <span className="text-sm font-medium text-primary">${sub.gdp}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {sub.count} companies listed
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};