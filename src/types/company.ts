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