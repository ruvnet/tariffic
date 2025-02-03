import { motion } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { type Product } from "@/types/product";

interface SupplyChainNode {
  location: string;
  type: string;
  percentage: number;
}

interface Alternative {
  name: string;
  country: string;
  description: string;
  marketShare: string;
  sustainability: string;
}

interface CompanyCardProps {
  name: string;
  description: string;
  isAmerican: boolean;
  revenue: string;
  employees: string;
  headquarters: string;
  foundedYear: number;
  supplyChain: SupplyChainNode[];
  alternatives: Alternative[];
  products?: Product[];
}

export const CompanyCard = ({ 
  name, 
  description, 
  isAmerican, 
  revenue,
  employees,
  headquarters,
  foundedYear,
  supplyChain,
  alternatives,
  products = [] 
}: CompanyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl transition-all duration-300"
    >
      <Card className="border-0 bg-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
        <CardHeader className="border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold mb-2">{name}</CardTitle>
              <div className="text-gray-600">{description}</div>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant={isAmerican ? "default" : "secondary"}>
                  {isAmerican ? "American" : "Non-American"}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/80">
              <CardContent className="p-4">
                <h4 className="text-lg font-semibold mb-3">Company Details</h4>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Revenue</dt>
                    <dd className="font-medium">{revenue}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Employees</dt>
                    <dd className="font-medium">{employees}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Headquarters</dt>
                    <dd className="font-medium">{headquarters}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Founded</dt>
                    <dd className="font-medium">{foundedYear}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card className="bg-white/80">
              <CardContent className="p-4">
                <h4 className="text-lg font-semibold mb-3">Supply Chain</h4>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Location</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>%</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {supplyChain.map((node, index) => (
                        <TableRow key={index}>
                          <TableCell>{node.location}</TableCell>
                          <TableCell>{node.type}</TableCell>
                          <TableCell>{node.percentage}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {isAmerican && alternatives.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-3">Alternative Companies</h4>
              <div className="grid gap-4 md:grid-cols-2">
                {alternatives.map((alt, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-white/80 h-full">
                      <CardHeader>
                        <CardTitle className="text-lg">{alt.name}</CardTitle>
                        <Badge variant="outline">{alt.country}</Badge>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-gray-600 mb-3">{alt.description}</div>
                        <dl className="space-y-2">
                          <div className="flex justify-between">
                            <dt className="text-gray-600">Market Share</dt>
                            <dd className="font-medium">{alt.marketShare}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-gray-600">Sustainability</dt>
                            <dd className="font-medium">{alt.sustainability}</dd>
                          </div>
                        </dl>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {products && products.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-3">Products</h4>
              <div className="grid gap-4 md:grid-cols-2">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-white/80 h-full">
                      <CardHeader>
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <Badge variant="outline">{product.category}</Badge>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-gray-600 mb-4">{product.description}</div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-primary">{product.price}</span>
                          <Button asChild>
                            <Link to={`/product/${product.id}`}>View Details</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
