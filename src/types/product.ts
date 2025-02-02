export interface USComponent {
  name: string;
  manufacturer: string;
  location: string;
  description: string;
  percentage: number;
  certifications?: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  price: string;
  image?: string;
  usComponents: USComponent[];
  specifications?: Record<string, string>;
  sustainability?: string;
  manufacturingLocation: string;
}

export interface ProductCategory {
  name: string;
  description: string;
  products: Product[];
}
