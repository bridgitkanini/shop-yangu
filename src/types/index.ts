// src/types/index.ts
export interface Shop {
  id?: number;
  name: string;
  description: string;
  logo: string | null;
  products?: Product[];
}

export interface Product {
  id?: number;
  name: string;
  price: number;
  stockLevel: number;
  description: string;
  image: string | null;
}

export interface DashboardMetrics {
  totalShops: number;
  totalProducts: number;
  totalValue: number;
  totalStock: number;
}

export interface StockStatusDistribution {
  inStock: number;
  lowStock: number;
  outOfStock: number;
}

export interface ShopStockInfo {
  id: string | number;
  name: string;
  totalStock: number;
  productCount: number;
}
