import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { type Company } from "@/types/company";
import { type Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { generateCategoryInsights, generateRelatedCompanies, type CategoryInsight, type SupplyChainNode } from "@/lib/generateProductContent";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface SubcategorySectionProps {
  mainCategory: string;
  subcategory: string;
  companies: (Company & { products?: Product[] })[];
  gdp: string;
}

function SupplyChainNodeCard({ node }: { node: SupplyChainNode }) {
  return (
    <Card className="bg-white/80">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-semibold">{node.name}</h4>
          <Badge variant="outline">{node.type}</Badge>
        </div>
        <p className="text-sm text-gray-600 mb-2">{node.location}</p>
        <div className="space-y-3">
          <div>
            <h5 className="text-sm font-medium mb-1">Components</h5>
            <div className="flex flex-wrap gap-1">
              {node.components.map((component, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {component}
                </Badge>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <h5 className="font-medium mb-1">Upstream</h5>
              <ul className="text-gray-600 space-y-1">
                {node.relationships.upstream.map((supplier, i) => (
                  <li key={i}>• {supplier}</li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-1">Downstream</h5>
              <ul className="text-gray-600 space-y-1">
                {node.relationships.downstream.map((customer, i) => (
                  <li key={i}>• {customer}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export const SubcategorySection = ({ mainCategory, subcategory, companies, gdp }: SubcategorySectionProps) => {
  const regions = ['Europe', 'Asia', 'South America', 'Africa', 'Oceania'];
  
  const { data: insights, isLoading } = useQuery({
    queryKey: ['subcategory-insights', mainCategory, subcategory],
    queryFn: async () => {
      const [categoryInsights, ...companiesData] = await Promise.all([
        generateCategoryInsights(subcategory),
        ...regions.map(region => generateRelatedCompanies(subcategory, region))
      ]);

      return {
        ...categoryInsights,
        relatedCompanies: regions.reduce((acc, region, index) => ({
          ...acc,
          [region.toLowerCase()]: companiesData[index]
        }), {})
      };
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Overview Card */}
      <Card className="overflow-hidden border-0 bg-white/50 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <CardTitle className="text-3xl font-bold mb-2">{subcategory}</CardTitle>
              <div className="text-gray-600">
                {isLoading ? (
                  <div className="animate-pulse h-4 bg-gray-200 rounded w-3/4"></div>
                ) : (
                  insights?.overview
                )}
              </div>
              {insights?.relatedCategories && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {insights.relatedCategories.map((category, index) => (
                    <Link key={index} to={`/category/${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                      <Badge variant="outline" className="hover:bg-primary/10">
                        {category}
                      </Badge>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="text-left md:text-right">
              <div className="text-3xl font-bold text-primary">${gdp}</div>
              <div className="text-sm text-gray-500">GDP Impact</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Market Insights Grid */}
      {insights && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Market Size & Trends */}
          <Card className="bg-white/50 backdrop-blur-sm md:col-span-2">
            <CardHeader>
              <CardTitle>Market Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-2">Market Size</h4>
                  <p className="text-gray-600">{insights.marketSize}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Key Trends</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    {insights.trends.map((trend, index) => (
                      <Card key={index} className="bg-white/80">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-2">
                            <span className="text-primary font-bold">0{index + 1}</span>
                            <span className="text-gray-600">{trend}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Players */}
          <Card className="bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Key Players</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights.keyPlayers.map((player, index) => (
                  <Link 
                    key={index} 
                    to={`/company/${player.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  >
                    <Card className="bg-white/80 hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-primary hover:underline">{player.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{player.description}</p>
                        <Badge variant="outline" className="mt-2">
                          {player.marketShare} Market Share
                        </Badge>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Supply Chain Network */}
      {insights && (
        <Card className="bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Supply Chain Network</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Domestic Sourcing</h4>
                  <p className="text-gray-600">{insights.supplyChain.domesticSourcing}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Import Dependence</h4>
                  <p className="text-gray-600">{insights.supplyChain.importDependence}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Challenges</h4>
                <div className="grid gap-2">
                  {insights.supplyChain.challenges.map((challenge, index) => (
                    <Card key={index} className="bg-white/80">
                      <CardContent className="p-3">
                        <div className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span className="text-gray-600">{challenge}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Supply Chain Nodes</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {insights.supplyChain.nodes.map((node, index) => (
                    <SupplyChainNodeCard key={index} node={node} />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Subcategories Table */}
      {insights?.subcategories && (
        <Card className="bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Related Subcategories</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>GDP Impact</TableHead>
                  <TableHead>Companies</TableHead>
                  <TableHead>Related Categories</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {insights.subcategories.map((sub, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Link 
                        to={`/category/${mainCategory.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/${sub.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                        className="font-medium hover:text-primary"
                      >
                        {sub.name}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">{sub.description}</p>
                    </TableCell>
                    <TableCell>{sub.gdp}</TableCell>
                    <TableCell>{sub.companyCount}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {sub.relatedCategories.map((cat, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Companies Table */}
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Companies ({companies.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Products</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map((company) => (
                <TableRow key={company.name} className="cursor-pointer hover:bg-gray-50">
                  <TableCell>
                    <Link to={`/company/${company.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                      <div className="font-medium text-primary hover:underline">{company.name}</div>
                      <p className="text-sm text-gray-500">{company.description}</p>
                    </Link>
                  </TableCell>
                  <TableCell>{company.revenue}</TableCell>
                  <TableCell>{company.employees}</TableCell>
                  <TableCell>{company.headquarters}</TableCell>
                  <TableCell>
                    {company.products && (
                      <div className="flex flex-col gap-1">
                        {company.products.length > 0 ? (
                          <>
                            {company.products.slice(0, 2).map((product) => (
                              <Link
                                key={product.id}
                                to={`/product/${product.id}`}
                                className="text-sm hover:text-primary"
                              >
                                {product.name}
                              </Link>
                            ))}
                            {company.products.length > 2 && (
                              <span className="text-xs text-gray-500">+{company.products.length - 2} more</span>
                            )}
                          </>
                        ) : <span className="text-xs text-gray-500">No products listed</span>}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Global Alternatives */}
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Global Alternatives</CardTitle>
          <CardDescription>
            Discover non-American alternatives from different regions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {regions.map((region) => (
              <div key={region} className="space-y-4">
                <h3 className="text-xl font-semibold">{region}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {insights?.relatedCompanies?.[region.toLowerCase()]?.companies.map((company, index) => (
                    <Link 
                      key={index}
                      to={`/company/${company.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    >
                      <Card className="h-full hover:shadow-md transition-shadow bg-white/80">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-primary hover:underline">{company.name}</h4>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{company.description}</p>
                          <div className="mt-2 space-y-1 text-sm text-gray-500">
                            <div>Revenue: {company.revenue}</div>
                            <div>Employees: {company.employees}</div>
                            <div>HQ: {company.headquarters}</div>
                          </div>
                          {company.products.length > 0 && (
                            <div className="mt-2">
                              <div className="text-xs font-medium text-gray-500">Key Products:</div>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {company.products.slice(0, 3).map((product, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">
                                    {product}
                                  </Badge>
                                ))}
                                {company.products.length > 3 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{company.products.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
