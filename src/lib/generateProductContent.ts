import { persistentCache } from './persistentCache';

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  throw new Error('VITE_OPENROUTER_API_KEY not found in environment variables');
}

// Previous interfaces remain unchanged...
export interface SupplyChainNode {
  name: string;
  type: string;
  location: string;
  components: string[];
  relationships: {
    upstream: string[];
    downstream: string[];
  };
}

export interface CategoryInsight {
  overview: string;
  marketSize: string;
  trends: string[];
  keyPlayers: {
    name: string;
    description: string;
    marketShare: string;
  }[];
  supplyChain: {
    domesticSourcing: string;
    importDependence: string;
    challenges: string[];
    nodes: SupplyChainNode[];
  };
  regulations: string[];
  subcategories: {
    name: string;
    description: string;
    gdp: string;
    companyCount: number;
    relatedCategories: string[];
  }[];
  relatedCategories: string[];
}

export interface CompanyInsight {
  overview: string;
  usOperations: {
    facilities: string[];
    employeeCount: string;
    revenue: string;
  };
  supplyChain: {
    domesticSourcing: string;
    keySuppliers: {
      name: string;
      location: string;
      components: string[];
    }[];
    challenges: string[];
    network: SupplyChainNode[];
  };
  marketPosition: {
    strengths: string[];
    competitors: string[];
    marketShare: string;
  };
  sustainability: {
    initiatives: string[];
    certifications: string[];
    impact: string;
  };
  relatedCompanies: {
    name: string;
    relationship: string;
    description: string;
  }[];
}

export interface ProductInsight {
  overview: string;
  features: string[];
  usComponents: {
    description: string;
    percentage: string;
    locations: string[];
    components: {
      name: string;
      supplier: string;
      location: string;
      description: string;
    }[];
  };
  manufacturing: {
    process: string;
    locations: string[];
    quality: string;
    supplyChain: SupplyChainNode[];
  };
  marketImpact: {
    competitiveAdvantage: string;
    targetMarket: string;
    pricing: string;
  };
  relatedProducts: {
    name: string;
    relationship: string;
    description: string;
  }[];
}

async function getCompletion(prompt: string): Promise<string> {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'http://localhost:3000',
      'X-Title': 'Tariffic Supply Chain Analysis'
    },
    body: JSON.stringify({
      model: 'qwen/qwen-2.5-72b-instruct',
      messages: [
        {
          role: 'system',
          content: 'You are a supply chain analysis expert. Generate detailed, accurate JSON responses following the exact structure provided. Focus on real-world data and relationships. Important: Always use proper JSON formatting with commas between properties, like this: {"name": "Example", "value": 123, "description": "Text"}'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      stream: false,
      max_tokens: 2000,
      temperature: 0.7,
      top_p: 0.9
    })
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content;
  
  if (!content) {
    throw new Error('No content in response');
  }

  function cleanJsonContent(content: string): string {
    // First, normalize whitespace and line breaks
    let cleaned = content.replace(/\s+/g, ' ').trim();

    // Function to process object properties
    function processObject(match: string): string {
      // Remove outer braces and trim
      const inner = match.slice(1, -1).trim();
      
      // Split into properties (handling both quoted strings and numbers)
      const props = inner.split(/(?<=(?:"|true|false|\d))\s+(?=")/);
      
      // Add commas between properties
      return '{' + props.join(', ') + '}';
    }

    // Process all objects (including nested)
    let lastCleaned;
    do {
      lastCleaned = cleaned;
      cleaned = cleaned.replace(/{[^{}]+}/g, processObject);
    } while (cleaned !== lastCleaned);

    // Add commas between array items
    cleaned = cleaned.replace(/}\s*{/g, '}, {');
    
    // Fix any trailing commas
    cleaned = cleaned.replace(/,\s*([}\]])/g, '$1');
    
    // Fix spacing
    cleaned = cleaned.replace(/{\s+/g, '{')
                    .replace(/\s+}/g, '}')
                    .replace(/\[\s+/g, '[')
                    .replace(/\s+\]/g, ']');
    
    // Fix any remaining formatting issues
    cleaned = cleaned.replace(/,\s*}/g, '}')
                    .replace(/,\s*]/g, ']')
                    .replace(/\[\s*,/g, '[')
                    .replace(/{\s*,/g, '{');

    // Verify and return
    try {
      JSON.parse(cleaned);
      return cleaned;
    } catch (e) {
      // If parsing fails, try one more aggressive cleanup
      cleaned = cleaned.replace(/(["})\d])\s+"/g, '$1,"');
      cleaned = cleaned.replace(/"\s+(["})\d])/g, '",$1');
      
      try {
        JSON.parse(cleaned);
        return cleaned;
      } catch (e2) {
        console.error('JSON parsing error after cleanup:', e2);
        throw new Error('Invalid JSON format: Unable to parse response');
      }
    }
  }
  
  try {
    const cleanedContent = cleanJsonContent(content);
    return cleanedContent;
  } catch (e) {
    console.error('JSON parsing error:', e);
    throw new Error('Invalid JSON format in response');
  }
}

