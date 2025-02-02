import { motion } from "framer-motion";

interface CompanyCardProps {
  name: string;
  description: string;
  isAmerican: boolean;
  alternatives: Array<{
    name: string;
    country: string;
    description: string;
  }>;
}

export const CompanyCard = ({ name, description, isAmerican, alternatives }: CompanyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-6 transition-all duration-300 hover:shadow-lg"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold">{name}</h3>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            isAmerican ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
          }`}
        >
          {isAmerican ? "American" : "Non-American"}
        </span>
      </div>
      <p className="text-gray-600 mb-6">{description}</p>
      
      {isAmerican && alternatives.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Alternatives</h4>
          <div className="space-y-3">
            {alternatives.map((alt) => (
              <div key={alt.name} className="bg-white/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{alt.name}</span>
                  <span className="text-sm text-gray-500">{alt.country}</span>
                </div>
                <p className="text-sm text-gray-600">{alt.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};