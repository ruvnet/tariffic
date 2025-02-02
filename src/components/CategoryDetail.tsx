import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { CompanyCard } from "./CompanyCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { consumerProducts, consumerCompanies } from "@/data/sectors/consumer";
import { groceryProducts, groceryCompanies } from "@/data/sectors/groceries";
import { type Product } from "@/types/product";

interface CategoryDetailProps {
  mainCategory: string;
  subCategory: string;
}

const fetchCategoryData = async ({ mainCategory, subCategory }: CategoryDetailProps) => {
  // Get companies and products based on the category
  let companies = [];
  let products: Product[] = [];
  let gdp = "0";
  let description = "";

  switch (mainCategory.toLowerCase()) {
    case "consumer":
      companies = consumerCompanies;
      products = consumerProducts;
      gdp = "850B";
      description = "Consumer goods and services sector including electronics, apparel, and personal care products";
      break;
    case "groceries":
      companies = groceryCompanies;
      products = groceryProducts;
      gdp = "650B";
      description = "Grocery and food retail sector including supermarkets and specialty food stores";
      break;
    default:
      break;
  }

  // Filter companies by subcategory if provided
  const filteredCompanies = subCategory
    ? companies.filter(company => company.subsector.toLowerCase() === subCategory.toLowerCase())
    : companies;

  // Match products with their respective companies
  const companiesWithProducts = filteredCompanies.map(company => ({
    ...company,
    products: products.filter(product => 
      product.category.toLowerCase() === company.subsector.toLowerCase() ||
      product.manufacturingLocation.toLowerCase().includes(company.headquarters.split(",")[0].toLowerCase())
    )
  }));

  return {
    title: subCategory || mainCategory,
    description,
    gdp,
    companies: companiesWithProducts
  };
};

export const CategoryDetail = () => {
  const { category, subcategory } = useParams();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['category', category, subcategory],
    queryFn: () => fetchCategoryData({ 
      mainCategory: category || '', 
      subCategory: subcategory || '' 
    })
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-12">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800">Error Loading Category</CardTitle>
            <CardDescription className="text-red-600">
              Failed to load category details. Please try again later.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{data.title}</h1>
          <p className="text-gray-600">{data.description}</p>
          <div className="mt-2 text-2xl font-bold text-primary">${data.gdp} GDP Impact</div>
        </div>

        <div className="space-y-6">
          {data.companies.map((company, index) => (
            <CompanyCard key={index} {...company} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
