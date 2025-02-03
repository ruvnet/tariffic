import { useParams, Link } from "react-router-dom";
import { type Product } from "@/types/product";
import { ProductDetail } from "@/components/ProductDetail";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { consumerProducts } from "@/data/sectors/consumer";
import { groceryProducts } from "@/data/sectors/groceries";
import { generateProductDescription, type ProductInsight } from "@/lib/generateProductContent";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface ProductData {
  product: Product;
  insights: ProductInsight;
}

async function fetchProductData(id: string): Promise<ProductData> {
  const allProducts = [...consumerProducts, ...groceryProducts];
  const foundProduct = allProducts.find((p) => p.id === id);
  
  if (!foundProduct) {
    throw new Error("Product not found");
  }

  const insights = await generateProductDescription(foundProduct.name, foundProduct.category);

  return {
    product: foundProduct,
    insights
  };
}

export default function ProductDetailPage() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductData(id || ''),
    enabled: !!id,
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto p-4 md:p-6 flex-1">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto p-4 md:p-6 flex-1">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800">Error Loading Product</CardTitle>
              <div className="text-red-600">
                {error instanceof Error ? error.message : 'Failed to load product details. Please try again later.'}
              </div>
            </CardHeader>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-gray-50">
        <div className="sticky top-16 bg-white shadow-sm z-40">
          <div className="container mx-auto p-4">
            <Link 
              to={`/category/${data.product.category.toLowerCase()}`}
              className="text-primary hover:underline inline-flex items-center"
            >
              ← Back to {data.product.category}
            </Link>
          </div>
        </div>

        <div className="container mx-auto p-4 md:p-6">
          <div className="space-y-8">
            <ProductDetail product={data.product} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Features Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="h-full bg-white/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Key Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {data.insights.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Manufacturing Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="h-full bg-white/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Manufacturing</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Process</h4>
                      <p className="text-gray-600">{data.insights.manufacturing.process}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Locations</h4>
                      <div className="flex flex-wrap gap-2">
                        {data.insights.manufacturing.locations.map((location, index) => (
                          <Badge key={index} variant="outline">{location}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Quality Control</h4>
                      <p className="text-gray-600">{data.insights.manufacturing.quality}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Market Impact Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="h-full bg-white/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Market Impact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Competitive Advantage</h4>
                      <p className="text-gray-600">{data.insights.marketImpact.competitiveAdvantage}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Target Market</h4>
                      <p className="text-gray-600">{data.insights.marketImpact.targetMarket}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Pricing Strategy</h4>
                      <p className="text-gray-600">{data.insights.marketImpact.pricing}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* US Components Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="md:col-span-2 lg:col-span-3"
              >
                <Card className="bg-white/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>US-Sourced Components</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">{data.insights.usComponents.description}</p>
                    <div className="flex items-center gap-4">
                      <Badge variant="default" className="text-lg">
                        {data.insights.usComponents.percentage} US Content
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                      {data.insights.usComponents.locations.map((location, index) => (
                        <Card key={index} className="bg-white/80">
                          <CardContent className="p-4">
                            <h4 className="font-medium">{location}</h4>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
