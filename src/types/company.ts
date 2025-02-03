import { type Product } from './product';

export interface SupplyChainNode {
  location: string;
  type: string;
  percentage: number;
}

export interface Alternative {
  name: string;
  country: string;
  description: string;
  marketShare: string;
  sustainability: string;
}

export interface Company {
  name: string;
  description: string;
  isAmerican: boolean;
  revenue: string;
  employees: string;
  headquarters: string;
  foundedYear: number;
  sector: string;
  subsector: string;
  supplyChain: SupplyChainNode[];
  alternatives: Alternative[];
  products?: Product[];
}

export interface Subcategory {
  name: string;
  gdp: string;
  count: number;
}

export interface Category {
  title: string;
  gdp: string;
  description: string;
  count: number;
  subcategories: Subcategory[];
}