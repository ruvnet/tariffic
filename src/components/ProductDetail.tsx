import { type Product } from "@/types/product"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="container mx-auto p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
          <div className="flex gap-2">
            <Badge>{product.category}</Badge>
            <Badge variant="outline">{product.subcategory}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Image */}
            <div className="relative aspect-square">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                  No image available
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Price</h3>
                <p className="text-gray-600">{product.price}</p>
              </div>

              {product.specifications && (
                <div>
                  <h3 className="text-lg font-semibold">Specifications</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key}>
                        <span className="font-medium">{key}:</span> {value}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {product.sustainability && (
                <div>
                  <h3 className="text-lg font-semibold">Sustainability</h3>
                  <p className="text-gray-600">{product.sustainability}</p>
                </div>
              )}
            </div>
          </div>

          <Separator className="my-6" />

          {/* US Components Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">US-Sourced Components</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.usComponents.map((component) => (
                <Card key={component.name}>
                  <CardContent className="p-4">
                    <h4 className="font-semibold">{component.name}</h4>
                    <p className="text-sm text-gray-600">{component.description}</p>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">Manufacturer:</span> {component.manufacturer}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Location:</span> {component.location}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Percentage:</span> {component.percentage}%
                      </p>
                      {component.certifications && (
                        <div className="flex gap-2 mt-2">
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
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Manufacturing Location */}
          <div>
            <h3 className="text-lg font-semibold">Manufacturing Location</h3>
            <p className="text-gray-600">{product.manufacturingLocation}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
