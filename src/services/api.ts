// src/services/api.ts
import { Shop, Product } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Shop Services
export const shopService = {
  async getShops(): Promise<Shop[]> {
    const response = await fetch(`${API_BASE_URL}/shops`);
    if (!response.ok) throw new Error("Failed to fetch shops");
    return response.json();
  },

  async getShop(id: string): Promise<Shop> {
    const response = await fetch(`${API_BASE_URL}/shops/${id}`);
    if (!response.ok) throw new Error("Failed to fetch shop");
    return response.json();
  },

  async addShop(shop: Omit<Shop, 'id'>): Promise<Shop> {
    const response = await fetch(`${API_BASE_URL}/shops`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...shop,
        id: Date.now().toString(36), // Generate simple ID
        products: [], // Initialize empty products array
      }),
    });
    if (!response.ok) throw new Error("Failed to add shop");
    return response.json();
  },

  async updateShop(id: string, shop: Partial<Shop>): Promise<Shop> {
    const response = await fetch(`${API_BASE_URL}/shops/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(shop),
    });
    if (!response.ok) throw new Error("Failed to update shop");
    return response.json();
  },

  async deleteShop(id: string): Promise<void> {
    // First check if shop has products
    const shop = await this.getShop(id);
    if (shop.products && shop.products.length > 0) {
      throw new Error("Cannot delete shop with active products. Please remove all products first.");
    }
    
    const response = await fetch(`${API_BASE_URL}/shops/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete shop");
  },
};

// Product Services
export const productService = {
  async getProducts(shopId: string): Promise<Product[]> {
    const shop = await shopService.getShop(shopId);
    return shop.products || [];
  },

  async getProduct(shopId: string, productId: string): Promise<Product | null> {
    const products = await this.getProducts(shopId);
    return products.find(p => p.id?.toString() === productId) || null;
  },

  async addProduct(shopId: string, product: Omit<Product, 'id'>): Promise<Product> {
    const shop = await shopService.getShop(shopId);
    const newProduct: Product = {
      ...product,
      id: Date.now(), // Generate simple numeric ID
    };
    
    const updatedProducts = [...(shop.products || []), newProduct];
    
    await shopService.updateShop(shopId, { products: updatedProducts });
    return newProduct;
  },

  async updateProduct(shopId: string, product: Product): Promise<Product> {
    const shop = await shopService.getShop(shopId);
    const updatedProducts = (shop.products || []).map(p =>
      p.id === product.id ? product : p
    );
    
    await shopService.updateShop(shopId, { products: updatedProducts });
    return product;
  },

  async deleteProduct(shopId: string, productId: string): Promise<void> {
    const shop = await shopService.getShop(shopId);
    const updatedProducts = (shop.products || []).filter(
      p => p.id?.toString() !== productId
    );
    
    await shopService.updateShop(shopId, { products: updatedProducts });
  },

  // Get all products across all shops (for dashboard)
  async getAllProducts(): Promise<Product[]> {
    const shops = await shopService.getShops();
    return shops.flatMap(shop => shop.products || []);
  },
};

// Dashboard Services
export const dashboardService = {
  async getOverviewMetrics() {
    const shops = await shopService.getShops();
    const allProducts = shops.flatMap(shop => shop.products || []);
    
    const totalShops = shops.length;
    const totalProducts = allProducts.length;
    const totalValue = allProducts.reduce((sum, product) => 
      sum + (product.price * product.stockLevel), 0
    );
    const totalStock = allProducts.reduce((sum, product) => 
      sum + product.stockLevel, 0
    );

    return {
      totalShops,
      totalProducts,
      totalValue,
      totalStock,
    };
  },

  async getStockStatusDistribution() {
    const allProducts = await productService.getAllProducts();
    
    const inStock = allProducts.filter(p => p.stockLevel > 5).length;
    const lowStock = allProducts.filter(p => p.stockLevel > 0 && p.stockLevel <= 5).length;
    const outOfStock = allProducts.filter(p => p.stockLevel === 0).length;

    return {
      inStock,
      lowStock,
      outOfStock,
    };
  },

  async getTopShopsByStock() {
    const shops = await shopService.getShops();
    
    const shopsWithStock = shops.map(shop => ({
      id: shop.id,
      name: shop.name,
      totalStock: (shop.products || []).reduce((sum, product) => 
        sum + product.stockLevel, 0
      ),
      productCount: (shop.products || []).length,
    }))
    .sort((a, b) => b.totalStock - a.totalStock)
    .slice(0, 5);

    return shopsWithStock;
  },
};