export interface RelatedCompanies {
  companies: {
    name: string;
    description: string;
    revenue: string;
    employees: string;
    headquarters: string;
    products: string[];
  }[];
}

export async function generateRelatedCompanies(category: string, area: string): Promise<RelatedCompanies> {
  const cacheKey = `related_companies_${category.toLowerCase()}_${area.toLowerCase()}`;
  
  try {
    const cached = await persistentCache.get<RelatedCompanies>(cacheKey);
    if (cached) {
      return cached;
    }
  } catch (e) {
    console.error('Cache retrieval error:', e);
  }

  const prompt = `Generate a list of companies in the ${category} category from ${area}, focusing on non-American alternatives. The response must be ONLY the JSON object with this exact structure:
{
  "companies": [
    {
      "name": "Company name",
      "description": "Brief description",
      "revenue": "Annual revenue",
      "employees": "Number of employees",
      "headquarters": "Location",
      "products": ["Product 1", "Product 2"]
    }
  ]
}`;

  try {
    const content = await getCompletion(prompt);
    const companies = JSON.parse(content) as RelatedCompanies;
    await persistentCache.set(cacheKey, companies);
    return companies;
  } catch (e) {
    console.error('Error generating related companies:', e);
    throw new Error(`Failed to generate companies for ${category} in ${area}: ${e instanceof Error ? e.message : 'Unknown error'}`);
  }
}

export async function generateCategoryInsights(category: string): Promise<CategoryInsight & { relatedCompanies?: Record<string, RelatedCompanies> }> {
  const cacheKey = `category_insights_${category.toLowerCase()}`;
  
  try {
    const cached = await persistentCache.get<CategoryInsight & { relatedCompanies?: Record<string, RelatedCompanies> }>(cacheKey);
    if (cached) {
      return cached;
    }
  } catch (e) {
    console.error('Cache retrieval error:', e);
  }

  // Fetch related companies concurrently for different regions
  const regions = ['Europe', 'Asia', 'South America', 'Africa', 'Oceania'];
  const companiesPromises = regions.map(region => generateRelatedCompanies(category, region));

  const prompt = `Generate a detailed JSON object analyzing the ${category} category in the US market, including supply chain relationships. The response must be ONLY the JSON object with this exact structure:
{
  "overview": "Comprehensive category overview",
  "marketSize": "Market size with growth rate",
  "trends": ["Trend 1", "Trend 2", "Trend 3"],
  "keyPlayers": [
    {
      "name": "Company name",
      "description": "Brief description",
      "marketShare": "Market share percentage"
    }
  ],
  "supplyChain": {
    "domesticSourcing": "US sourcing details",
    "importDependence": "Import dependence details",
    "challenges": ["Challenge 1", "Challenge 2"],
    "nodes": [
      {
        "name": "Node name",
        "type": "supplier/manufacturer/distributor",
        "location": "Location",
        "components": ["Component 1", "Component 2"],
        "relationships": {
          "upstream": ["Supplier 1", "Supplier 2"],
          "downstream": ["Customer 1", "Customer 2"]
        }
      }
    ]
  },
  "regulations": ["Regulation 1", "Regulation 2"],
  "subcategories": [
    {
      "name": "Subcategory name",
      "description": "Brief description",
      "gdp": "GDP impact",
      "companyCount": 30,
      "relatedCategories": ["Related Category 1", "Related Category 2"]
    }
  ],
  "relatedCategories": ["Related Category 1", "Related Category 2"]
}`;

  try {
    const content = await getCompletion(prompt);
    const insights = JSON.parse(content) as CategoryInsight;
    await persistentCache.set(cacheKey, insights);
    return insights;
  } catch (e) {
    console.error('Error generating category insights:', e);
    throw new Error(`Failed to generate insights for category ${category}: ${e instanceof Error ? e.message : 'Unknown error'}`);
  }
}

