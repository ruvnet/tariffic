import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { consumerProducts, consumerCompanies } from "@/data/sectors/consumer";
import { groceryProducts, groceryCompanies } from "@/data/sectors/groceries";
import { healthcareCompanies } from "@/data/sectors/healthcare";
import { technologyCompanies } from "@/data/sectors/technology";
import { type Product } from "@/types/product";
import { type Company } from "@/types/company";
import { generateCategoryInsights, generateSectorOverview, type CategoryInsight } from "@/lib/generateProductContent";
import { SubcategorySection } from "./SubcategorySection";
import { Badge } from "@/components/ui/badge";

interface CategoryDetailProps {
  mainCategory: string;
  subCategory: string;
}

interface CategoryData {
  title: string;
  description: string;
  gdp: string;
  subcategories: {
    name: string;
    gdp: string;
    companyCount: number;
    description: string;
    companies: (Company & { products?: Product[] })[];
    trends: string[];
  }[];
}

// Helper function to normalize strings for comparison
const normalizeString = (str: string) => str.toLowerCase().trim().replace(/[^a-z0-9]+/g, ' ');

const fetchCategoryData = async ({ mainCategory, subCategory }: CategoryDetailProps): Promise<CategoryData> => {
  // Get companies based on the category
  let companies: (Company & { products?: Product[] })[] = [];
  let gdp = "0";

  switch (mainCategory.toLowerCase()) {
    case "consumer":
      companies = consumerCompanies;
      gdp = "850B";
      break;
    case "groceries":
      companies = groceryCompanies;
      gdp = "650B";
      break;
    case "healthcare":
      companies = healthcareCompanies;
      gdp = "1.2T";
      break;
    case "technology":
      companies = technologyCompanies;
      gdp = "2.1T";
      break;
    default:
      break;
  }

  // Generate category insights using OpenRouter API
  let insights: CategoryInsight;
  if (subCategory) {
    insights = await generateCategoryInsights(subCategory);
  } else {
    insights = await generateSectorOverview(mainCategory);
  }

  // Get products for each company
  let products: Product[] = [];
  switch (mainCategory.toLowerCase()) {
    case "consumer goods":
    case "consumer":  // Handle both variations
      products = consumerProducts;
      break;
    case "groceries":
      products = groceryProducts;
      break;
    default:
      break;
  }

  // Filter products by sector and subsector
  const getCompanyProducts = (company: Company) => products.filter(p => {
    const normalizedCategory = normalizeString(p.category);
    const normalizedSubcategory = normalizeString(p.subcategory);
    const normalizedSector = normalizeString(company.sector);
    const normalizedSubsector = normalizeString(company.subsector);
    
    return normalizedCategory === normalizedSector || normalizedSubcategory === normalizedSubsector;
  }
  );

  // Group companies by subsector and calculate metrics
  const subsectors = new Map<string, { companies: Company[]; gdp: string }>();
  
  // Process each company
  companies.forEach(company => {
    const existing = subsectors.get(company.subsector) || { companies: [], gdp: "0B" };
    const companyWithProducts = { ...company, products: getCompanyProducts(company) };
    existing.companies.push(companyWithProducts);
    // Simple GDP calculation based on company count
    const gdpValue = parseInt(existing.gdp) + 100;
    existing.gdp = `${gdpValue}B`;
    subsectors.set(company.subsector, existing);
  });

  // Convert insights into subcategories format
  const subcategories = Array.from(subsectors.entries()).map(([name, subsectorData]) => ({
    name,
    gdp: subsectorData.gdp,
    companyCount: subsectorData.companies.length,
    description: insights.overview,
    trends: insights.trends,
    // Include companies for the subcategory view
    companies: subsectorData.companies
  }));

  return {
    title: subCategory || mainCategory,
    description: insights.overview,
    gdp,
    subcategories
  };
};

export const CategoryDetail = () => {
  const { category, subcategory } = useParams();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['category', category, subcategory],
    queryFn: () => fetchCategoryData({ 
      mainCategory: category || '', 
      subCategory: subcategory || '' 
    }),
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800">Error Loading Category</CardTitle>
            <div className="text-red-600">
              {error instanceof Error ? error.message : 'Failed to load category details. Please try again later.'}
            </div>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!data) return null;

  if (subcategory) {
    // Find companies for the current subcategory
    const subcategoryData = data.subcategories.find(
      sub => normalizeString(sub.name) === normalizeString(subcategory)
    );
    const subcategoryCompanies = subcategoryData?.companies || [];
    const subcategoryGdp = subcategoryData?.gdp || '0';

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            to={`/category/${category?.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} 
            className="text-primary hover:underline mb-4 inline-block"
          >
            ← Back to {category}
          </Link>
        </div>
        <SubcategorySection
          mainCategory={category || ''}
          subcategory={subcategory || ''}
          companies={subcategoryCompanies}
          gdp={subcategoryGdp}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Category Overview Card */}
        <Card className="overflow-hidden border-0 bg-white/50 backdrop-blur-sm">
          <CardHeader className="border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <CardTitle className="text-3xl font-bold mb-2">{data.title}</CardTitle>
                <div className="text-gray-600 whitespace-pre-wrap">
                  {data.description}
                </div>
              </div>
              <div className="text-left md:text-right">
                <div className="text-3xl font-bold text-primary">${data.gdp}</div>
                <div className="text-sm text-gray-500">Annual GDP Impact</div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Subcategories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.subcategories.map((subcategory, index) => (
            <motion.div
              key={subcategory.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/category/${category?.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/${subcategory.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                <Card className="h-full hover:shadow-lg transition-shadow bg-white/80">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{subcategory.name}</h3>
                    <div className="flex justify-between items-center mb-4">
                      <Badge variant="outline">
                        {subcategory.companyCount} Companies
                      </Badge>
                      <span className="text-primary font-semibold">
                        ${subcategory.gdp}
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div className="text-sm text-gray-600 line-clamp-2">
                        {subcategory.description}
                      </div>
                      <div className="space-y-1">
                        {subcategory.trends.slice(0, 2).map((trend, i) => (
                          <div key={i} className="text-sm text-gray-500 flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span className="line-clamp-1">{trend}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
