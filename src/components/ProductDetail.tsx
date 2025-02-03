import { type Product } from "@/types/product"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { Link, useParams } from "react-router-dom"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { category } = useParams();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card className="border-0 bg-white/50 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <CardTitle className="text-3xl font-bold mb-2">{product.name}</CardTitle>
              <div className="flex flex-wrap gap-2">
                <Badge>{product.category}</Badge>
                <Badge variant="outline">{product.subcategory}</Badge>
                <Badge variant="secondary">{product.price}</Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square"
            >
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover rounded-lg shadow-md w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center shadow-inner">
                  No image available
                </div>
              )}
            </motion.div>

            {/* Product Details */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h3 className="text-xl font-semibold mb-2">Description</h3>
                <div className="text-gray-600 leading-relaxed">
                  {product.description}
                </div>
              </motion.div>

              {product.specifications && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-xl font-semibold mb-2">Specifications</h3>
                  <Card className="bg-white/80">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <div key={key} className="flex flex-col">
                            <span className="text-sm text-gray-500">{key}</span>
                            <span className="font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {product.sustainability && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
                  <Card className="bg-white/80">
                    <CardContent className="p-4">
                      <div className="text-gray-600">{product.sustainability}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>

          <Separator className="my-8" />

          {/* US Components Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl font-semibold mb-4">US-Sourced Components</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.usComponents.map((component, index) => (
                <motion.div
                  key={component.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-md transition-shadow bg-white/80">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-lg mb-2">{component.name}</h4>
                      <div className="text-sm text-gray-600 mb-3">{component.description}</div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Manufacturer</span>
                          <span className="font-medium">{component.manufacturer}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Location</span>
                          <span className="font-medium">{component.location}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">US Content</span>
                          <span className="font-medium">{component.percentage}%</span>
                        </div>
                        {component.certifications && (
                          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
                            {component.certifications.map((cert) => (
                              <Badge key={cert} variant="secondary">
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <Separator className="my-8" />

          {/* Manufacturing Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/80 rounded-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-2">Manufacturing Location</h3>
            <div className="text-gray-600">{product.manufacturingLocation}</div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