export async function generateCompanyDetails(name: string, sector: string): Promise<CompanyInsight> {
  const cacheKey = `company_details_${name.toLowerCase()}_${sector.toLowerCase()}`;
  
  try {
    const cached = await persistentCache.get<CompanyInsight>(cacheKey);
    if (cached) {
      return cached;
    }
  } catch (e) {
    console.error('Cache retrieval error:', e);
  }

  const prompt = `Generate a detailed JSON object analyzing ${name}, a company in the ${sector} sector, including supply chain relationships. The response must be ONLY the JSON object with this exact structure:
{
  "overview": "Company overview",
  "usOperations": {
    "facilities": ["Location 1", "Location 2"],
    "employeeCount": "Employee count",
    "revenue": "Annual revenue"
  },
  "supplyChain": {
    "domesticSourcing": "US sourcing percentage and details",
    "keySuppliers": [
      {
        "name": "Supplier name",
        "location": "Location",
        "components": ["Component 1", "Component 2"]
      }
    ],
    "challenges": ["Challenge 1", "Challenge 2"],
    "network": [
      {
        "name": "Node name",
        "type": "supplier/manufacturer/distributor",
        "location": "Location",
        "components": ["Component 1", "Component 2"],
        "relationships": {
          "upstream": ["Supplier 1", "Supplier 2"],
          "downstream": ["Customer 1", "Customer 2"]
        }
      }
    ]
  },
  "marketPosition": {
    "strengths": ["Strength 1", "Strength 2"],
    "competitors": ["Competitor 1", "Competitor 2"],
    "marketShare": "Market share percentage"
  },
  "sustainability": {
    "initiatives": ["Initiative 1", "Initiative 2"],
    "certifications": ["Certification 1", "Certification 2"],
    "impact": "Environmental and social impact"
  },
  "relatedCompanies": [
    {
      "name": "Company name",
      "relationship": "Relationship type",
      "description": "Brief description"
    }
  ]
}`;

  try {
    const content = await getCompletion(prompt);
    const details = JSON.parse(content) as CompanyInsight;
    await persistentCache.set(cacheKey, details);
    return details;
  } catch (e) {
    console.error('Error generating company details:', e);
    throw new Error(`Failed to generate details for company ${name}: ${e instanceof Error ? e.message : 'Unknown error'}`);
  }
}

