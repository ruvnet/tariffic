import { motion } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
  alternatives 
}: CompanyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl transition-all duration-300 hover:shadow-lg"
    >
      <Card className="border-0 bg-transparent">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">{name}</CardTitle>
              <CardDescription className="mt-2">{description}</CardDescription>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                isAmerican ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
              }`}
            >
              {isAmerican ? "American" : "Non-American"}
            </span>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
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
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3">Supply Chain</h4>
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
          </div>

          {isAmerican && alternatives.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-3">Alternative Companies</h4>
              <div className="grid gap-4 md:grid-cols-2">
                {alternatives.map((alt, index) => (
                  <Card key={index} className="bg-white/50">
                    <CardHeader>
                      <CardTitle className="text-lg">{alt.name}</CardTitle>
                      <CardDescription>{alt.country}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-2">{alt.description}</p>
                      <dl className="space-y-1">
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Market Share:</dt>
                          <dd>{alt.marketShare}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Sustainability:</dt>
                          <dd>{alt.sustainability}</dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};