import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { type Product } from "@/types/product";
import { ProductDetail } from "@/components/ProductDetail";
import { consumerProducts } from "@/data/sectors/consumer";
import { groceryProducts } from "@/data/sectors/groceries";
import { getProductContent } from "@/lib/generateProductContent";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [llmContent, setLLMContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [llmLoading, setLLMLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      setError("Product ID is required");
      setLoading(false);
      return;
    }

    const allProducts = [...consumerProducts, ...groceryProducts];
    const foundProduct = allProducts.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setError(null);
      // Fetch additional content using LLM
      setLLMLoading(true);
      getProductContent(
        `Generate additional detailed content for product "${foundProduct.name}" including insights on its US-sourced components and manufacturing processes.`
      )
        .then((content) => {
          setLLMContent(content);
          setLLMLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLLMLoading(false);
        });
    } else {
      setError("Product not found");
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-red-800 text-lg font-semibold">Error</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen">
      {/* Sticky Navigation */}
      <div className="sticky top-0 bg-white shadow p-4 z-50">
        <Link to="/categories" className="text-blue-600 hover:underline">
          &larr; Back to Categories
        </Link>
      </div>
      <div className="container mx-auto p-6">
        <ProductDetail product={product} />
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Additional Product Insights</h2>
          {llmLoading ? (
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ) : (
            <p className="text-gray-700 whitespace-pre-line">{llmContent}</p>
          )}
        </div>
      </div>
    </div>
  );
}