export async function generateProductDescription(name: string, category: string): Promise<ProductInsight> {
  const cacheKey = `product_description_${name.toLowerCase()}_${category.toLowerCase()}`;
  
  try {
    const cached = await persistentCache.get<ProductInsight>(cacheKey);
    if (cached) {
      return cached;
    }
  } catch (e) {
    console.error('Cache retrieval error:', e);
  }

  const prompt = `Generate a detailed JSON object analyzing the product ${name} in the ${category} category, including supply chain relationships. The response must be ONLY the JSON object with this exact structure:
{
  "overview": "Product overview",
  "features": ["Feature 1", "Feature 2", "Feature 3"],
  "usComponents": {
    "description": "US components overview",
    "percentage": "Percentage of US components",
    "locations": ["Location 1", "Location 2"],
    "components": [
      {
        "name": "Component name",
        "supplier": "Supplier name",
        "location": "Manufacturing location",
        "description": "Component description"
      }
    ]
  },
  "manufacturing": {
    "process": "Manufacturing process overview",
    "locations": ["Location 1", "Location 2"],
    "quality": "Quality control measures",
    "supplyChain": [
      {
        "name": "Node name",
        "type": "supplier/manufacturer/distributor",
        "location": "Location",
        "components": ["Component 1", "Component 2"],
        "relationships": {
          "upstream": ["Supplier 1", "Supplier 2"],
          "downstream": ["Customer 1", "Customer 2"]
        }
      }
    ]
  },
  "marketImpact": {
    "competitiveAdvantage": "Key advantages",
    "targetMarket": "Target market description",
    "pricing": "Pricing strategy"
  },
  "relatedProducts": [
    {
      "name": "Product name",
      "relationship": "component/complement/substitute",
      "description": "Brief description"
    }
  ]
}`;

  try {
    const content = await getCompletion(prompt);
    const description = JSON.parse(content) as ProductInsight;
    await persistentCache.set(cacheKey, description);
    return description;
  } catch (e) {
    console.error('Error generating product description:', e);
    throw new Error(`Failed to generate description for product ${name}: ${e instanceof Error ? e.message : 'Unknown error'}`);
  }
}

export async function generateSectorOverview(sector: string): Promise<CategoryInsight> {
  const cacheKey = `sector_overview_${sector.toLowerCase()}`;
  
  try {
    const cached = await persistentCache.get<CategoryInsight>(cacheKey);
    if (cached) {
      return cached;
    }
  } catch (e) {
    console.error('Cache retrieval error:', e);
  }

  const prompt = `Generate a comprehensive JSON object analyzing the ${sector} sector in the US market, including supply chain relationships and subsectors. The response must be ONLY the JSON object with this exact structure:
{
  "overview": "Sector overview",
  "marketSize": "Total market size and growth",
  "trends": ["Trend 1", "Trend 2", "Trend 3"],
  "keyPlayers": [
    {
      "name": "Company name",
      "description": "Brief description",
      "marketShare": "Market share percentage"
    }
  ],
  "supplyChain": {
    "domesticSourcing": "US sourcing overview",
    "importDependence": "Import dependence details",
    "challenges": ["Challenge 1", "Challenge 2"],
    "nodes": [
      {
        "name": "Node name",
        "type": "supplier/manufacturer/distributor",
        "location": "Location",
        "components": ["Component 1", "Component 2"],
        "relationships": {
          "upstream": ["Supplier 1", "Supplier 2"],
          "downstream": ["Customer 1", "Customer 2"]
        }
      }
    ]
  },
  "regulations": ["Regulation 1", "Regulation 2"],
  "subcategories": [
    {
      "name": "Subcategory name",
      "description": "Brief description",
      "gdp": "GDP impact",
      "companyCount": 30,
      "relatedCategories": ["Related Category 1", "Related Category 2"]
    }
  ],
  "relatedCategories": ["Related Category 1", "Related Category 2"]
}`;

  try {
    const content = await getCompletion(prompt);
    const overview = JSON.parse(content) as CategoryInsight;
    await persistentCache.set(cacheKey, overview);
    return overview;
  } catch (e) {
    console.error('Error generating sector overview:', e);
    throw new Error(`Failed to generate overview for sector ${sector}: ${e instanceof Error ? e.message : 'Unknown error'}`);
  }
}

// For backward compatibility
export const getProductContent = generateProductDescription;
